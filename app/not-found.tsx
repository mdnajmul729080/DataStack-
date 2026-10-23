import React from 'react';
import Link from 'next/link';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-3">
        <h1 className="text-[28px] font-semibold text-[var(--text)] font-mono">404</h1>
        <p className="text-[13px] text-[var(--text-muted)] max-w-[400px]">
          The requested page or route does not exist on DataStack.
        </p>
        <div className="flex items-center gap-2 pt-2">
          <Link href="/">
            <Button variant="secondary" size="sm">
              Return Home
            </Button>
          </Link>
          <Link href="/vcon/dashboard">
            <Button variant="primary" size="sm">
              Admin Console
            </Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
