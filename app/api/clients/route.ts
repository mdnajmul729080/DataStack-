import { NextRequest, NextResponse } from 'next/server';
import { SDKManager } from '@/core/sdk/sdkManager';

export async function GET() {
  try {
    const clients = SDKManager.listClients();
    return NextResponse.json({ clients, count: clients.length });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to list clients';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clientId, name, rateLimit } = body;

    if (!clientId || !name) {
      return NextResponse.json(
        { error: 'clientId and name are required' },
        { status: 400 }
      );
    }

    const existing = SDKManager.getClient(clientId);
    if (existing) {
      return NextResponse.json(
        { error: `Client '${clientId}' already exists` },
        { status: 409 }
      );
    }

    const newClient = SDKManager.registerClient({
      clientId,
      name,
      rateLimit: rateLimit ? Number(rateLimit) : 100,
    });

    return NextResponse.json({ client: newClient }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Client creation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
