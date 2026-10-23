'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select, Textarea } from '@/components/ui/Input';
import { Icon } from '@/components/ui/Icon';
import { useToast } from '@/components/ui/Toast';

export default function SimulatorPage() {
  const { success, error } = useToast();
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [payloadText, setPayloadText] = useState<string>(
    JSON.stringify(
      {
        event_name: 'sensor_telemetry',
        temperature: 24.8,
        humidity: 58.2,
        voltage: 3.31,
        status: 'NOMINAL',
      },
      null,
      2
    )
  );
  const [sending, setSending] = useState(false);
  const [lastResponse, setLastResponse] = useState<any>(null);

  useEffect(() => {
    async function loadClients() {
      try {
        const res = await fetch('/api/clients');
        if (res.ok) {
          const data = await res.json();
          const list = data.clients || [];
          setClients(list);
          if (list.length > 0) setSelectedClient(list[0].clientId);
        }
      } catch {
        // ignore
      }
    }
    loadClients();
  }, []);

  const handleSendSingle = async () => {
    let parsedData: any;
    try {
      parsedData = JSON.parse(payloadText);
    } catch {
      error('Invalid JSON', 'Please fix payload syntax before emitting');
      return;
    }

    setSending(true);
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: selectedClient || 'py_telemetry_agent_01',
          data: parsedData,
        }),
      });

      const data = await res.json();
      setLastResponse(data);

      if (res.ok) {
        success('Event Accepted', `Event ID: ${data.event.eventId} buffered to Redis`);
      } else {
        error('Event Rejected', data.error || 'Server rejected');
      }
    } catch (err: any) {
      error('Error', err.message);
    } finally {
      setSending(false);
    }
  };

  const handleSendBatch = async (count = 10) => {
    setSending(true);
    try {
      let accepted = 0;
      for (let i = 0; i < count; i++) {
        const res = await fetch('/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clientId: selectedClient || 'py_telemetry_agent_01',
            data: {
              batch_index: i + 1,
              sensor: `sensor_${(i % 3) + 1}`,
              reading: +(Math.random() * 100).toFixed(2),
              timestamp: new Date().toISOString(),
            },
          }),
        });
        if (res.ok) accepted++;
      }
      success('Batch Streamed', `${accepted}/${count} records ingested into buffer`);
      setLastResponse({ success: true, batchSent: count, accepted });
    } catch (err: any) {
      error('Batch Error', err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-[960px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border)] pb-2">
        <h1 className="text-[14px] font-semibold text-[var(--text)] tracking-tight">
          Simulator
        </h1>

        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <Button
            size="xs"
            variant="secondary"
            loading={sending}
            onClick={() => handleSendBatch(10)}
          >
            Burst 10
          </Button>
          <Button
            size="xs"
            variant="primary"
            icon="Send"
            loading={sending}
            onClick={handleSendSingle}
          >
            Send Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Editor Card */}
        <Card compact className="flex flex-col gap-2 p-2 bg-[var(--bg-elevated)]">
          <CardHeader className="p-0 pb-1 mb-0 border-b-0">
            <CardTitle className="text-[11px]">Payload Configuration</CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex flex-col gap-2">
            <Select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
            >
              {clients.map((c) => (
                <option key={c.clientId} value={c.clientId}>
                  {c.clientId}
                </option>
              ))}
            </Select>

            <Textarea
              rows={8}
              value={payloadText}
              onChange={(e) => setPayloadText(e.target.value)}
            />
          </CardContent>
        </Card>

        {/* Response Inspector */}
        <Card compact className="flex flex-col gap-1.5 p-2 bg-[var(--bg-elevated)] font-mono text-[10px]">
          <CardHeader className="p-0 pb-1 mb-0 border-b-0">
            <CardTitle className="text-[11px]">Pipeline Response</CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex flex-col gap-1">
            {lastResponse ? (
              <pre className="p-2.5 bg-[var(--bg-main)] border border-[var(--border)] text-[var(--text)] overflow-x-auto max-h-[240px]">
                {JSON.stringify(lastResponse, null, 2)}
              </pre>
            ) : (
              <div className="p-6 text-center text-[var(--text-dim)] italic border border-dashed border-[var(--border-strong)]">
                Click &apos;Send Event&apos; to test ingestion.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
