'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Form, FormRow, FormSwitch } from '@/components/ui/Form';
import { Icon } from '@/components/ui/Icon';
import { useToast } from '@/components/ui/Toast';

export default function SettingsPage() {
  const { success, error } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Settings State
  const [maxEventsPerSec, setMaxEventsPerSec] = useState('100');
  const [maxPayloadSizeKb, setMaxPayloadSizeKb] = useState('100');
  const [batchFlushThreshold, setBatchFlushThreshold] = useState('500');
  const [batchFlushIntervalMs, setBatchFlushIntervalMs] = useState('2000');
  const [fileRotationMb, setFileRotationMb] = useState('100');
  const [jwtSecret, setJwtSecret] = useState('datastack-universal-secret-key-2026');
  const [enableIdempotency, setEnableIdempotency] = useState(true);
  const [autoPruneDays, setAutoPruneDays] = useState('30');

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/settings');
        if (res.ok) {
          const data = await res.json();
          const s = data.settings;
          setMaxEventsPerSec(String(s.maxEventsPerSec ?? 100));
          setMaxPayloadSizeKb(String(s.maxPayloadSizeKb ?? 100));
          setBatchFlushThreshold(String(s.batchFlushThreshold ?? 500));
          setBatchFlushIntervalMs(String(s.batchFlushIntervalMs ?? 2000));
          setFileRotationMb(String(s.fileRotationMb ?? 100));
          setJwtSecret(s.jwtSecret ?? 'datastack-universal-secret-key-2026');
          setEnableIdempotency(Boolean(s.enableIdempotency ?? true));
          setAutoPruneDays(String(s.autoPruneDays ?? 30));
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          maxEventsPerSec: Number(maxEventsPerSec),
          maxPayloadSizeKb: Number(maxPayloadSizeKb),
          batchFlushThreshold: Number(batchFlushThreshold),
          batchFlushIntervalMs: Number(batchFlushIntervalMs),
          fileRotationMb: Number(fileRotationMb),
          jwtSecret,
          enableIdempotency,
          autoPruneDays: Number(autoPruneDays),
        }),
      });

      if (res.ok) {
        success('Settings Saved', 'Core engine configuration updated and propagated');
      } else {
        error('Save Failed', 'Server rejected configuration payload');
      }
    } catch (err: any) {
      error('Error', err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-[900px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border)] pb-2">
        <h1 className="text-[14px] font-semibold text-[var(--text)] tracking-tight">
          Settings
        </h1>

        <Button
          size="xs"
          variant="primary"
          icon="Save"
          loading={saving}
          onClick={handleSave}
          className="self-start sm:self-auto"
        >
          Save
        </Button>
      </div>

      <Form onSubmit={handleSave}>
        {/* Ingestion & Rate Limit Group */}
        <Card compact className="flex flex-col gap-3">
          <CardHeader className="p-0 pb-1.5 mb-1.5">
            <div className="flex items-center gap-2">
              <Icon name="Activity" size={14} className="text-[var(--accent)]" />
              <CardTitle>Throughput & Safety Limits</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex flex-col gap-3">
            <FormRow>
              <Input
                label="Global Max Events / Second (Rate Limit)"
                type="number"
                min="10"
                max="10000"
                value={maxEventsPerSec}
                onChange={(e) => setMaxEventsPerSec(e.target.value)}
              />
              <Input
                label="Max Payload Size per Event (KB)"
                type="number"
                min="1"
                max="5120"
                value={maxPayloadSizeKb}
                onChange={(e) => setMaxPayloadSizeKb(e.target.value)}
              />
            </FormRow>
            <FormSwitch
              label="Enable Idempotency Key Deduplication"
              description="clientId + eventId combinations are rejected within 5-minute TTL window"
              checked={enableIdempotency}
              onChange={setEnableIdempotency}
            />
          </CardContent>
        </Card>

        {/* Buffer & CSV Rotation Group */}
        <Card compact className="flex flex-col gap-3">
          <CardHeader className="p-0 pb-1.5 mb-1.5">
            <div className="flex items-center gap-2">
              <Icon name="HardDrive" size={14} className="text-[var(--accent)]" />
              <CardTitle>Redis In-Memory Buffer & CSV Partitioning</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex flex-col gap-3">
            <FormRow>
              <Input
                label="Batch Flush Threshold (Row Count)"
                type="number"
                min="50"
                max="5000"
                value={batchFlushThreshold}
                onChange={(e) => setBatchFlushThreshold(e.target.value)}
              />
              <Input
                label="Batch Flush Timer Interval (Milliseconds)"
                type="number"
                min="500"
                max="10000"
                value={batchFlushIntervalMs}
                onChange={(e) => setBatchFlushIntervalMs(e.target.value)}
              />
            </FormRow>
            <FormRow>
              <Input
                label="File Rotation Threshold (MB)"
                type="number"
                min="10"
                max="1000"
                value={fileRotationMb}
                onChange={(e) => setFileRotationMb(e.target.value)}
              />
              <Input
                label="Log Archive Retention (Days)"
                type="number"
                min="1"
                max="365"
                value={autoPruneDays}
                onChange={(e) => setAutoPruneDays(e.target.value)}
              />
            </FormRow>
          </CardContent>
        </Card>

        {/* Security & Token Group */}
        <Card compact className="flex flex-col gap-3">
          <CardHeader className="p-0 pb-1.5 mb-1.5">
            <div className="flex items-center gap-2">
              <Icon name="Key" size={14} className="text-[var(--accent)]" />
              <CardTitle>Authentication Secret</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex flex-col gap-3">
            <Input
              label="JWT Signature Secret Key"
              type="password"
              value={jwtSecret}
              onChange={(e) => setJwtSecret(e.target.value)}
            />
            <div className="text-[10.5px] text-[var(--text-dim)] font-mono">
              Note: Updating this secret invalidates existing client handshake tokens immediately.
            </div>
          </CardContent>
        </Card>
      </Form>
    </div>
  );
}
