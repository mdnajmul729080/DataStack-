import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Architecture } from '@/components/sections/Architecture';

export default function RootHomePage() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-4">
        <Hero />
        <Architecture />
        <Features />
      </div>
    </MainLayout>
  );
}
