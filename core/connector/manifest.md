# Connector Engine Manifest

## Purpose
Express + Socket.IO connection intake, WebSocket handshake validation, and real-time event router.

## Handlers
- Handshake auth verification using JWT
- `sync_data`: Single event streaming intake with security guard
- `batch_sync`: Array batch intake with per-event idempotency and rate limit check
- Connection lifecycle and active socket tracking

## Dependencies
- `socket.io`
- `core/auth/jwt`
- `core/Security/security`
- `core/data/buffer`
- `core/sdk/sdkManager`
