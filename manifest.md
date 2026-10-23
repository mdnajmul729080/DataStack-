# DataStack Platform Root Manifest

## Purpose
Root level orchestration and system manifest for the DataStack Universal Realtime Data Collection Platform.

## Directory Index
- `app/`: Next.js App Router providing `/` (Landing page) and `/vcon/*` (Admin Console)
- `components/`: Single source of truth UI (`components/ui/`) and layout (`components/layout/`)
- `core/`: Core backend modules (auth, connector, data, storage, sdk, security, settings, server)
- `server/`: Dedicated Express + Socket.IO process on Port 4000
- `storage/`: Persisted CSV files under `/storage/data/{clientId}/{YYYY-MM-DD}.csv`
- `sdk-python/`: Pip-installable Python SDK (`datastack-sdk`)
- `docker/`: Docker Compose and Dockerfile deployment specs
- `nginx/`: Reverse proxy configuration for WebSocket and Web traffic
