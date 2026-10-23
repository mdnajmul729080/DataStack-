# Data Management Manifest

## Purpose
In-memory and Redis buffer engine for high-throughput batching of collected events.

## Key Logic
- Buffers events in memory to prevent per-event disk I/O.
- Flushes batch to CSV Storage on threshold (500 items) or interval (2000ms).
- Delivers live events to UI subscribers for real-time monitoring.

## Dependencies
- `core/Storage/csvStorage`
