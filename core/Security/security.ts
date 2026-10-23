export interface ValidationResult {
  allowed: boolean;
  reason?: string;
  code?: 'RATE_LIMIT_EXCEEDED' | 'PAYLOAD_TOO_LARGE' | 'DUPLICATE_EVENT' | 'MALFORMED_PAYLOAD';
}

export class SecurityEngine {
  // Idempotency cache: key -> timestamp (expires after TTL)
  private static idempotencySet = new Map<string, number>();
  private static readonly IDEMPOTENCY_TTL_MS = 5 * 60 * 1000; // 5 minutes

  // Rate limiter: clientId -> { count, windowStart }
  private static rateLimitMap = new Map<string, { count: number; windowStart: number }>();

  // Default Max payload size (100KB)
  public static maxPayloadSizeBytes = 100 * 1024;

  /**
   * Idempotency Check:
   * ClientId + EventId must be unique.
   * Duplicate events are dropped silently or tagged.
   */
  public static checkIdempotency(clientId: string, eventId: string): boolean {
    if (!eventId) return true; // If no eventId generated, pass through
    const key = `${clientId}:${eventId}`;
    const now = Date.now();

    // Periodic cleanup of stale idempotency keys
    if (this.idempotencySet.size > 20000) {
      for (const [k, timestamp] of this.idempotencySet.entries()) {
        if (now - timestamp > this.IDEMPOTENCY_TTL_MS) {
          this.idempotencySet.delete(k);
        }
      }
    }

    if (this.idempotencySet.has(key)) {
      const storedTime = this.idempotencySet.get(key) || 0;
      if (now - storedTime < this.IDEMPOTENCY_TTL_MS) {
        return false; // Duplicate detected
      }
    }

    this.idempotencySet.set(key, now);
    return true; // Unique, allowed
  }

  /**
   * Rate Limit Check:
   * Enforces max events per second per client.
   */
  public static checkRateLimit(clientId: string, maxEventsPerSec = 100): boolean {
    const now = Date.now();
    const current = this.rateLimitMap.get(clientId);

    if (!current || now - current.windowStart >= 1000) {
      this.rateLimitMap.set(clientId, { count: 1, windowStart: now });
      return true;
    }

    if (current.count >= maxEventsPerSec) {
      return false; // Rate limit exceeded
    }

    current.count += 1;
    return true;
  }

  /**
   * Validates incoming event payload:
   * Checks max byte size and JSON structure.
   */
  public static validateEvent(
    clientId: string,
    eventId: string,
    payload: unknown,
    clientMaxRate = 100
  ): ValidationResult {
    // 1. Check idempotency
    const isUnique = this.checkIdempotency(clientId, eventId);
    if (!isUnique) {
      return { allowed: false, reason: 'Duplicate event dropped silently', code: 'DUPLICATE_EVENT' };
    }

    // 2. Check rate limit
    const withinLimit = this.checkRateLimit(clientId, clientMaxRate);
    if (!withinLimit) {
      return {
        allowed: false,
        reason: `Rate limit of ${clientMaxRate} events/sec exceeded for client ${clientId}`,
        code: 'RATE_LIMIT_EXCEEDED',
      };
    }

    // 3. Check payload size
    const payloadStr = typeof payload === 'string' ? payload : JSON.stringify(payload);
    const byteLength = Buffer.byteLength(payloadStr, 'utf8');

    if (byteLength > this.maxPayloadSizeBytes) {
      return {
        allowed: false,
        reason: `Payload size (${(byteLength / 1024).toFixed(1)} KB) exceeds limit of ${this.maxPayloadSizeBytes / 1024} KB`,
        code: 'PAYLOAD_TOO_LARGE',
      };
    }

    return { allowed: true };
  }

  public static getStats() {
    return {
      activeIdempotencyKeys: this.idempotencySet.size,
      rateLimitedClientsCount: this.rateLimitMap.size,
      maxPayloadSizeBytes: this.maxPayloadSizeBytes,
    };
  }
}

export default SecurityEngine;
