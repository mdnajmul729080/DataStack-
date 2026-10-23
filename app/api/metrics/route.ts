import { NextResponse } from 'next/server';
import { ApiEngine } from '@/core/apiEngine/apiService';

export async function GET() {
  try {
    const metrics = await ApiEngine.getDashboardMetrics();
    return NextResponse.json(metrics);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Metrics calculation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
