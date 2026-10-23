import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/components/ui/Toast';

export const metadata: Metadata = {
  title: 'DataStack - Realtime Data Collection Platform',
  description: 'Self-hosted universal realtime data collection engine with Socket.IO ingestion, Redis buffer, JWT client auth, CSV batch rotation, and /vcon/ admin panel.',
  manifest: '/manifest.json',
  openGraph: {
    title: 'DataStack - Realtime Data Collection Platform',
    description: 'Self-hosted universal realtime data collection engine with Socket.IO ingestion, Redis buffer, and CSV batch storage.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DataStack - Realtime Data Collection Platform',
    description: 'Self-hosted universal realtime data collection engine with Socket.IO ingestion.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body suppressHydrationWarning className="min-h-screen bg-[var(--bg-main)] text-[var(--text)] antialiased">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
