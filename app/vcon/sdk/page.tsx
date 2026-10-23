'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Input';
import { Icon } from '@/components/ui/Icon';
import { useToast } from '@/components/ui/Toast';

export default function SdkGuidePage() {
  const { success } = useToast();
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string>('');

  useEffect(() => {
    async function loadClients() {
      try {
        const res = await fetch('/api/clients');
        if (res.ok) {
          const data = await res.json();
          const list = data.clients || [];
          setClients(list);
          if (list.length > 0) {
            setSelectedClientId(list[0].clientId);
          }
        }
      } catch {
        // ignore
      }
    }
    loadClients();
  }, []);

  const activeClient = clients.find((c) => c.clientId === selectedClientId) || clients[0];
  const sampleToken = activeClient?.token || 'YOUR_SIGNED_CLIENT_JWT_TOKEN';

  const pythonSnippet = `from datastack_sdk import DataStackClient

# Initialize client using credentials generated in /vcon/clients
client = DataStackClient(
    server_url="http://localhost:4000",
    token="${sampleToken}"
)

# Connect with automatic reconnection backoff
if client.connect():
    # 1. Sync single event in realtime
    res = client.sync({
        "event_type": "page_view",
        "url": "/products/wireless-headphones",
        "user_id": "usr_9942",
        "referrer": "google.com"
    })
    print("Sync response:", res)

    # 2. Sync high-throughput batch of records
    batch_res = client.batch_sync([
        {"sensor": "temp", "value": 24.5, "unit": "C"},
        {"sensor": "humidity", "value": 61.2, "unit": "%"},
        {"sensor": "pressure", "value": 1013.25, "unit": "hPa"}
    ])
    print("Batch response:", batch_res)

    client.disconnect()
`;

  const copySnippet = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    success('Copied', `${label} copied to clipboard`);
  };

  return (
    <div className="flex flex-col gap-4 max-w-[960px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border)] pb-2">
        <h1 className="text-[14px] font-semibold text-[var(--text)] tracking-tight">
          Python SDK
        </h1>

        <Button
          size="xs"
          variant="secondary"
          icon="Copy"
          onClick={() => copySnippet(pythonSnippet, 'Python Snippet')}
          className="self-start sm:self-auto"
        >
          Copy Code
        </Button>
      </div>

      {/* Installation Step */}
      <Card compact className="flex flex-col gap-1.5 font-mono text-[10.5px]">
        <div className="p-2 bg-[var(--bg-main)] border border-[var(--border)] flex items-center justify-between">
          <span className="text-[var(--accent)]">pip install ./sdk-python</span>
          <Button
            size="xs"
            variant="ghost"
            icon="Copy"
            onClick={() => copySnippet('pip install ./sdk-python', 'Pip command')}
          />
        </div>
      </Card>

      {/* Interactive Code Generator */}
      <Card compact className="flex flex-col gap-2">
        <CardHeader className="p-0 pb-1 mb-0 border-b-0">
          <div className="flex flex-wrap items-center justify-between gap-2 w-full">
            <CardTitle className="text-[11.5px]">Client Code Example</CardTitle>
            {clients.length > 0 && (
              <div className="w-[180px]">
                <Select
                  compact
                  value={selectedClientId}
                  onChange={(e) => setSelectedClientId(e.target.value)}
                >
                  {clients.map((c) => (
                    <option key={c.clientId} value={c.clientId}>
                      {c.clientId}
                    </option>
                  ))}
                </Select>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-0 flex flex-col gap-1">
          <div className="relative">
            <pre className="p-2.5 bg-[var(--bg-main)] border border-[var(--border)] text-[var(--text)] text-[10.5px] font-mono overflow-x-auto leading-relaxed">
              {pythonSnippet}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
