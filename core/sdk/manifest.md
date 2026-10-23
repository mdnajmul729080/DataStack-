# SDK Management Manifest

## Purpose
Manages client SDK credentials, client registration, tokens, and client-level throughput rate limits.

## Key Logic
- Generates API keys and signed JWT client tokens.
- Tracks client registration status (active/revoked), event counters, and last-active timestamp.
- Allows immediate token revocation or rate limit reconfiguration.

## Dependencies
- `core/auth/jwt`
