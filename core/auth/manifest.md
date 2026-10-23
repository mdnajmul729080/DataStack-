# Core Auth Manifest

## Purpose
JWT-based authentication engine for Client SDK connections during Socket.IO handshakes.

## Key Logic
- Signs JWT with `clientId`, `rateLimit`, and timestamp.
- Verifies bearer tokens during Socket.IO connection handshake.
- Disconnects invalid or expired tokens immediately.

## Dependencies
- `jsonwebtoken`
