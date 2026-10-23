import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="shrink-0 h-[26px] bg-[var(--bg-activity)] border-t border-[var(--border)] px-3 sm:px-4 flex items-center justify-between text-[10px] text-[var(--text-dim)] select-none">
      <div className="flex items-center gap-1.5 truncate min-w-0 pr-2">
        <span className="font-semibold text-[var(--text-muted)] tracking-tight">DataStack</span>
        <span className="text-[var(--border-strong)]">/</span>
        <span className="font-mono text-[9px] truncate">
          storage/data/&#123;clientId&#125;/&#123;YYYY-MM-DD&#125;.csv
        </span>
      </div>
      <div className="flex items-center gap-2 font-mono text-[9.5px] shrink-0 ml-auto">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-[var(--success)] inline-block" />
          <span className="text-[var(--text-muted)]">:4000</span>
        </span>
        <span className="text-[var(--border-strong)]">•</span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-[var(--accent)] inline-block" />
          <span className="text-[var(--text-muted)]">:3000</span>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
