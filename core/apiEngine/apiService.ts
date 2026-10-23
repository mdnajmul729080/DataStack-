import { SDKManager } from '../sdk/sdkManager';
import { CSVStorageManager } from '../Storage/csvStorage';
import { DataBufferEngine } from '../data/buffer';
import { SettingsManager } from '../adminSettings/settingsManager';
import { SecurityEngine } from '../Security/security';

export class ApiEngine {
  /**
   * Retrieves overall telemetry and health metrics for the dashboard
   */
  public static async getDashboardMetrics() {
    const storageStats = CSVStorageManager.getStorageStats();
    const bufferStats = DataBufferEngine.getBufferStats();
    const clients = SDKManager.listClients();
    const activeClients = clients.filter((c) => c.status === 'active').length;
    let activeSockets = 0;

    try {
      const res = await fetch('http://localhost:4000/health', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        activeSockets = data.activeSockets ?? 0;
      }
    } catch {
      // Server may be starting
      activeSockets = 0;
    }

    const securityStats = SecurityEngine.getStats();

    return {
      activeSockets,
      totalClients: clients.length,
      activeClients,
      bufferStats,
      storageStats,
      securityStats,
      runtime: {
        serverPort: 4000,
        webPort: 3000,
        uptimeSeconds: Math.floor(process.uptime()),
        memoryUsageMb: (process.memoryUsage().rss / (1024 * 1024)).toFixed(1),
        nodeVersion: process.version,
      },
    };
  }

  /**
   * Filters and streams stored CSV data for export
   */
  public static getExportFiles(clientId?: string) {
    const allFiles = CSVStorageManager.listAllFiles();
    if (clientId && clientId !== 'all') {
      return allFiles.filter((f) => f.clientId === clientId);
    }
    return allFiles;
  }
}

export default ApiEngine;
