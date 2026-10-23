import React from 'react';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';

export const Architecture: React.FC = () => {
  return (
    <div className="flex flex-col gap-1.5 py-1">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-1">
        <h2 className="text-[11px] font-semibold text-[var(--text)] uppercase tracking-wider">
          Pipeline Flow
        </h2>
        <span className="text-[9px] text-[var(--text-dim)] font-mono">:4000 ➔ :3000</span>
      </div>

      <Card compact className="p-2.5 flex flex-col gap-2 font-mono text-[10px] bg-[var(--bg-elevated)]">
        {/* Desktop Flow: 5 items */}
        <div className="hidden md:grid md:grid-cols-5 gap-1.5 items-center text-center">
          <div className="p-1.5 border border-[var(--border)] bg-[var(--bg-main)] flex flex-col items-center gap-0.5">
            <Icon name="FileCode" size={12} className="text-[var(--accent)]" />
            <span className="font-semibold text-[var(--text)]">Python SDK</span>
          </div>

          <div className="text-[var(--text-dim)] flex items-center justify-center gap-1">
            <span className="text-[9px] px-1.5 py-0.2 border border-[var(--border)] bg-[var(--bg-main)] flex items-center gap-0.5">
              <span>JWT</span>
              <Icon name="ArrowRight" size={9} />
            </span>
          </div>

          <div className="p-1.5 border border-[var(--border-strong)] bg-[var(--bg-main)] flex flex-col items-center gap-0.5">
            <Icon name="Radio" size={12} className="text-[var(--accent)]" />
            <span className="font-semibold text-[var(--text)]">Express Ingest (:4000)</span>
          </div>

          <div className="text-[var(--text-dim)] flex items-center justify-center gap-1">
            <span className="text-[9px] px-1.5 py-0.2 border border-[var(--border)] bg-[var(--bg-main)] flex items-center gap-0.5">
              <span>Buffer</span>
              <Icon name="ArrowRight" size={9} />
            </span>
          </div>

          <div className="p-1.5 border border-[var(--border)] bg-[var(--bg-main)] flex flex-col items-center gap-0.5">
            <Icon name="HardDrive" size={12} className="text-[var(--success)]" />
            <span className="font-semibold text-[var(--text)]">CSV Storage (Disk)</span>
          </div>
        </div>

        {/* Mobile Flow: Vertical */}
        <div className="flex md:hidden flex-col gap-1">
          <div className="p-1.5 border border-[var(--border)] bg-[var(--bg-main)] flex items-center justify-between">
            <span className="font-semibold text-[var(--text)]">1. Python SDK</span>
            <span className="text-[8.5px] text-[var(--text-dim)]">Client</span>
          </div>
          <div className="p-1.5 border border-[var(--border-strong)] bg-[var(--bg-main)] flex items-center justify-between">
            <span className="font-semibold text-[var(--text)]">2. Express (:4000)</span>
            <span className="text-[8.5px] text-[var(--accent)]">Ingest</span>
          </div>
          <div className="p-1.5 border border-[var(--border)] bg-[var(--bg-main)] flex items-center justify-between">
            <span className="font-semibold text-[var(--text)]">3. CSV Files</span>
            <span className="text-[8.5px] text-[var(--success)]">Rotated</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Architecture;
