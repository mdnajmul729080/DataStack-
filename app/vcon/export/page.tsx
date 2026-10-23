'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Input';
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

export default function ExportPage() {
  const { success, info } = useToast();
  const [clients, setClients] = useState<{ clientId: string; name: string }[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>('all');
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const clientRes = await fetch('/api/clients');
      if (clientRes.ok) {
        const clientData = await clientRes.json();
        setClients(clientData.clients || []);
      }

      const storageRes = await fetch(`/api/storage?clientId=${encodeURIComponent(selectedClient)}`);
      if (storageRes.ok) {
        const storageData = await storageRes.json();
        setFiles(storageData.files || []);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [selectedClient]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleExportAll = () => {
    const url = `/api/export?clientId=${encodeURIComponent(selectedClient)}`;
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${selectedClient}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    info('Export Initiated', `Streaming CSV download for client ${selectedClient}`);
  };

  const handleDownloadFile = (clientId: string, filename: string) => {
    const url = `/api/export?clientId=${encodeURIComponent(clientId)}&filename=${encodeURIComponent(filename)}`;
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    success('File Download Started', filename);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border)] pb-2">
        <h1 className="text-[14px] font-semibold text-[var(--text)] tracking-tight">
          CSV Exporter
        </h1>

        <Button
          size="xs"
          variant="primary"
          icon="Download"
          onClick={handleExportAll}
          className="self-start sm:self-auto"
        >
          Download All CSV
        </Button>
      </div>

      {/* Filter and Endpoint Specs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <Card compact className="flex flex-col gap-1.5 p-2 bg-[var(--bg-elevated)]">
          <CardHeader className="p-0 pb-1 mb-0 border-b-0">
            <CardTitle className="text-[11px]">Filter Scope</CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex flex-col gap-1.5">
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
            <div className="text-[9.5px] text-[var(--text-dim)] font-mono">
              Files: {files.length}
            </div>
          </CardContent>
        </Card>

        <Card compact className="md:col-span-2 flex flex-col gap-1 p-2 bg-[var(--bg-elevated)] font-mono text-[10px]">
          <CardHeader className="p-0 pb-1 mb-0 border-b-0">
            <CardTitle className="text-[11px]">API Export Endpoint</CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex flex-col gap-1">
            <div className="p-1.5 bg-[var(--bg-main)] border border-[var(--border)] flex items-center justify-between">
              <span className="text-[var(--accent)]">GET /api/export?clientId={selectedClient}</span>
              <span className="text-[9px] text-[var(--text-dim)]">Stream</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Partitioned Files List */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-[13px] font-semibold text-[var(--text)]">
            Stored CSV Partitions
          </h2>
          <span className="text-[10.5px] text-[var(--text-dim)] font-mono">
            /storage/data/&#123;clientId&#125;/&#123;YYYY-MM-DD&#125;.csv
          </span>
        </div>

        <TableWrap>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File Name</TableHead>
                <TableHead>Client ID</TableHead>
                <TableHead>Date Partition</TableHead>
                <TableHead>Approx. Rows</TableHead>
                <TableHead>Size (KB)</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.length === 0 ? (
                <TableEmpty colSpan={7} message="No CSV partitions found for selected client." />
              ) : (
                files.map((file, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-mono text-[11px] font-medium text-[var(--text)]">
                      {file.filename}
                    </TableCell>
                    <TableCell className="font-mono text-[11px] text-[var(--accent)]">
                      {file.clientId}
                    </TableCell>
                    <TableCell className="font-mono text-[11px]">
                      {file.date}
                    </TableCell>
                    <TableCell className="font-mono text-[11px]">
                      {file.linesCount.toLocaleString()}
                    </TableCell>
                    <TableCell className="font-mono text-[11px]">
                      {(file.sizeBytes / 1024).toFixed(1)} KB
                    </TableCell>
                    <TableCell className="text-[10.5px] text-[var(--text-dim)] font-mono">
                      {new Date(file.modifiedAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="xs"
                        variant="secondary"
                        icon="Download"
                        onClick={() => handleDownloadFile(file.clientId, file.filename)}
                      >
                        Download
                      </Button>
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
