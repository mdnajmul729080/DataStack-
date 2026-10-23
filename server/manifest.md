# Server Manifest

## Purpose
Independent Express.js and Socket.IO ingestion service operating on Port 4000.

## Architecture
- **Port**: 4000 (Decoupled from Next.js on port 3000)
- **Role**: High-throughput WebSocket handshake, JWT verify, event intake
- **Worker**: `workers/csvWriter.js` for async batch appending to `/storage/data/{clientId}/{YYYY-MM-DD}.csv`
- **Socket Handlers**: `socket/handlers.js` with client room partitioning and rate limiting.

## Dependencies
- `express`
- `socket.io`
- `cors`
- `jsonwebtoken`
- `json2csv`
