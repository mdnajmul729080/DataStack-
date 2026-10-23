# Admin Settings Manifest

## Purpose
Global administrative configuration store and live subsystem parameter tuning.

## Managed Parameters
- Ports: Ingestion (:4000) and Web (:3000)
- Rate limiting and maximum payload size bounds
- Buffer flush thresholds (count & timer)
- CSV rotation limits (100MB / per-day)
- JWT signature secret keys

## Dependencies
- `core/Security/security`
- `core/data/buffer`
- `core/auth/jwt`
- `core/Storage/csvStorage`
