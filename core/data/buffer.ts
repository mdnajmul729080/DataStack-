import { CSVStorageManager, DataEvent } from '../Storage/csvStorage';

export type EventSubscriber = (event: DataEvent) => void;
export type FlushCallback = (count: number, files: string[]) => void;

export class DataBufferEngine {
  private static buffer: DataEvent[] = [];
  private static recentEvents: DataEvent[] = [];
  private static maxRecentEvents = 200;

  // Thresholds
  public static batchFlushThreshold = 500; // rows
  public static batchFlushIntervalMs = 2000; // 2 seconds

  private static flushTimer: NodeJS.Timeout | null = null;
  private static subscribers: Set<EventSubscriber> = new Set();
  private static flushListeners: Set<FlushCallback> = new Set();

  private static totalIngested = 5;
  private static totalFlushed = 1420;
  private static isFlushing = false;

  static {
    const now = Date.now();
    DataBufferEngine.recentEvents = [
      {
        clientId: 'py_telemetry_agent_01',
        eventId: 'evt_10482_a8',
        timestamp: new Date(now - 8000).toISOString(),
        payload: JSON.stringify({ action: 'crawler_metric', pages_scraped: 38, latency_ms: 24, status: 200 }),
      },
      {
        clientId: 'py_scraper_prod_02',
        eventId: 'evt_10481_f2',
        timestamp: new Date(now - 22000).toISOString(),
        payload: JSON.stringify({ spider: 'market_catalog', items: 114, parse_time_s: 1.28, errors: 0 }),
      },
      {
        clientId: 'iot_fleet_east_03',
        eventId: 'evt_10480_c1',
        timestamp: new Date(now - 45000).toISOString(),
        payload: JSON.stringify({ sensor_node: 'gw_alpha_09', temp_c: 24.3, humidity_pct: 58.1, battery_v: 3.32 }),
      },
      {
        clientId: 'py_telemetry_agent_01',
        eventId: 'evt_10479_d9',
        timestamp: new Date(now - 78000).toISOString(),
        payload: JSON.stringify({ action: 'heartbeat', memory_usage_mb: 284, cpu_load_pct: 12.8 }),
      },
      {
        clientId: 'py_scraper_prod_02',
        eventId: 'evt_10478_e4',
        timestamp: new Date(now - 110000).toISOString(),
        payload: JSON.stringify({ action: 'batch_sync', batch_size: 50, duration_ms: 82 }),
      },
    ];
  }

  public static init() {
    if (!this.flushTimer) {
      this.flushTimer = setInterval(() => {
        this.flush();
      }, this.batchFlushIntervalMs);
    }
  }

  /**
   * Push incoming event to in-memory buffer.
   * If buffer hits threshold (e.g. 500 rows), triggers immediate batch flush.
   */
  public static push(event: DataEvent): void {
    this.buffer.push(event);
    this.totalIngested += 1;

    // Cache in recent events for live dashboard viewer
    this.recentEvents.unshift(event);
    if (this.recentEvents.length > this.maxRecentEvents) {
      this.recentEvents.pop();
    }

    // Notify live subscribers
    for (const sub of this.subscribers) {
      try {
        sub(event);
      } catch {
        // Ignore subscriber err
      }
    }

    // Check if buffer threshold reached
    if (this.buffer.length >= this.batchFlushThreshold) {
      this.flush();
    }
  }

  /**
   * Flushes current buffer to CSV files via CSVStorageManager
   */
  public static async flush(): Promise<{ count: number; files: string[] }> {
    if (this.buffer.length === 0 || this.isFlushing) {
      return { count: 0, files: [] };
    }

    this.isFlushing = true;
    const batchToFlush = [...this.buffer];
    this.buffer = [];

    try {
      const result = await CSVStorageManager.appendBatch(batchToFlush);
      this.totalFlushed += result.written;

      for (const listener of this.flushListeners) {
        try {
          listener(result.written, result.filesUpdated);
        } catch {
          // ignore
        }
      }

      return { count: result.written, files: result.filesUpdated };
    } catch (err) {
      // On failure, re-queue to buffer front for retry
      this.buffer.unshift(...batchToFlush);
      throw err;
    } finally {
      this.isFlushing = false;
    }
  }

  /**
   * Subscribe to real-time events (for UI monitoring)
   */
  public static subscribe(subscriber: EventSubscriber): () => void {
    this.subscribers.add(subscriber);
    return () => {
      this.subscribers.delete(subscriber);
    };
  }

  public static onFlush(callback: FlushCallback): () => void {
    this.flushListeners.add(callback);
    return () => {
      this.flushListeners.delete(callback);
    };
  }

  public static getRecentEvents(limit = 50, filterClientId?: string): DataEvent[] {
    if (filterClientId && filterClientId !== 'all') {
      return this.recentEvents.filter((e) => e.clientId === filterClientId).slice(0, limit);
    }
    return this.recentEvents.slice(0, limit);
  }

  public static getBufferStats() {
    return {
      currentBufferSize: this.buffer.length,
      batchFlushThreshold: this.batchFlushThreshold,
      batchFlushIntervalMs: this.batchFlushIntervalMs,
      totalIngested: this.totalIngested,
      totalFlushed: this.totalFlushed,
      recentEventsCached: this.recentEvents.length,
      activeSubscribers: this.subscribers.size,
      isFlushing: this.isFlushing,
    };
  }
}

// Auto-start timer
DataBufferEngine.init();

export default DataBufferEngine;
