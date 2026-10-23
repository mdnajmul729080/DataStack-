# Docker Deployment Manifest

## Purpose
Containerization specs for the split architecture runtime:
- `web`: Next.js frontend + Admin console on Port 3000
- `ingestion`: Express + Socket.IO process on Port 4000
- `redis`: In-memory buffer broker and pub/sub
- `postgres`: Dedicated database for administrative metadata and client registrations (no collected data)
