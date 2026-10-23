# DataStack Python SDK

Official Python client for the **DataStack Universal Realtime Data Collection Platform**.

## Installation

Install directly via pip:

```bash
pip install ./sdk-python
```
Or in development:
```bash
cd sdk-python && pip install -e .
```

## Quick Start

```python
from datastack_sdk import DataStackClient

# 1. Initialize client with JWT from /vcon/clients console
client = DataStackClient(
    server_url="http://localhost:4000",
    token="YOUR_CLIENT_JWT_TOKEN"
)

# 2. Connect to Ingestion Engine
if client.connect():
    # 3. Stream single realtime event
    res = client.sync({
        "action": "user_checkout",
        "order_id": "ORD-9482",
        "amount": 249.50,
        "currency": "USD"
    })
    print("Sync result:", res)

    # 4. Stream batch of records
    batch_res = client.batch_sync([
        {"metric": "cpu_load", "value": 42.1},
        {"metric": "mem_usage", "value": 78.5},
        {"metric": "disk_io", "value": 1120}
    ])
    print("Batch result:", batch_res)

    client.disconnect()
```
