import { AuthService } from '../auth/jwt';

export interface ClientSDK {
  clientId: string;
  name: string;
  secret: string;
  token: string;
  rateLimit: number; // max events per sec
  status: 'active' | 'revoked';
  totalEvents: number;
  lastActive?: string;
  createdAt: string;
}

export class SDKManager {
  private static clients: Map<string, ClientSDK> = new Map();

  // Initialize with production starter clients
  static {
    const seedClients = [
      {
        clientId: 'py_telemetry_agent_01',
        name: 'Python Telemetry Agent (US-East)',
        rateLimit: 150,
      },
      {
        clientId: 'py_scraper_prod_02',
        name: 'Python Web Scraper Engine',
        rateLimit: 200,
      },
      {
        clientId: 'iot_fleet_east_03',
        name: 'IoT Sensor Gateway Node',
        rateLimit: 50,
      },
    ];

    for (const c of seedClients) {
      const secret = `sec_${c.clientId}_${Math.random().toString(36).substring(2, 10)}`;
      const token = AuthService.generateClientToken({
        clientId: c.clientId,
        name: c.name,
        rateLimit: c.rateLimit,
      });

      SDKManager.clients.set(c.clientId, {
        clientId: c.clientId,
        name: c.name,
        secret,
        token,
        rateLimit: c.rateLimit,
        status: 'active',
        totalEvents: 4280,
        lastActive: new Date().toISOString(),
        createdAt: '2026-10-20T10:00:00.000Z',
      });
    }
  }

  public static listClients(): ClientSDK[] {
    return Array.from(this.clients.values());
  }

  public static getClient(clientId: string): ClientSDK | undefined {
    return this.clients.get(clientId);
  }

  public static registerClient(data: { clientId: string; name: string; rateLimit?: number }): ClientSDK {
    const safeClientId = data.clientId.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_');
    const secret = `sec_${safeClientId}_${Math.random().toString(36).substring(2, 10)}`;
    const rateLimit = data.rateLimit || 100;

    const token = AuthService.generateClientToken({
      clientId: safeClientId,
      name: data.name,
      rateLimit,
    });

    const newClient: ClientSDK = {
      clientId: safeClientId,
      name: data.name.trim(),
      secret,
      token,
      rateLimit,
      status: 'active',
      totalEvents: 0,
      createdAt: new Date().toISOString(),
    };

    this.clients.set(safeClientId, newClient);
    return newClient;
  }

  public static regenerateToken(clientId: string): ClientSDK | null {
    const client = this.clients.get(clientId);
    if (!client) return null;

    client.secret = `sec_${clientId}_${Math.random().toString(36).substring(2, 10)}`;
    client.token = AuthService.generateClientToken({
      clientId: client.clientId,
      name: client.name,
      rateLimit: client.rateLimit,
    });

    this.clients.set(clientId, client);
    return client;
  }

  public static updateClient(clientId: string, updates: Partial<Pick<ClientSDK, 'name' | 'rateLimit' | 'status'>>): ClientSDK | null {
    const client = this.clients.get(clientId);
    if (!client) return null;

    if (updates.name !== undefined) client.name = updates.name;
    if (updates.rateLimit !== undefined) client.rateLimit = updates.rateLimit;
    if (updates.status !== undefined) client.status = updates.status;

    this.clients.set(clientId, client);
    return client;
  }

  public static deleteClient(clientId: string): boolean {
    return this.clients.delete(clientId);
  }

  public static incrementEventCount(clientId: string, count = 1): void {
    const client = this.clients.get(clientId);
    if (client) {
      client.totalEvents += count;
      client.lastActive = new Date().toISOString();
      this.clients.set(clientId, client);
    }
  }
}

export default SDKManager;
