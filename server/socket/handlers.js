const jwt = require('jsonwebtoken');

function setupSocketHandlers(io, bufferQueue, worker, options = {}) {
  const jwtSecret = options.jwtSecret || process.env.DATASTACK_JWT_SECRET || 'datastack-universal-secret-key-2026';
  const idempotencyMap = new Map();
  const rateLimitMap = new Map();

  // Middleware: Handshake Auth
  io.use((socket, next) => {
    const authHeader =
      socket.handshake.auth?.token ||
      socket.handshake.headers?.authorization ||
      socket.handshake.query?.token;

    if (!authHeader) {
      return next(new Error('AUTH_REQUIRED: Handshake missing JWT'));
    }

    try {
      const cleanToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
      const decoded = jwt.verify(cleanToken, jwtSecret);
      socket.data.clientId = decoded.clientId;
      socket.data.rateLimit = decoded.rateLimit || 100;
      next();
    } catch (err) {
      next(new Error(`AUTH_INVALID: ${err.message}`));
    }
  });

  io.on('connection', (socket) => {
    const clientId = socket.data.clientId;
    const rateLimit = socket.data.rateLimit;
    socket.join(`client:${clientId}`);

    // Single event
    socket.on('sync_data', (payload, callback) => {
      try {
        const eventId = payload.eventId || `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        const timestamp = payload.timestamp || new Date().toISOString();

        // Idempotency
        const key = `${clientId}:${eventId}`;
        if (idempotencyMap.has(key)) {
          if (callback) callback({ success: true, eventId, note: 'DUPLICATE_DROPPED' });
          return;
        }
        idempotencyMap.set(key, Date.now());

        // Rate limit
        const now = Date.now();
        const rl = rateLimitMap.get(clientId);
        if (!rl || now - rl.start >= 1000) {
          rateLimitMap.set(clientId, { count: 1, start: now });
        } else if (rl.count >= rateLimit) {
          if (callback) callback({ success: false, error: 'RATE_LIMIT_EXCEEDED' });
          return;
        } else {
          rl.count += 1;
        }

        const event = {
          clientId,
          eventId,
          timestamp,
          payload: typeof payload.data === 'string' ? payload.data : JSON.stringify(payload.data),
        };

        bufferQueue.push(event);

        if (callback) callback({ success: true, eventId });
      } catch (err) {
        if (callback) callback({ success: false, error: err.message });
      }
    });

    // Batch event
    socket.on('batch_sync', (batch, callback) => {
      if (!Array.isArray(batch)) {
        if (callback) callback({ success: false, error: 'Expected array' });
        return;
      }

      let count = 0;
      for (const item of batch) {
        const eventId = item.eventId || `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        const timestamp = item.timestamp || new Date().toISOString();

        bufferQueue.push({
          clientId,
          eventId,
          timestamp,
          payload: typeof item.data === 'string' ? item.data : JSON.stringify(item.data),
        });
        count++;
      }

      if (callback) callback({ success: true, processed: count });
    });
  });
}

module.exports = { setupSocketHandlers };
