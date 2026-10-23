# VCON Admin Console Manifest

## Purpose
The `/vcon/*` route hosts the full administration control center for DataStack:
- **dashboard**: Realtime metrics, buffer queue, disk usage, quick simulation trigger
- **clients**: SDK registration, JWT handshake token creation, rate limits
- **data**: Live incoming stream inspector with client filters and search
- **export**: CSV dataset exporter and streaming downloads
- **storage**: Disk inspection of `/storage/data/{clientId}/{YYYY-MM-DD}.csv` partitions and flush triggers
- **settings**: Platform limits, rotation sizes, buffer thresholds, and JWT secret management
- **sdk**: Pip-installable Python SDK guide and pre-configured client code generator
- **simulator**: In-browser event emission and batch bursting tester.

## Conventions
- Standard URL handler for all inner pages so page refreshes never redirect to home.
- Zero-radius, zero-shadow compact UI styling using global tokens.
