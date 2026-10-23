# DataStack — Self-Hosted Universal Realtime Data Collection Platform

DataStack is a high-throughput, self-hosted data collection platform designed for high-frequency event ingestion over WebSockets with buffered batch persistence to CSV.

## Architecture

| Process | Port | Role |
| :--- | :--- | :--- |
| **Next.js App Router** | 3000 | Frontend UI, `/vcon/*` admin console, streaming CSV export `/api/export` |
| **Express + Socket.IO** | 4000 | WebSocket handshake, JWT client auth, event intake |
| **CSV Writer Worker** | — | In-memory buffer flush to CSV (`500 rows / 2s`) |

## Data Persistence
- **CSV Storage Path**: `/storage/data/{clientId}/{YYYY-MM-DD}.csv`
- **Schema**: `clientId, eventId, timestamp(ISO), payload(JSON)`
- **Rotation Rule**: Per-day OR 100MB threshold (whichever triggers first).
- **PostgreSQL**: Used strictly for SDK client registration and admin settings. Zero collected data is inserted into the database.

## Python SDK
Install the client:
```bash
pip install ./sdk-python
```

Usage:
```python
from datastack_sdk import DataStackClient

client = DataStackClient(server_url="http://localhost:4000", token="JWT_TOKEN")
if client.connect():
    client.sync({"metric": "load", "value": 42})
    client.disconnect()
```

## Running the Platform
```bash
# Terminal 1: Web Interface & Admin Console
npm run dev

# Terminal 2: Express Socket.IO Ingestion Engine
npm run server
```
