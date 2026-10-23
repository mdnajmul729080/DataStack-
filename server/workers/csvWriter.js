const fs = require('fs');
const path = require('path');
const { Parser } = require('json2csv');

/**
 * Background CSV Writer Worker
 * Flushes batches of real-time events to partitioned CSV files.
 * Path convention: /storage/data/{clientId}/{YYYY-MM-DD}.csv
 */
class CsvWriterWorker {
  constructor(baseDir = path.resolve(__dirname, '../../storage/data'), maxFileSize = 100 * 1024 * 1024) {
    this.baseDir = baseDir;
    this.maxFileSize = maxFileSize;
    this.ensureBaseDir();
  }

  ensureBaseDir() {
    if (!fs.existsSync(this.baseDir)) {
      fs.mkdirSync(this.baseDir, { recursive: true });
    }
  }

  getTargetFilePath(clientId, dateStr) {
    const safeClientId = clientId.replace(/[^a-zA-Z0-9_-]/g, '_');
    const clientDir = path.join(this.baseDir, safeClientId);
    if (!fs.existsSync(clientDir)) {
      fs.mkdirSync(clientDir, { recursive: true });
    }

    const date = dateStr || new Date().toISOString().split('T')[0];
    let baseFileName = `${date}.csv`;
    let targetPath = path.join(clientDir, baseFileName);

    let partIndex = 1;
    while (fs.existsSync(targetPath)) {
      try {
        const stats = fs.statSync(targetPath);
        if (stats.size >= this.maxFileSize) {
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

  async writeBatch(events) {
    if (!events || events.length === 0) return { written: 0, files: [] };

    const grouped = new Map();
    for (const evt of events) {
      const date = (evt.timestamp || new Date().toISOString()).split('T')[0];
      const key = `${evt.clientId}:::${date}`;
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key).push(evt);
    }

    const files = [];
    const fields = ['clientId', 'eventId', 'timestamp', 'payload'];

    for (const [key, batch] of grouped.entries()) {
      const [clientId, date] = key.split(':::');
      const targetPath = this.getTargetFilePath(clientId, date);
      const fileExists = fs.existsSync(targetPath);

      const cleanBatch = batch.map((item) => ({
        clientId: item.clientId,
        eventId: item.eventId,
        timestamp: item.timestamp,
        payload: typeof item.payload === 'string' ? item.payload : JSON.stringify(item.payload),
      }));

      const parser = new Parser({ fields, header: !fileExists, eol: '\n' });
      const csv = parser.parse(cleanBatch);

      if (fileExists) {
        fs.appendFileSync(targetPath, '\n' + csv, 'utf8');
      } else {
        fs.writeFileSync(targetPath, csv, 'utf8');
      }

      files.push(targetPath);
    }

    return { written: events.length, files };
  }
}

module.exports = { CsvWriterWorker };
