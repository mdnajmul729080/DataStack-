# Notification Engine Manifest

## Purpose
System-level alerts and event notification service for admin awareness.

## Key Logic
- Records security violations (unauthorized JWT attempts, rate limits)
- Logs storage events (batch flushes, rotation to part files, CSV write failures)
- Real-time notification feed for `/vcon/` admin UI.
