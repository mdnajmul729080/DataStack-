# Database Engine Manifest

## Purpose
Database layer managing PostgreSQL schema via Prisma ORM.

## Absolute Constraint
PostgreSQL is utilized ONLY for:
1. Client SDK registrations and API keys
2. Admin settings and feature flags
3. System audit logs

**Collected realtime data is NEVER stored per-row in PostgreSQL.** It is stored exclusively in rotated CSV files at `/storage/data/{clientId}/{YYYY-MM-DD}.csv`.
