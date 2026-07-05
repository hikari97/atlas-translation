---
title: EPIC-034-atlas-queue
status: Ready
sprint: SPRINT-004-backend
package: atlas-queue
owner: H.Makki
created_at: 2026-07-05
updated_at: 2026-07-05
---

# EPIC-034-atlas-queue

## Purpose

Provider-neutral queue abstraction for messages, producers, consumers, retries, dead letters, concurrency, delayed jobs, priority, idempotency, and diagnostics.

## Scope

Queue contracts and deterministic in-memory queue only; no Redis, RabbitMQ, SQS, or hosted provider.

## Dependencies

- EPIC-026-atlas-runtime
- EPIC-027-atlas-config

## Deliverables

```txt
packages/atlas-queue/**
```

## Acceptance Criteria

- All task files are implemented sequentially.
- `atlas-queue` remains reusable and framework-independent.
- Public API is clear and exported from package entrypoint.
- No application code is modified by package tasks.
- TypeScript, tests, and build pass where available.
- No circular dependencies are introduced.

## Related Documents

- README.MD
- AGENTS.md
- CONSTITUTION.md
- DO_NOT_BREAK.md
- tasks/README.md
- tasks/templates/TASK_TEMPLATE.md

## Tasks

| Task | Title | Status |
|---|---|---|
| TASK-001 | Queue Package Foundation | Ready |
| TASK-002 | Queue Core Types | Ready |
| TASK-003 | Message Envelope | Ready |
| TASK-004 | Queue Adapter Contract | Ready |
| TASK-005 | Memory Queue Adapter | Ready |
| TASK-006 | Queue Producer | Ready |
| TASK-007 | Queue Consumer | Ready |
| TASK-008 | Acknowledgement | Ready |
| TASK-009 | Retry Policy | Ready |
| TASK-010 | Dead Letter Queue | Ready |
| TASK-011 | Concurrency | Ready |
| TASK-012 | Delayed Jobs | Ready |
| TASK-013 | Priority | Ready |
| TASK-014 | Idempotency | Ready |
| TASK-015 | Config Integration | Ready |
| TASK-016 | Runtime Integration | Ready |
| TASK-017 | Queue Test Utilities | Ready |
| TASK-018 | Queue Public API | Ready |
