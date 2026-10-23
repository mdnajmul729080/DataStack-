# Server Runtime Manifest

## Purpose
Express.js and Socket.IO server engine hosting WebSocket connections, JWT authentication handshakes, and event intake on port 4000.

## Key Logic
- Initializes Express server on Port 4000 (decoupled from Next.js on Port 3000)
- Mounts Socket.IO with CORS, ping intervals, and transport handling
- Exposes `/health` check for uptime monitoring

## Dependencies
- `express`
- `socket.io`
- `cors`
- `core/connector/socketHandler`
