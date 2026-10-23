import { Server as SocketIOServer, Socket } from 'socket.io';
import { AuthService } from '../auth/jwt';
import { SecurityEngine } from '../Security/security';
import { DataBufferEngine } from '../data/buffer';
import { SDKManager } from '../sdk/sdkManager';
import { DataEvent } from '../Storage/csvStorage';

export interface SyncPayload {
  eventId?: string;
  timestamp?: string;
  data: unknown;
}

export class ConnectorEngine {
  private static io: SocketIOServer | null = null;
  private static activeConnections: Map<string, { socketId: string; clientId: string; connectedAt: string }> = new Map();

  public static initialize(io: SocketIOServer) {
    this.io = io;

    // Authentication middleware
    io.use((socket: Socket, next) => {
      const authHeader =
        socket.handshake.auth?.token ||
        socket.handshake.headers?.authorization ||
        (socket.handshake.query?.token as string);

      if (!authHeader) {
        return next(new Error('AUTH_REQUIRED: Missing JWT token in handshake'));
      }

      const { valid, payload, error } = AuthService.verifyClientToken(authHeader);
      if (!valid || !payload) {
        return next(new Error(`AUTH_FAILED: ${error || 'Invalid JWT token'}`));
      }

      // Check if client is registered and active
      const registered = SDKManager.getClient(payload.clientId);
      if (registered && registered.status === 'revoked') {
        return next(new Error('CLIENT_REVOKED: This SDK credentials have been revoked by admin'));
      }

      // Attach client information to socket data
      socket.data.clientId = payload.clientId;
      socket.data.rateLimit = registered?.rateLimit || payload.rateLimit || 100;
      next();
    });

    // Connection handler
    io.on('connection', (socket: Socket) => {
      const clientId = socket.data.clientId as string;
      const rateLimit = socket.data.rateLimit as number;

      this.activeConnections.set(socket.id, {
        socketId: socket.id,
        clientId,
        connectedAt: new Date().toISOString(),
      });

      // Join room for this client
      socket.join(`client:${clientId}`);

      // Single Event Sync: "sync_data"
      socket.on('sync_data', (payload: SyncPayload, callback?: (res: { success: boolean; eventId?: string; error?: string }) => void) => {
        try {
          const eventId = payload.eventId || `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
          const timestamp = payload.timestamp || new Date().toISOString();

          // Validate security (idempotency, rate limit, payload size)
          const val = SecurityEngine.validateEvent(clientId, eventId, payload.data, rateLimit);
          if (!val.allowed) {
            if (val.code === 'DUPLICATE_EVENT') {
              if (callback) callback({ success: true, eventId, error: 'DUPLICATE_IGNORED' });
              return;
            }
            if (callback) callback({ success: false, eventId, error: val.reason });
            return;
          }

          const event: DataEvent = {
            clientId,
            eventId,
            timestamp,
            payload: typeof payload.data === 'string' ? payload.data : JSON.stringify(payload.data),
          };

          DataBufferEngine.push(event);
          SDKManager.incrementEventCount(clientId, 1);

          if (callback) {
            callback({ success: true, eventId });
          }
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'Unknown sync error';
          if (callback) callback({ success: false, error: msg });
        }
      });

      // Batch Event Sync: "batch_sync"
      socket.on('batch_sync', (batch: SyncPayload[], callback?: (res: { success: boolean; processed: number; rejected: number; errors?: string[] }) => void) => {
        try {
          if (!Array.isArray(batch)) {
            if (callback) callback({ success: false, processed: 0, rejected: 0, errors: ['Expected array of events'] });
            return;
          }

          let processed = 0;
          let rejected = 0;
          const errors: string[] = [];

          for (const item of batch) {
            const eventId = item.eventId || `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
            const timestamp = item.timestamp || new Date().toISOString();

            const val = SecurityEngine.validateEvent(clientId, eventId, item.data, rateLimit);
            if (!val.allowed) {
              rejected += 1;
              if (val.code !== 'DUPLICATE_EVENT') {
                errors.push(`${eventId}: ${val.reason}`);
              }
              continue;
            }

            const event: DataEvent = {
              clientId,
              eventId,
              timestamp,
              payload: typeof item.data === 'string' ? item.data : JSON.stringify(item.data),
            };

            DataBufferEngine.push(event);
            processed += 1;
          }

          SDKManager.incrementEventCount(clientId, processed);

          if (callback) {
            callback({ success: true, processed, rejected, errors: errors.length > 0 ? errors.slice(0, 5) : undefined });
          }
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'Batch error';
          if (callback) callback({ success: false, processed: 0, rejected: batch?.length || 0, errors: [msg] });
        }
      });

      // Disconnect
      socket.on('disconnect', () => {
        this.activeConnections.delete(socket.id);
      });
    });
  }

  public static getActiveConnections() {
    return Array.from(this.activeConnections.values());
  }

  public static getActiveConnectionsCount(): number {
    return this.activeConnections.size;
  }
}

export default ConnectorEngine;
