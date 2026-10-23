'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';

export const Hero: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('pip install ./sdk-python');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-2.5 py-1">
      {/* Title */}
      <div className="flex flex-col gap-1">
        <h1 className="text-[16px] sm:text-[18px] font-semibold tracking-tight text-[var(--text)]">
          Realtime Data Collection Platform
        </h1>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-1.5">
        <Link href="/vcon/dashboard">
          <Button size="xs" variant="primary" icon="Terminal">
            Console (/vcon/)
          </Button>
        </Link>
        <Link href="/vcon/data">
          <Button size="xs" variant="secondary" icon="Activity">
            Live Stream
          </Button>
        </Link>
        <div className="flex items-center gap-1.5 border border-[var(--border)] bg-[var(--bg-elevated)] px-2 py-0.5 text-[10px] font-mono text-[var(--text)]">
          <span className="text-[var(--text-dim)]">$</span>
          <span>pip install ./sdk-python</span>
          <button
            onClick={handleCopy}
            className="text-[var(--text-dim)] hover:text-[var(--text)] ml-0.5 cursor-pointer"
            aria-label="Copy install command"
          >
            <Icon name={copied ? 'Check' : 'Copy'} size={11} />
          </button>
        </div>
      </div>

      {/* 4 Clean Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 pt-0.5">
        <Card compact className="p-2 flex flex-col gap-0.5 bg-[var(--bg-elevated)]">
          <div className="flex items-center justify-between text-[8.5px] uppercase tracking-wider text-[var(--text-dim)] font-medium">
            <span>Ingestion</span>
            <Icon name="Radio" size={11} className="text-[var(--accent)]" />
          </div>
          <span className="text-[12.5px] font-semibold text-[var(--text)] font-mono">:4000 (ws)</span>
        </Card>

        <Card compact className="p-2 flex flex-col gap-0.5 bg-[var(--bg-elevated)]">
          <div className="flex items-center justify-between text-[8.5px] uppercase tracking-wider text-[var(--text-dim)] font-medium">
            <span>Web & API</span>
            <Icon name="LayoutDashboard" size={11} className="text-[var(--accent)]" />
          </div>
          <span className="text-[12.5px] font-semibold text-[var(--text)] font-mono">:3000 (http)</span>
        </Card>

        <Card compact className="p-2 flex flex-col gap-0.5 bg-[var(--bg-elevated)]">
          <div className="flex items-center justify-between text-[8.5px] uppercase tracking-wider text-[var(--text-dim)] font-medium">
            <span>Storage Engine</span>
            <Icon name="HardDrive" size={11} className="text-[var(--accent)]" />
          </div>
          <span className="text-[12.5px] font-semibold text-[var(--text)] font-mono">Rotated CSV</span>
        </Card>

        <Card compact className="p-2 flex flex-col gap-0.5 bg-[var(--bg-elevated)]">
          <div className="flex items-center justify-between text-[8.5px] uppercase tracking-wider text-[var(--text-dim)] font-medium">
            <span>Buffer Limit</span>
            <Icon name="Cpu" size={11} className="text-[var(--accent)]" />
          </div>
          <span className="text-[12.5px] font-semibold text-[var(--text)] font-mono">500 rows / 2s</span>
        </Card>
      </div>
    </div>
  );
};

export default Hero;
