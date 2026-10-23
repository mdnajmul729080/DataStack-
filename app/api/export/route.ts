import { NextRequest, NextResponse } from 'next/server';
import { CSVStorageManager } from '@/core/Storage/csvStorage';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const clientId = searchParams.get('clientId');
    const filename = searchParams.get('filename');

    // Single specific file export
    if (clientId && filename) {
      const content = CSVStorageManager.getFileContent(clientId, filename);
      if (!content) {
        return NextResponse.json({ error: 'CSV file not found' }, { status: 404 });
      }

      return new NextResponse(content, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      });
    }

    // Stream aggregate or list files
    const allFiles = CSVStorageManager.listAllFiles();
    const filtered = clientId && clientId !== 'all'
      ? allFiles.filter((f) => f.clientId === clientId)
      : allFiles;

    if (filtered.length === 0) {
      const emptyCsv = 'clientId,eventId,timestamp,payload\n';
      return new NextResponse(emptyCsv, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="datastack_export_${Date.now()}.csv"`,
        },
      });
    }

    // Combine matching files with a single header
    let combined = 'clientId,eventId,timestamp,payload\n';
    for (const f of filtered) {
      try {
        const raw = fs.readFileSync(f.filePath, 'utf8');
        const lines = raw.split('\n');
        // skip header on subsequent lines
        const dataLines = lines.slice(1).filter((l) => l.trim().length > 0);
        if (dataLines.length > 0) {
          combined += dataLines.join('\n') + '\n';
        }
      } catch {
        // continue
      }
    }

    const exportFileName = clientId && clientId !== 'all'
      ? `${clientId}_export_${new Date().toISOString().split('T')[0]}.csv`
      : `datastack_universal_export_${new Date().toISOString().split('T')[0]}.csv`;

    return new NextResponse(combined, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${exportFileName}"`,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Export failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
