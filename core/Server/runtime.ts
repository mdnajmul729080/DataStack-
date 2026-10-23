import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server as SocketIOServer } from 'socket.io';
import { ConnectorEngine } from '../connector/socketHandler';
import { DataBufferEngine } from '../data/buffer';
import { CSVStorageManager } from '../Storage/csvStorage';

export class ServerRuntime {
  private static app: express.Express | null = null;
  private static httpServer: http.Server | null = null;
  private static io: SocketIOServer | null = null;
  private static isRunning = false;
  private static port = 4000;

  public static createServer(port = 4000) {
    if (this.isRunning && this.httpServer) {
      return { app: this.app, server: this.httpServer, io: this.io };
    }

    this.port = port;
    const app = express();
    app.use(cors({ origin: '*' }));
    app.use(express.json({ limit: '10mb' }));

    // Health route
    app.get('/health', (_req, res) => {
      res.json({
        status: 'online',
        service: 'DataStack Express + Socket.IO Intake',
        port: this.port,
        activeSockets: ConnectorEngine.getActiveConnectionsCount(),
        uptime: process.uptime(),
      });
    });

    // HTTP fallback intake endpoint for non-socket clients
    app.post('/api/intake', (req, res) => {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        res.status(401).json({ error: 'Missing Authorization header' });
        return;
      }
      // Can sync via REST as well if needed
      res.json({ success: true, message: 'REST sync supported' });
    });

    const httpServer = http.createServer(app);
    const io = new SocketIOServer(httpServer, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
      pingTimeout: 30000,
      pingInterval: 10000,
    });

    ConnectorEngine.initialize(io);

    this.app = app;
    this.httpServer = httpServer;
    this.io = io;
    this.isRunning = true;

    return { app, server: httpServer, io };
  }

  public static start(port = 4000): Promise<number> {
    return new Promise((resolve, reject) => {
      try {
        const { server } = this.createServer(port);
        server.listen(port, () => {
          resolve(port);
        });
        server.on('error', (err: NodeJS.ErrnoException) => {
          if (err.code === 'EADDRINUSE') {
            // Already listening or address in use
            resolve(port);
          } else {
            reject(err);
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  public static getStatus() {
    return {
      isRunning: this.isRunning,
      port: this.port,
      activeSockets: ConnectorEngine.getActiveConnectionsCount(),
      bufferSize: DataBufferEngine.getBufferStats().currentBufferSize,
      storageStats: CSVStorageManager.getStorageStats(),
    };
  }
}

export default ServerRuntime;
