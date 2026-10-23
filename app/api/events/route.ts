import { NextRequest, NextResponse } from 'next/server';
import { DataBufferEngine } from '@/core/data/buffer';
import { SDKManager } from '@/core/sdk/sdkManager';
import { SecurityEngine } from '@/core/Security/security';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const clientId = searchParams.get('clientId') || undefined;
    const limit = Number(searchParams.get('limit')) || 50;

    const events = DataBufferEngine.getRecentEvents(limit, clientId);
    return NextResponse.json({ events, count: events.length });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Events retrieval failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const clientId = body.clientId || 'py_telemetry_agent_01';
    const eventId = body.eventId || `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const timestamp = body.timestamp || new Date().toISOString();
    const data = body.data || { sample: 'Realtime event via DataStack API', rand: Math.random() };

    // Validate security
    const val = SecurityEngine.validateEvent(clientId, eventId, data, 200);
    if (!val.allowed) {
      return NextResponse.json({ error: val.reason }, { status: 429 });
    }

    const event = {
      clientId,
      eventId,
      timestamp,
      payload: typeof data === 'string' ? data : JSON.stringify(data),
    };

    DataBufferEngine.push(event);
    SDKManager.incrementEventCount(clientId, 1);

    return NextResponse.json({ success: true, event });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Event simulation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
