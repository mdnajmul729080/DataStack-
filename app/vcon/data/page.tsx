'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Icon } from '@/components/ui/Icon';
import {
  TableWrap,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableEmpty,
} from '@/components/ui/Table';
import { useToast } from '@/components/ui/Toast';

interface StreamEvent {
  clientId: string;
  eventId: string;
  timestamp: string;
  payload: string;
}

export default function LiveDataPage() {
  const { success, error } = useToast();
  const [events, setEvents] = useState<StreamEvent[]>([]);
  const [clients, setClients] = useState<{ clientId: string; name: string }[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<StreamEvent | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchClients = useCallback(async () => {
    try {
      const res = await fetch('/api/clients');
      if (res.ok) {
        const data = await res.json();
        setClients(data.clients || []);
      }
    } catch {
      // ignore
    }
  }, []);

  const fetchEvents = useCallback(async () => {
    if (isPaused) return;
    try {
      const url = selectedClient !== 'all'
        ? `/api/events?clientId=${encodeURIComponent(selectedClient)}&limit=100`
        : '/api/events?limit=100';
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setEvents(data.events || []);
      }
    } catch {
      // ignore
    }
  }, [isPaused, selectedClient]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  useEffect(() => {
    fetchEvents();
    const interval = setInterval(fetchEvents, 2000);
    return () => clearInterval(interval);
  }, [fetchEvents]);

  const handleSimulate = async () => {
    try {
      const targetClientId = selectedClient !== 'all' ? selectedClient : 'py_telemetry_agent_01';
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: targetClientId,
          data: {
            source: 'live_stream_simulator',
            reading: +(Math.random() * 100).toFixed(2),
            status: 'OK',
            timestamp_ms: Date.now(),
          },
        }),
      });
      if (res.ok) {
        const data = await res.json();
        success('Stream Event Emitted', `Event ${data.event.eventId} pushed`);
        fetchEvents();
      }
    } catch (err: any) {
      error('Failed to emit', err.message);
    }
  };

  const filteredEvents = events.filter((e) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      e.eventId.toLowerCase().includes(q) ||
      e.clientId.toLowerCase().includes(q) ||
      e.payload.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border)] pb-2">
        <h1 className="text-[14px] font-semibold text-[var(--text)] tracking-tight">
          Live Stream
        </h1>

        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <Button
            size="xs"
            variant={isPaused ? 'primary' : 'secondary'}
            icon={isPaused ? 'Play' : 'Pause'}
            onClick={() => setIsPaused((prev) => !prev)}
          >
            {isPaused ? 'Resume' : 'Pause'}
          </Button>
          <Button
            size="xs"
            variant="secondary"
            icon="Radio"
            onClick={handleSimulate}
          >
            Emit Event
          </Button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <Card compact className="p-2.5 bg-[var(--bg-elevated)] flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[240px]">
          <div className="w-[180px]">
            <Select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
            >
              <option value="all">All Clients</option>
              {clients.map((c) => (
                <option key={c.clientId} value={c.clientId}>
                  {c.clientId}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex-1 min-w-[160px] max-w-[340px]">
            <Input
              placeholder="Search eventId or payload content..."
              icon="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--text-dim)]">
          <span className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 inline-block ${
                isPaused ? 'bg-[var(--warning)]' : 'bg-[var(--success)] animate-pulse'
              }`}
            />
            <span>{isPaused ? 'PAUSED' : 'STREAMING'}</span>
          </span>
          <span>|</span>
          <span>{filteredEvents.length} events</span>
        </div>
      </Card>

      {/* Events Table */}
      <TableWrap>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event ID</TableHead>
              <TableHead>Client ID</TableHead>
              <TableHead>Ingestion Timestamp</TableHead>
              <TableHead>Payload Preview</TableHead>
              <TableHead className="text-right">Inspect</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvents.length === 0 ? (
              <TableEmpty
                colSpan={5}
                message={
                  isPaused
                    ? 'Stream is paused.'
                    : 'No incoming events in memory buffer yet. Click "Emit Event" above or sync via Python SDK.'
                }
              />
            ) : (
              filteredEvents.map((evt, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-mono text-[11px] text-[var(--text)]">
                    {evt.eventId}
                  </TableCell>
                  <TableCell className="font-mono text-[11px] text-[var(--accent)]">
                    {evt.clientId}
                  </TableCell>
                  <TableCell className="font-mono text-[10.5px]">
                    {evt.timestamp}
                  </TableCell>
                  <TableCell className="font-mono text-[10.5px] text-[var(--text-muted)] max-w-[300px] truncate">
                    {evt.payload}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="xs"
                      variant="ghost"
                      icon="Maximize2"
                      onClick={() => {
                        setSelectedEvent(evt);
                        setModalOpen(true);
                      }}
                    >
                      Inspect
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableWrap>

      {/* Inspect Event Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`Event Inspector: ${selectedEvent?.eventId}`}
        description={`Origin Client: ${selectedEvent?.clientId}`}
        footer={
          <Button variant="secondary" size="sm" onClick={() => setModalOpen(false)}>
            Close
          </Button>
        }
      >
        {selectedEvent && (
          <div className="flex flex-col gap-3 font-mono text-[11px]">
            <div className="grid grid-cols-2 gap-2 text-[10.5px] p-2 bg-[var(--bg-main)] border border-[var(--border)]">
              <div>
                <span className="text-[var(--text-dim)]">Event ID: </span>
                <span className="text-[var(--text)] font-semibold">{selectedEvent.eventId}</span>
              </div>
              <div>
                <span className="text-[var(--text-dim)]">Client: </span>
                <span className="text-[var(--accent)] font-semibold">{selectedEvent.clientId}</span>
              </div>
              <div className="col-span-2">
                <span className="text-[var(--text-dim)]">Timestamp: </span>
                <span className="text-[var(--text)]">{selectedEvent.timestamp}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] text-[var(--text-dim)] uppercase tracking-wider block mb-1">
                JSON Payload Structure
              </span>
              <pre className="p-3 bg-[var(--bg-main)] border border-[var(--border)] text-[var(--text)] text-[11px] overflow-x-auto max-h-[300px]">
                {(() => {
                  try {
                    return JSON.stringify(JSON.parse(selectedEvent.payload), null, 2);
                  } catch {
                    return selectedEvent.payload;
                  }
                })()}
              </pre>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
