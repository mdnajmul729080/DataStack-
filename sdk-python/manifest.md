# Python SDK Manifest

## Purpose
Pip-installable Python client SDK (`datastack-sdk`) enabling Python applications, scrapers, and telemetry daemons to stream real-time events to DataStack.

## Contents
- `setup.py`: Standard setuptools configuration
- `datastack_sdk/client.py`: `DataStackClient` class with automatic reconnection, JWT handshake, and sync/batch_sync methods
- `README.md`: Quickstart guide and API reference.

## Dependencies
- `python-socketio[client]`
- `requests`
