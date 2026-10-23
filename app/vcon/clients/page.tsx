'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
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

interface ClientItem {
  clientId: string;
  name: string;
  secret: string;
  token: string;
  rateLimit: number;
  status: 'active' | 'revoked';
  totalEvents: number;
  lastActive?: string;
  createdAt: string;
}

export default function ClientsPage() {
  const { success, error, warning } = useToast();
  const [clients, setClients] = useState<ClientItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tokenModalOpen, setTokenModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientItem | null>(null);

  // Form State
  const [newClientId, setNewClientId] = useState('');
  const [newClientName, setNewClientName] = useState('');
  const [newRateLimit, setNewRateLimit] = useState('100');
  const [submitting, setSubmitting] = useState(false);

  const fetchClients = useCallback(async () => {
    try {
      const res = await fetch('/api/clients');
      if (res.ok) {
        const data = await res.json();
        setClients(data.clients || []);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientId.trim() || !newClientName.trim()) {
      error('Validation Error', 'Client ID and Client Name are required');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: newClientId.trim(),
          name: newClientName.trim(),
          rateLimit: Number(newRateLimit) || 100,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        success('Client Registered', `Client ${data.client.clientId} created successfully`);
        setCreateModalOpen(false);
        setNewClientId('');
        setNewClientName('');
        setNewRateLimit('100');
        fetchClients();
        // Open token modal immediately
        setSelectedClient(data.client);
        setTokenModalOpen(true);
      } else {
        const errData = await res.json();
        error('Registration Failed', errData.error || 'Unknown error');
      }
    } catch (err: any) {
      error('Error', err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (client: ClientItem) => {
    const newStatus = client.status === 'active' ? 'revoked' : 'active';
    try {
      const res = await fetch(`/api/clients/${client.clientId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        warning(
          `Status Changed`,
          `Client ${client.clientId} is now ${newStatus.toUpperCase()}`
        );
        fetchClients();
      }
    } catch (err: any) {
      error('Update Failed', err.message);
    }
  };

  const handleRegenerateToken = async (client: ClientItem) => {
    try {
      const res = await fetch(`/api/clients/${client.clientId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'regenerate_token' }),
      });
      if (res.ok) {
        const data = await res.json();
        success('Token Regenerated', `New JWT issued for ${client.clientId}`);
        setSelectedClient(data.client);
        setTokenModalOpen(true);
        fetchClients();
      }
    } catch (err: any) {
      error('Regeneration Failed', err.message);
    }
  };

  const handleDeleteClient = async (client: ClientItem) => {
    if (!confirm(`Are you sure you want to delete client '${client.clientId}'?`)) return;

    try {
      const res = await fetch(`/api/clients/${client.clientId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        success('Client Removed', `Client ${client.clientId} deleted`);
        fetchClients();
      }
    } catch (err: any) {
      error('Deletion Failed', err.message);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    success('Copied to Clipboard', `${label} copied`);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border)] pb-2">
        <h1 className="text-[14px] font-semibold text-[var(--text)] tracking-tight">
          Client SDKs
        </h1>
        <Button
          size="xs"
          variant="primary"
          icon="Plus"
          onClick={() => setCreateModalOpen(true)}
          className="self-start sm:self-auto"
        >
          Register Client
        </Button>
      </div>

      {/* Clients Table */}
      <TableWrap>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client ID</TableHead>
              <TableHead>Client Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Rate Limit</TableHead>
              <TableHead>Total Ingested</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.length === 0 ? (
              <TableEmpty colSpan={7} message="No registered SDK clients yet." />
            ) : (
              clients.map((client) => (
                <TableRow key={client.clientId}>
                  <TableCell className="font-mono text-[11px] font-medium text-[var(--accent)]">
                    {client.clientId}
                  </TableCell>
                  <TableCell className="text-[11.5px] text-[var(--text)]">
                    {client.name}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`text-[9.5px] font-mono px-1.5 py-0.5 border ${
                        client.status === 'active'
                          ? 'border-[var(--success)] text-[var(--success)] bg-[var(--success-soft)]'
                          : 'border-[var(--danger)] text-[var(--danger)] bg-[var(--danger-soft)]'
                      }`}
                    >
                      {client.status.toUpperCase()}
                    </span>
                  </TableCell>
                  <TableCell className="font-mono text-[11px] text-[var(--text-muted)]">
                    {client.rateLimit} req/s
                  </TableCell>
                  <TableCell className="font-mono text-[11px] text-[var(--text)]">
                    {client.totalEvents.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-[10.5px] text-[var(--text-dim)] font-mono">
                    {new Date(client.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        size="xs"
                        variant="secondary"
                        icon="Key"
                        onClick={() => {
                          setSelectedClient(client);
                          setTokenModalOpen(true);
                        }}
                      >
                        Token
                      </Button>
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={() => handleToggleStatus(client)}
                      >
                        {client.status === 'active' ? 'Revoke' : 'Activate'}
                      </Button>
                      <Button
                        size="xs"
                        variant="ghost"
                        icon="Trash2"
                        className="text-[var(--danger)]"
                        onClick={() => handleDeleteClient(client)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableWrap>

      {/* Register Client Modal */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Register Client SDK"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              loading={submitting}
              onClick={handleCreateClient}
            >
              Confirm
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreateClient} className="flex flex-col gap-3">
          <Input
            label="Client Identifier"
            placeholder="e.g. py_order_service_04"
            value={newClientId}
            onChange={(e) => setNewClientId(e.target.value)}
            required
          />
          <Input
            label="Client Name"
            placeholder="e.g. Order Service"
            value={newClientName}
            onChange={(e) => setNewClientName(e.target.value)}
            required
          />
          <Input
            label="Rate Limit (req/s)"
            type="number"
            min="1"
            max="5000"
            value={newRateLimit}
            onChange={(e) => setNewRateLimit(e.target.value)}
          />
        </form>
      </Modal>

      {/* View Token & Credentials Modal */}
      <Modal
        isOpen={tokenModalOpen}
        onClose={() => setTokenModalOpen(false)}
        title={`Credentials: ${selectedClient?.clientId}`}
        footer={
          <Button variant="secondary" size="sm" onClick={() => setTokenModalOpen(false)}>
            Close
          </Button>
        }
      >
        {selectedClient && (
          <div className="flex flex-col gap-3 font-mono text-[11px]">
            <div>
              <span className="text-[10px] text-[var(--text-dim)] uppercase tracking-wider block mb-1">
                Client ID
              </span>
              <div className="p-2 bg-[var(--bg-main)] border border-[var(--border)] text-[var(--text)] flex items-center justify-between">
                <span>{selectedClient.clientId}</span>
                <Button
                  size="xs"
                  variant="ghost"
                  icon="Copy"
                  onClick={() => copyToClipboard(selectedClient.clientId, 'Client ID')}
                />
              </div>
            </div>

            <div>
              <span className="text-[10px] text-[var(--text-dim)] uppercase tracking-wider block mb-1">
                Client Secret Key
              </span>
              <div className="p-2 bg-[var(--bg-main)] border border-[var(--border)] text-[var(--text)] flex items-center justify-between">
                <span className="truncate">{selectedClient.secret}</span>
                <Button
                  size="xs"
                  variant="ghost"
                  icon="Copy"
                  onClick={() => copyToClipboard(selectedClient.secret, 'Client Secret')}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-[var(--text-dim)] uppercase tracking-wider">
                  JWT Handshake Bearer Token
                </span>
                <Button
                  size="xs"
                  variant="ghost"
                  icon="RefreshCw"
                  onClick={() => handleRegenerateToken(selectedClient)}
                >
                  Regenerate
                </Button>
              </div>
              <textarea
                readOnly
                value={selectedClient.token}
                rows={4}
                className="w-full bg-[var(--bg-main)] border border-[var(--border)] p-2 text-[10.5px] text-[var(--accent)] resize-none"
              />
              <Button
                size="sm"
                variant="secondary"
                icon="Copy"
                className="mt-1 w-full"
                onClick={() => copyToClipboard(selectedClient.token, 'JWT Token')}
              >
                Copy JWT Token
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
