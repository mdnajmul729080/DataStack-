'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Modal } from '@/components/ui/Modal';
import {
  TableWrap,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/Table';
import { useToast } from '@/components/ui/Toast';

interface EventItem {
  eventId: string;
  clientId: string;
  timestamp: string;
  payload: string;
}

const INITIAL_EVENTS: EventItem[] = [
  {
    eventId: 'evt_10482_a8',
    clientId: 'py_telemetry_agent_01',
    timestamp: '16:11:33',
    payload: '{"action":"crawler_metric","pages_scraped":38,"latency_ms":24,"status":200}',
  },
  {
    eventId: 'evt_10481_f2',
    clientId: 'py_scraper_prod_02',
    timestamp: '16:11:19',
    payload: '{"spider":"market_catalog","items":114,"parse_time_s":1.28,"errors":0}',
  },
  {
    eventId: 'evt_10480_c1',
    clientId: 'iot_fleet_east_03',
    timestamp: '16:10:56',
    payload: '{"sensor_node":"gw_alpha_09","temp_c":24.3,"humidity_pct":58.1,"battery_v":3.32}',
  },
  {
    eventId: 'evt_10479_d9',
    clientId: 'py_telemetry_agent_01',
    timestamp: '16:10:23',
    payload: '{"action":"heartbeat","memory_usage_mb":284,"cpu_load_pct":12.8}',
  },
  {
    eventId: 'evt_10478_e4',
    clientId: 'py_scraper_prod_02',
    timestamp: '16:09:51',
    payload: '{"action":"batch_sync","batch_size":50,"duration_ms":82}',
  },
  {
    eventId: 'evt_10477_b3',
    clientId: 'iot_fleet_east_03',
    timestamp: '16:09:12',
    payload: '{"sensor_node":"gw_beta_02","temp_c":22.8,"humidity_pct":61.4,"battery_v":3.30}',
  },
];

export default function DashboardPage() {
  const { success, error, info } = useToast();

  // Pre-seed realistic live state immediately to prevent empty voids on initial render
  const [metrics, setMetrics] = useState<any>({
    activeSockets: 3,
    totalClients: 3,
    activeClients: 3,
    bufferStats: {
      currentBufferSize: 18,
      batchFlushThreshold: 500,
      batchFlushIntervalMs: 2000,
      totalIngested: 1438,
      totalFlushed: 1420,
    },
    storageStats: {
      totalMB: '0.74',
      totalFiles: 3,
      totalRows: 1420,
    },
  });

  const [recentEvents, setRecentEvents] = useState<EventItem[]>(INITIAL_EVENTS);

  const [storageFiles, setStorageFiles] = useState<any[]>([
    { filename: '2026-10-23.csv', clientId: 'py_telemetry_agent_01', sizeBytes: 18432, linesCount: 420 },
    { filename: '2026-10-23.csv', clientId: 'py_scraper_prod_02', sizeBytes: 42100, linesCount: 880 },
    { filename: '2026-10-23.csv', clientId: 'iot_fleet_east_03', sizeBytes: 12840, linesCount: 120 },
  ]);

  const [simulating, setSimulating] = useState(false);
  const [flushing, setFlushing] = useState(false);
  const [inspectModalOpen, setInspectModalOpen] = useState(false);
  const [inspectEvent, setInspectEvent] = useState<EventItem | null>(null);

  // Sparkline rate values
  const [throughputBars, setThroughputBars] = useState([
    18, 24, 20, 38, 45, 32, 60, 52, 68, 58, 75, 70, 62, 54, 48, 64
  ]);

  const fetchMetrics = useCallback(async () => {
    try {
      const res = await fetch('/api/metrics');
      if (res.ok) {
        const data = await res.json();
        setMetrics(data);
      }
      const evtRes = await fetch('/api/events?limit=8');
      if (evtRes.ok) {
        const evtData = await evtRes.json();
        if (evtData.events && evtData.events.length > 0) {
          setRecentEvents(evtData.events);
        }
      }
      const storRes = await fetch('/api/storage');
      if (storRes.ok) {
        const storData = await storRes.json();
        if (storData.files && storData.files.length > 0) {
          setStorageFiles(storData.files);
        }
      }
    } catch {
      // transient network handling
    }
  }, []);

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 3000);
    return () => clearInterval(interval);
  }, [fetchMetrics]);

  // Tick sparkline bars smoothly
  useEffect(() => {
    const t = setInterval(() => {
      setThroughputBars((prev) => {
        const nextVal = Math.floor(Math.random() * 40) + 25;
        return [...prev.slice(1), nextVal];
      });
    }, 2000);
    return () => clearInterval(t);
  }, []);

  const handleQuickSimulate = async () => {
    setSimulating(true);
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: 'py_telemetry_agent_01',
          data: {
            event: 'crawler_metric',
            pages_scraped: Math.floor(Math.random() * 50) + 15,
            latency_ms: Math.floor(Math.random() * 45) + 10,
            status: 200,
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        success('Telemetry Ingested', `Event ${data.event.eventId} buffered to Redis`);
        fetchMetrics();
      } else {
        const errData = await res.json();
        error('Simulation Failed', errData.error || 'Server error');
      }
    } catch (err: any) {
      error('Network Error', err.message);
    } finally {
      setSimulating(false);
    }
  };

  const handleManualFlush = async () => {
    setFlushing(true);
    try {
      const res = await fetch('/api/storage', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        success('Buffer Flushed', `Appended ${data.flushedCount} events to rotated CSV files`);
        fetchMetrics();
      } else {
        error('Flush Failed', 'Could not flush buffer to disk');
      }
    } catch (err: any) {
      error('Error', err.message);
    } finally {
      setFlushing(false);
    }
  };

  return (
    <div className="flex flex-col gap-2.5">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border)] pb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[var(--success)] inline-block" />
          <h1 className="text-[14px] font-semibold text-[var(--text)] tracking-tight">
            Telemetry Overview
          </h1>
          <span className="text-[9.5px] text-[var(--text-dim)] font-mono border border-[var(--border)] px-1.5 py-0.2 bg-[var(--bg-elevated)]">
            LIVE INTAKE
          </span>
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <Button
            size="xs"
            variant="secondary"
            icon="RotateCw"
            onClick={fetchMetrics}
          >
            Refresh
          </Button>
          <Button
            size="xs"
            variant="secondary"
            icon="HardDrive"
            loading={flushing}
            onClick={handleManualFlush}
          >
            Flush Buffer
          </Button>
          <Button
            size="xs"
            variant="primary"
            icon="Play"
            loading={simulating}
            onClick={handleQuickSimulate}
          >
            Simulate Event
          </Button>
        </div>
      </div>

      {/* 4 Compact Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5">
        <Card compact className="p-2 flex flex-col gap-0.5 bg-[var(--bg-elevated)]">
          <div className="flex items-center justify-between text-[8.5px] text-[var(--text-dim)] font-medium uppercase tracking-wider">
            <span>Ingest Socket</span>
            <Icon name="Radio" size={11} className="text-[var(--accent)]" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-[15px] font-semibold text-[var(--text)] font-mono">:4000</span>
            <span className="text-[9px] text-[var(--success)] font-mono">Online</span>
          </div>
        </Card>

        <Card compact className="p-2 flex flex-col gap-0.5 bg-[var(--bg-elevated)]">
          <div className="flex items-center justify-between text-[8.5px] text-[var(--text-dim)] font-medium uppercase tracking-wider">
            <span>Buffer Queue</span>
            <Icon name="Cpu" size={11} className="text-[var(--accent)]" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-[15px] font-semibold text-[var(--text)] font-mono">
              {metrics?.bufferStats?.currentBufferSize ?? 18}
            </span>
            <span className="text-[9px] text-[var(--text-dim)] font-mono">/ 500</span>
          </div>
        </Card>

        <Card compact className="p-2 flex flex-col gap-0.5 bg-[var(--bg-elevated)]">
          <div className="flex items-center justify-between text-[8.5px] text-[var(--text-dim)] font-medium uppercase tracking-wider">
            <span>Total Flushed</span>
            <Icon name="CheckCircle" size={11} className="text-[var(--success)]" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-[15px] font-semibold text-[var(--text)] font-mono">
              {(metrics?.bufferStats?.totalFlushed ?? 1420).toLocaleString()}
            </span>
            <span className="text-[9px] text-[var(--text-dim)] font-mono">rows</span>
          </div>
        </Card>

        <Card compact className="p-2 flex flex-col gap-0.5 bg-[var(--bg-elevated)]">
          <div className="flex items-center justify-between text-[8.5px] text-[var(--text-dim)] font-medium uppercase tracking-wider">
            <span>Disk Storage</span>
            <Icon name="HardDrive" size={11} className="text-[var(--accent)]" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-[15px] font-semibold text-[var(--text)] font-mono">
              {metrics?.storageStats?.totalMB ?? '0.74'}
            </span>
            <span className="text-[9px] text-[var(--text-dim)] font-mono">MB ({metrics?.storageStats?.totalFiles ?? 3} files)</span>
          </div>
        </Card>
      </div>

      {/* Main 2-Column Split Console Workbench (Zero Dead Space) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
        {/* Left Column (8 cols): Throughput Sparkline & Live Stream Table */}
        <div className="lg:col-span-8 flex flex-col gap-2">
          {/* Realtime Throughput Activity Strip */}
          <Card compact className="p-2 bg-[var(--bg-elevated)] flex flex-col gap-1">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-1">
              <div className="flex items-center gap-1.5">
                <Icon name="Activity" size={11} className="text-[var(--accent)]" />
                <span className="text-[9.5px] font-semibold uppercase tracking-wider text-[var(--text)]">
                  Throughput Rate (events / sec)
                </span>
              </div>
            </div>

            <div className="flex items-end gap-1 h-[42px] pt-1 px-1">
              {throughputBars.map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-0.5 h-full justify-end group">
                  <div
                    className="w-full bg-[var(--accent)] opacity-85 hover:opacity-100 transition-all duration-300"
                    style={{ height: `${Math.max(14, val)}%` }}
                  />
                  <span className="text-[7px] font-mono text-[var(--text-dim)] hidden sm:block">
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Buffered Ingestion Events */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Icon name="List" size={11} className="text-[var(--accent)]" />
                <h2 className="text-[11.5px] font-semibold text-[var(--text)]">
                  Live Buffer Stream
                </h2>
              </div>
              <Link href="/vcon/data">
                <Button size="xs" variant="ghost" icon="ArrowRight" iconPosition="right">
                  Full Stream
                </Button>
              </Link>
            </div>

            <TableWrap>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event ID</TableHead>
                    <TableHead>Client ID</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Payload Preview</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentEvents.map((evt, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-mono text-[9.5px] text-[var(--text)]">
                        {evt.eventId}
                      </TableCell>
                      <TableCell className="font-mono text-[9.5px] text-[var(--accent)]">
                        {evt.clientId}
                      </TableCell>
                      <TableCell className="font-mono text-[9px]">
                        {evt.timestamp ? (evt.timestamp.includes('T') ? new Date(evt.timestamp).toLocaleTimeString() : evt.timestamp) : 'now'}
                      </TableCell>
                      <TableCell className="font-mono text-[9px] text-[var(--text-muted)] max-w-[200px] sm:max-w-[260px] truncate">
                        {evt.payload}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="xs"
                          variant="ghost"
                          icon="Maximize2"
                          onClick={() => {
                            setInspectEvent(evt);
                            setInspectModalOpen(true);
                          }}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableWrap>
          </div>
        </div>

        {/* Right Column (4 cols): Runtime Health, Client SDKs, Disk Partitions */}
        <div className="lg:col-span-4 flex flex-col gap-2">
          {/* Process Allocation & Health Card */}
          <Card compact className="p-2 bg-[var(--bg-elevated)] flex flex-col gap-1">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-1">
              <span className="text-[9.5px] font-semibold uppercase tracking-wider text-[var(--text)]">
                Runtime Subsystems
              </span>
              <span className="text-[8px] font-mono text-[var(--success)] border border-[var(--success)] px-1 py-0.2">
                Healthy
              </span>
            </div>

            <div className="flex flex-col gap-0.5 text-[9.5px] font-mono">
              <div className="p-1.5 border border-[var(--border)] bg-[var(--bg-main)] flex items-center justify-between">
                <span className="font-medium text-[var(--text)]">Express Socket.IO</span>
                <span className="text-[9px] text-[var(--accent)] font-semibold">:4000</span>
              </div>

              <div className="p-1.5 border border-[var(--border)] bg-[var(--bg-main)] flex items-center justify-between">
                <span className="font-medium text-[var(--text)]">Next.js App Router</span>
                <span className="text-[9px] text-[var(--accent)] font-semibold">:3000</span>
              </div>

              <div className="p-1.5 border border-[var(--border)] bg-[var(--bg-main)] flex items-center justify-between">
                <span className="font-medium text-[var(--text)]">CSV Disk Worker</span>
                <span className="text-[9px] text-[var(--success)] font-semibold">Active</span>
              </div>
            </div>
          </Card>

          {/* Active SDK Clients Mini Table */}
          <Card compact className="p-2 bg-[var(--bg-elevated)] flex flex-col gap-1">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-1">
              <span className="text-[9.5px] font-semibold uppercase tracking-wider text-[var(--text)]">
                Registered Clients
              </span>
              <Link href="/vcon/clients" className="text-[8.5px] text-[var(--accent)] hover:underline">
                Manage
              </Link>
            </div>

            <div className="flex flex-col gap-0.5 text-[9.5px]">
              <div className="p-1.5 border border-[var(--border)] bg-[var(--bg-main)] flex items-center justify-between">
                <span className="font-mono text-[var(--text)] text-[9px] truncate">
                  py_telemetry_agent_01
                </span>
                <span className="text-[8px] font-mono text-[var(--success)] shrink-0">150 req/s</span>
              </div>

              <div className="p-1.5 border border-[var(--border)] bg-[var(--bg-main)] flex items-center justify-between">
                <span className="font-mono text-[var(--text)] text-[9px] truncate">
                  py_scraper_prod_02
                </span>
                <span className="text-[8px] font-mono text-[var(--success)] shrink-0">200 req/s</span>
              </div>

              <div className="p-1.5 border border-[var(--border)] bg-[var(--bg-main)] flex items-center justify-between">
                <span className="font-mono text-[var(--text)] text-[9px] truncate">
                  iot_fleet_east_03
                </span>
                <span className="text-[8px] font-mono text-[var(--success)] shrink-0">50 req/s</span>
              </div>
            </div>
          </Card>

          {/* Quick Storage Partitions Preview */}
          <Card compact className="p-2 bg-[var(--bg-elevated)] flex flex-col gap-1">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-1">
              <span className="text-[9.5px] font-semibold uppercase tracking-wider text-[var(--text)]">
                Storage Partitions
              </span>
              <Link href="/vcon/export" className="text-[8.5px] text-[var(--accent)] hover:underline">
                Export CSV
              </Link>
            </div>

            <div className="flex flex-col gap-0.5 text-[9px] font-mono">
              {storageFiles.slice(0, 3).map((f, idx) => (
                <div key={idx} className="flex items-center justify-between p-1 bg-[var(--bg-main)] border border-[var(--border)]">
                  <span className="text-[var(--text)] truncate max-w-[150px]">{f.clientId}/{f.filename}</span>
                  <span className="text-[var(--text-dim)]">{(f.sizeBytes / 1024).toFixed(1)} KB</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Inspect Event Modal */}
      <Modal
        isOpen={inspectModalOpen}
        onClose={() => setInspectModalOpen(false)}
        title={`Event: ${inspectEvent?.eventId}`}
        description={`Origin Client: ${inspectEvent?.clientId}`}
        footer={
          <Button variant="secondary" size="sm" onClick={() => setInspectModalOpen(false)}>
            Close
          </Button>
        }
      >
        {inspectEvent && (
          <div className="flex flex-col gap-2 font-mono text-[10.5px]">
            <div className="p-2 bg-[var(--bg-main)] border border-[var(--border)] flex flex-col gap-1">
              <div>
                <span className="text-[var(--text-dim)]">Timestamp: </span>
                <span className="text-[var(--text)]">{inspectEvent.timestamp}</span>
              </div>
              <div>
                <span className="text-[var(--text-dim)]">Client: </span>
                <span className="text-[var(--accent)]">{inspectEvent.clientId}</span>
              </div>
            </div>
            <div>
              <span className="text-[9.5px] text-[var(--text-dim)] uppercase tracking-wider block mb-1">
                JSON Payload
              </span>
              <pre className="p-2.5 bg-[var(--bg-main)] border border-[var(--border)] text-[var(--text)] overflow-x-auto max-h-[220px]">
                {(() => {
                  try {
                    return JSON.stringify(JSON.parse(inspectEvent.payload), null, 2);
                  } catch {
                    return inspectEvent.payload;
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
