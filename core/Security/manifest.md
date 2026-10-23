# Security Engine Manifest

## Purpose
Enforces client rate-limiting, event idempotency verification, and payload size bounds.

## Key Logic
- **Idempotency**: Drops duplicate `clientId + eventId` within a 5-minute TTL window.
- **Rate Limit**: Sliding per-second window configurable per client or globally.
- **Payload Guard**: Rejects payloads exceeding 100KB per event with explicit codes.

## Dependencies
- Native Node.js `Buffer`, `Map`
