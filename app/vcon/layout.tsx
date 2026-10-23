'use client';

import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';

export default function VconLayout({ children }: { children: React.ReactNode }) {
  return <MainLayout showSidebar={true}>{children}</MainLayout>;
}
