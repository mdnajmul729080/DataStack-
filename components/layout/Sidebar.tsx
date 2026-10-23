'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen = false,
  onClose,
}) => {
  const pathname = usePathname();

  const navigation = [
    {
      group: 'Core Telemetry',
      items: [
        { name: 'Dashboard', href: '/vcon/dashboard', icon: 'LayoutDashboard' },
        { name: 'Live Data Sync', href: '/vcon/data', icon: 'Activity', badge: 'Live' },
        { name: 'CSV Exporter', href: '/vcon/export', icon: 'Download' },
      ],
    },
    {
      group: 'Management',
      items: [
        { name: 'Client SDKs', href: '/vcon/clients', icon: 'Key' },
        { name: 'CSV Storage & Disk', href: '/vcon/storage', icon: 'HardDrive' },
        { name: 'Engine Settings', href: '/vcon/settings', icon: 'Sliders' },
      ],
    },
    {
      group: 'Integration',
      items: [
        { name: 'Python SDK Guide', href: '/vcon/sdk', icon: 'FileCode2' },
        { name: 'Live Simulator', href: '/vcon/simulator', icon: 'Play' },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 md:hidden backdrop-blur-[1px]"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 md:static w-[210px] shrink-0 bg-[var(--bg-sidebar)] border-r border-[var(--border)] flex flex-col transition-transform duration-150 ease-in-out md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Top Header */}
        <div className="h-[38px] px-3 flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg-activity)] shrink-0">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-1.5 h-1.5 bg-[var(--accent)] shrink-0" />
            <span className="text-[10.5px] font-semibold text-[var(--text)] tracking-wider uppercase truncate">
              VCON ADMIN
            </span>
          </div>
          <button
            onClick={onClose}
            className="md:hidden text-[var(--text-dim)] hover:text-[var(--text)] p-1 cursor-pointer"
            aria-label="Close menu"
          >
            <Icon name="X" size={13} />
          </button>
        </div>

        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto p-1.5 flex flex-col gap-2">
          {navigation.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-0.5">
              <span className="text-[9px] font-semibold text-[var(--text-dim)] uppercase tracking-wider px-2 py-0.5">
                {section.group}
              </span>
              <div className="flex flex-col gap-0.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        'flex items-center justify-between px-2 py-1 text-[11px] transition-colors border',
                        isActive
                          ? 'bg-[var(--accent-soft)] text-[var(--accent-hover)] font-medium border-[var(--accent)]'
                          : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-hover)]'
                      )}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Icon
                          name={item.icon}
                          size={12}
                          className={isActive ? 'text-[var(--accent)]' : 'text-[var(--text-dim)]'}
                        />
                        <span className="truncate">{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[8px] px-1 py-0.2 bg-[var(--success-soft)] text-[var(--success)] font-mono border border-[var(--success)] shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="p-2 border-t border-[var(--border)] bg-[var(--bg-main)] text-[9.5px] text-[var(--text-dim)] font-mono flex flex-col gap-1 shrink-0">
          <div className="flex items-center justify-between">
            <span>Buffer Worker</span>
            <span className="text-[var(--success)] flex items-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 bg-[var(--success)] inline-block" />
              Active
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Storage Engine</span>
            <span className="text-[var(--text-muted)]">json2csv</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Auth Handshake</span>
            <span className="text-[var(--text-muted)]">JWT</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
