# Core Backend Engine Manifest

## Purpose
Modular backend subsystems for DataStack:
- `auth`: JWT verification and generation
- `connector`: Socket.IO intake and handshake handling
- `data`: In-memory and Redis buffer management
- `Storage`: CSV file partition writing and rotation
- `Security`: Rate limiter, payload validator, idempotency checker
- `sdk`: Client SDK registry and credentials
- `adminSettings`: Configuration state
- `Database`: PostgreSQL / Prisma schema metadata
- `notification`: System alerts and audit events
- `Server`: Express + Socket.IO process (Port 4000)
- `apiEngine`: Aggregated data providers for REST API
