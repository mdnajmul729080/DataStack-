import fs from 'fs';
import path from 'path';
import { Parser } from 'json2csv';

export interface DataEvent {
  clientId: string;
  eventId: string;
  timestamp: string; // ISO 8601
  payload: string; // JSON stringified
}

export interface StorageFileMeta {
  clientId: string;
  date: string;
  filename: string;
  filePath: string;
  sizeBytes: number;
  linesCount: number;
  modifiedAt: Date;
}

export class CSVStorageManager {
  // Base storage directory: /storage/data
  public static baseStorageDir = path.resolve(process.cwd(), 'storage', 'data');
  public static maxFileSizeBytes = 100 * 1024 * 1024; // 100MB rotation limit

  /**
   * Ensures client directory exists
   */
  public static ensureClientDir(clientId: string): string {
    const safeClientId = clientId.replace(/[^a-zA-Z0-9_-]/g, '_');
    const clientDir = path.join(this.baseStorageDir, safeClientId);
    if (!fs.existsSync(clientDir)) {
      fs.mkdirSync(clientDir, { recursive: true });
    }
    return clientDir;
  }

  /**
   * Resolves target CSV file path with daily and 100MB rotation rules
   */
  public static getTargetFilePath(clientId: string, dateStr?: string): string {
    const clientDir = this.ensureClientDir(clientId);
    const date = dateStr || new Date().toISOString().split('T')[0];
    let baseFileName = `${date}.csv`;
    let targetPath = path.join(clientDir, baseFileName);

    // Check for 100MB rotation
    let partIndex = 1;
    while (fs.existsSync(targetPath)) {
      try {
        const stats = fs.statSync(targetPath);
        if (stats.size >= this.maxFileSizeBytes) {
          partIndex += 1;
          baseFileName = `${date}-part${partIndex}.csv`;
          targetPath = path.join(clientDir, baseFileName);
        } else {
          break;
        }
      } catch {
        break;
      }
    }

    return targetPath;
  }

  /**
   * Batch append events into target CSV file.
   * If file doesn't exist, writes header: clientId,eventId,timestamp,payload
   */
  public static async appendBatch(events: DataEvent[]): Promise<{ written: number; filesUpdated: string[] }> {
    if (!events || events.length === 0) {
      return { written: 0, filesUpdated: [] };
    }

    // Group events by client + date
    const grouped = new Map<string, DataEvent[]>();
    for (const evt of events) {
      const date = (evt.timestamp || new Date().toISOString()).split('T')[0];
      const key = `${evt.clientId}:::${date}`;
      if (!grouped.has(key)) {
        grouped.set(key, []);
      }
      grouped.get(key)!.push(evt);
    }

    const filesUpdated: string[] = [];
    const fields = ['clientId', 'eventId', 'timestamp', 'payload'];

    for (const [key, batch] of grouped.entries()) {
      const [clientId, date] = key.split(':::');
      const targetPath = this.getTargetFilePath(clientId, date);
      const fileExists = fs.existsSync(targetPath);

      // Format payload as JSON string if not already
      const cleanBatch = batch.map((item) => ({
        clientId: item.clientId,
        eventId: item.eventId,
        timestamp: item.timestamp,
        payload: typeof item.payload === 'string' ? item.payload : JSON.stringify(item.payload),
      }));

      const parser = new Parser({ fields, header: !fileExists, eol: '\n' });
      const csvData = parser.parse(cleanBatch);

      if (fileExists) {
        fs.appendFileSync(targetPath, '\n' + csvData, 'utf8');
      } else {
        fs.writeFileSync(targetPath, csvData, 'utf8');
      }

      filesUpdated.push(targetPath);
    }

    return { written: events.length, filesUpdated };
  }

  /**
   * List all stored CSV files with sizes and dates
   */
  public static listAllFiles(): StorageFileMeta[] {
    const results: StorageFileMeta[] = [];
    if (!fs.existsSync(this.baseStorageDir)) {
      return results;
    }

    try {
      const clientDirs = fs.readdirSync(this.baseStorageDir);
      for (const clientDir of clientDirs) {
        const fullClientPath = path.join(this.baseStorageDir, clientDir);
        if (!fs.statSync(fullClientPath).isDirectory()) continue;

        const files = fs.readdirSync(fullClientPath);
        for (const file of files) {
          if (!file.endsWith('.csv')) continue;
          const fullFilePath = path.join(fullClientPath, file);
          const stats = fs.statSync(fullFilePath);

          // Count lines approximately (or sample)
          let linesCount = 0;
          try {
            const content = fs.readFileSync(fullFilePath, 'utf8');
            linesCount = content.split('\n').filter((l) => l.trim().length > 0).length - 1; // subtract header
            if (linesCount < 0) linesCount = 0;
          } catch {
            linesCount = 0;
          }

          const datePart = file.replace('.csv', '').split('-part')[0];

          results.push({
            clientId: clientDir,
            date: datePart,
            filename: file,
            filePath: fullFilePath,
            sizeBytes: stats.size,
            linesCount,
            modifiedAt: stats.mtime,
          });
        }
      }
    } catch {
      // Return whatever collected
    }

    return results.sort((a, b) => b.modifiedAt.getTime() - a.modifiedAt.getTime());
  }

  /**
   * Get aggregate storage statistics
   */
  public static getStorageStats() {
    const files = this.listAllFiles();
    const totalBytes = files.reduce((acc, f) => acc + f.sizeBytes, 0);
    const totalRows = files.reduce((acc, f) => acc + f.linesCount, 0);
    const uniqueClients = new Set(files.map((f) => f.clientId)).size;

    return {
      totalFiles: files.length,
      totalBytes,
      totalMB: (totalBytes / (1024 * 1024)).toFixed(2),
      totalRows,
      uniqueClients,
      storageDirectory: this.baseStorageDir,
      rotationRule: 'Per-day OR per-100MB rotation',
    };
  }

  /**
   * Reads file content for export / download
   */
  public static getFileContent(clientId: string, filename: string): string | null {
    const fullPath = path.join(this.baseStorageDir, clientId, filename);
    if (fs.existsSync(fullPath)) {
      return fs.readFileSync(fullPath, 'utf8');
    }
    return null;
  }
}

export default CSVStorageManager;
