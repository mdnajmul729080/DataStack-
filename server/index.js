const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const { setupSocketHandlers } = require('./socket/handlers');
const { CsvWriterWorker } = require('./workers/csvWriter');

const PORT = process.env.PORT_SOCKET || 4000;
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const bufferQueue = [];
const writer = new CsvWriterWorker();

// Periodic Batch Flush: every 2000ms or when buffer hits 500
const FLUSH_INTERVAL_MS = 2000;
const FLUSH_THRESHOLD = 500;

async function flushBuffer() {
  if (bufferQueue.length === 0) return;
  const batch = bufferQueue.splice(0, bufferQueue.length);
  try {
    const result = await writer.writeBatch(batch);
    if (result.written > 0) {
      console.log(`[CSV Worker] Flushed ${result.written} events to ${result.files.length} file(s)`);
    }
  } catch (err) {
    console.error('[CSV Worker] Flush error:', err);
    bufferQueue.unshift(...batch); // Retry next cycle
  }
}

setInterval(flushBuffer, FLUSH_INTERVAL_MS);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({
    status: 'online',
    service: 'DataStack Express Ingestion',
    port: PORT,
    bufferSize: bufferQueue.length,
    uptime: process.uptime(),
  });
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});

setupSocketHandlers(io, bufferQueue, writer);

server.listen(PORT, () => {
  console.log(`[DataStack Ingestion Engine] Express + Socket.IO listening on port ${PORT}`);
});

module.exports = { app, server, io, bufferQueue };
