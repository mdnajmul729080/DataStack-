'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';

interface NavbarProps {
  onToggleSidebar?: () => void;
  showSidebarToggle?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleSidebar,
  showSidebarToggle = false,
}) => {
  const pathname = usePathname();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('datastack-theme') as 'dark' | 'light' | null;
    const initial = saved || 'dark';
    setTheme(initial);
    if (initial === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('datastack-theme', nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  };

  const isVcon = pathname?.startsWith('/vcon');

  return (
    <header className="h-[38px] shrink-0 bg-[var(--bg-activity)] border-b border-[var(--border)] px-3 sm:px-4 flex items-center justify-between z-40 select-none">
      {/* Left: Mobile hamburger + Brand */}
      <div className="flex items-center gap-2">
        {showSidebarToggle && (
          <button
            onClick={onToggleSidebar}
            className="md:hidden w-[26px] h-[26px] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--border)] bg-[var(--bg-elevated)] cursor-pointer"
            aria-label="Toggle Navigation"
          >
            <Icon name="Menu" size={13} />
          </button>
        )}

        <Link href="/" className="flex items-center gap-1.5">
          <div className="w-[17px] h-[17px] bg-[var(--accent)] text-[var(--text-on-accent)] flex items-center justify-center text-[9.5px] font-bold">
            DS
          </div>
          <span className="text-[12px] font-semibold text-[var(--text)] tracking-tight">
            DataStack
          </span>
          <span className="hidden sm:inline text-[9px] text-[var(--text-dim)] font-mono border border-[var(--border)] px-1 py-0.2">
            v2.4
          </span>
        </Link>
      </div>

      {/* Middle: Links */}
      <nav className="hidden sm:flex items-center gap-1 text-[11px]">
        <Link
          href="/"
          className={`px-2.5 py-1 transition-colors border-b-2 ${
            pathname === '/'
              ? 'border-[var(--accent)] text-[var(--text)] font-medium'
              : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'
          }`}
        >
          Overview
        </Link>
        <Link
          href="/vcon/dashboard"
          className={`px-2.5 py-1 transition-colors border-b-2 flex items-center gap-1.5 ${
            isVcon
              ? 'border-[var(--accent)] text-[var(--text)] font-medium'
              : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'
          }`}
        >
          <span>Admin Console</span>
          <span className="w-1.5 h-1.5 bg-[var(--success)] shrink-0" />
        </Link>
        <Link
          href="/vcon/export"
          className={`px-2.5 py-1 transition-colors border-b-2 ${
            pathname === '/vcon/export'
              ? 'border-[var(--accent)] text-[var(--text)] font-medium'
              : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'
          }`}
        >
          CSV Exporter
        </Link>
      </nav>

      {/* Right: Port Badges + Theme Toggle + Console Action */}
      <div className="flex items-center gap-1.5">
        <div className="hidden lg:flex items-center gap-1.5 text-[9.5px] text-[var(--text-dim)] font-mono border border-[var(--border)] px-1.5 py-0.5 bg-[var(--bg-main)]">
          <span className="w-1.5 h-1.5 bg-[var(--success)] inline-block" />
          <span>:4000</span>
          <span className="text-[var(--border-strong)]">|</span>
          <span className="w-1.5 h-1.5 bg-[var(--accent)] inline-block" />
          <span>:3000</span>
        </div>

        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="w-[26px] h-[26px] flex items-center justify-center border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:text-[var(--text)] cursor-pointer"
        >
          <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} size={12} />
        </button>

        {!isVcon && (
          <Link href="/vcon/dashboard">
            <Button size="xs" variant="primary" icon="Terminal">
              /vcon/
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
