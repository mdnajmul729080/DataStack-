import { NextRequest, NextResponse } from 'next/server';
import { CSVStorageManager } from '@/core/Storage/csvStorage';
import { DataBufferEngine } from '@/core/data/buffer';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const clientId = searchParams.get('clientId') || undefined;

    const stats = CSVStorageManager.getStorageStats();
    let files = CSVStorageManager.listAllFiles();

    if (clientId && clientId !== 'all') {
      files = files.filter((f) => f.clientId === clientId);
    }

    return NextResponse.json({ stats, files });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Storage stats failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(_req: NextRequest) {
  try {
    // Manual flush buffer to disk
    const res = await DataBufferEngine.flush();
    return NextResponse.json({
      success: true,
      flushedCount: res.count,
      filesUpdated: res.files,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Manual flush failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
