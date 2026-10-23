# Storage Engine Manifest

## Purpose
File-based CSV storage engine. All collected data is persisted strictly to CSV files (zero per-row database inserts).

## Conventions
- **Path**: `/storage/data/{clientId}/{YYYY-MM-DD}.csv`
- **Schema**: `clientId, eventId, timestamp, payload`
- **Rotation**: Rotates per-day or when single file reaches 100MB limit (`-part2.csv`).
- **Batching**: Never writes per-event. Flushes buffered arrays using `json2csv` parser.

## Dependencies
- `json2csv`
- Node.js `fs`, `path`
