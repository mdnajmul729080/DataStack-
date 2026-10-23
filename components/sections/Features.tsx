import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';

export const Features: React.FC = () => {
  const items = [
    {
      icon: 'Zap',
      title: 'Decoupled Runtime Split',
      desc: 'Port 4000 WebSocket intake; Port 3000 Web & export.',
    },
    {
      icon: 'HardDrive',
      title: 'CSV File Persistence',
      desc: 'Streams directly to rotated CSV files on disk (Zero DB inserts).',
    },
    {
      icon: 'ShieldCheck',
      title: 'JWT SDK Authentication',
      desc: 'Signed tokens verify client IDs and rate limits on handshake.',
    },
    {
      icon: 'Cpu',
      title: 'In-Memory Buffer',
      desc: 'Aggregates 500 records or 2000ms intervals before async disk flush.',
    },
    {
      icon: 'CheckCheck',
      title: 'Idempotency Dedup',
      desc: 'Rejects duplicate clientId + eventId in 5-minute sliding TTL window.',
    },
    {
      icon: 'FileCode2',
      title: 'Python Client SDK',
      desc: 'datastack-sdk package with auto-reconnection and batch streaming.',
    },
  ];

  return (
    <div className="flex flex-col gap-1.5 py-1">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-1">
        <h2 className="text-[11px] font-semibold text-[var(--text)] uppercase tracking-wider">
          Platform Architecture
        </h2>
        <span className="text-[9px] text-[var(--text-dim)] font-mono">6 SUBSYSTEMS</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5">
        {items.map((item, idx) => (
          <Card key={idx} compact className="flex flex-col gap-0.5 p-2">
            <CardHeader className="p-0 pb-0.5 mb-0 border-b-0 flex items-center gap-1.5">
              <div className="p-0.5 bg-[var(--bg-main)] text-[var(--accent)] border border-[var(--border-strong)] shrink-0">
                <Icon name={item.icon} size={11} />
              </div>
              <CardTitle className="text-[11px]">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-[10px] text-[var(--text-muted)] leading-tight">
              {item.desc}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Features;
