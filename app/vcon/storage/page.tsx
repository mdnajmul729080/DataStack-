'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
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

export default function StoragePage() {
  const { success, error } = useToast();
  const [stats, setStats] = useState<any>(null);
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [flushing, setFlushing] = useState(false);

  const fetchStorageData = useCallback(async () => {
    try {
      const res = await fetch('/api/storage');
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
        setFiles(data.files || []);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStorageData();
  }, [fetchStorageData]);

  const handleManualFlush = async () => {
    setFlushing(true);
    try {
      const res = await fetch('/api/storage', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        success('Buffer Flushed', `Flushed ${data.flushedCount} events to CSV files`);
        fetchStorageData();
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
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border)] pb-2">
        <h1 className="text-[14px] font-semibold text-[var(--text)] tracking-tight">
          CSV Storage
        </h1>

        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <Button
            size="xs"
            variant="secondary"
            icon="RotateCw"
            onClick={fetchStorageData}
          >
            Refresh
          </Button>
          <Button
            size="xs"
            variant="primary"
            icon="HardDrive"
            loading={flushing}
            onClick={handleManualFlush}
          >
            Flush Buffer
          </Button>
        </div>
      </div>

      {/* Storage Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5">
        <Card compact className="p-2 flex flex-col gap-0.5 bg-[var(--bg-elevated)]">
          <span className="text-[8.5px] uppercase tracking-wider text-[var(--text-dim)] font-medium">Disk Usage</span>
          <span className="text-[15px] font-semibold text-[var(--text)] font-mono">
            {stats?.totalMB ?? '0.00'} MB
          </span>
        </Card>

        <Card compact className="p-2 flex flex-col gap-0.5 bg-[var(--bg-elevated)]">
          <span className="text-[8.5px] uppercase tracking-wider text-[var(--text-dim)] font-medium">CSV Files</span>
          <span className="text-[15px] font-semibold text-[var(--text)] font-mono">
            {stats?.totalFiles ?? 0}
          </span>
        </Card>

        <Card compact className="p-2 flex flex-col gap-0.5 bg-[var(--bg-elevated)]">
          <span className="text-[8.5px] uppercase tracking-wider text-[var(--text-dim)] font-medium">Persisted Rows</span>
          <span className="text-[15px] font-semibold text-[var(--text)] font-mono">
            {stats?.totalRows ? stats.totalRows.toLocaleString() : 0}
          </span>
        </Card>

        <Card compact className="p-2 flex flex-col gap-0.5 bg-[var(--bg-elevated)]">
          <span className="text-[8.5px] uppercase tracking-wider text-[var(--text-dim)] font-medium">Rotation Rule</span>
          <span className="text-[13px] font-semibold text-[var(--accent)] font-mono">
            100MB / Daily
          </span>
        </Card>
      </div>

      {/* Partition Files Table */}
      <div className="flex flex-col gap-2">
        <h2 className="text-[13px] font-semibold text-[var(--text)]">
          CSV Files on Disk
        </h2>

        <TableWrap>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client Folder</TableHead>
                <TableHead>Partition Filename</TableHead>
                <TableHead>File Size</TableHead>
                <TableHead>Data Lines</TableHead>
                <TableHead>Last Rotation / Append</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.length === 0 ? (
                <TableEmpty colSpan={5} message="No CSV files generated yet. Events in memory buffer will flush automatically or via 'Flush Buffer Now'." />
              ) : (
                files.map((file, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-mono text-[11px] text-[var(--accent)]">
                      {file.clientId}
                    </TableCell>
                    <TableCell className="font-mono text-[11px] font-medium text-[var(--text)]">
                      {file.filename}
                    </TableCell>
                    <TableCell className="font-mono text-[11px]">
                      {(file.sizeBytes / 1024).toFixed(1)} KB
                    </TableCell>
                    <TableCell className="font-mono text-[11px]">
                      {file.linesCount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-[10.5px] text-[var(--text-dim)] font-mono">
                      {new Date(file.modifiedAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableWrap>
      </div>
    </div>
  );
}
