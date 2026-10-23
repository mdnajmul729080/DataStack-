# Storage Data Manifest

## Purpose
Root directory for all collected realtime CSV datasets.

## Directory Structure
`/storage/data/{clientId}/{YYYY-MM-DD}.csv`

## Rotation Rules
- Daily partition by ISO date string (`YYYY-MM-DD.csv`)
- Size rotation partition (`{YYYY-MM-DD}-part{N}.csv`) when any single file reaches 100MB threshold.
- Row schema: `clientId, eventId, timestamp, payload`
