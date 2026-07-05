---
title: EPIC-036-atlas-worker
status: Ready
sprint: SPRINT-004-backend
package: atlas-worker
owner: H.Makki
created_at: 2026-07-05
updated_at: 2026-07-05
---

# EPIC-036-atlas-worker

## Purpose

Provider-neutral worker abstraction for job handlers, execution, lifecycle, concurrency, retry/backoff, cancellation, heartbeat, supervision, queue integration, diagnostics, and test utilities.

## Scope

Worker execution boundaries only; no process manager, no external queue provider, and no app service startup.

## Dependencies

- EPIC-034-atlas-queue
- EPIC-026-atlas-runtime
- EPIC-027-atlas-config

## Deliverables

```txt
packages/atlas-worker/**
```

## Acceptance Criteria

- All task files are implemented sequentially.
- `atlas-worker` remains reusable and framework-independent.
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
| TASK-001 | Worker Package Foundation | Ready |
| TASK-002 | Worker Core Types | Ready |
| TASK-003 | Worker Context | Ready |
| TASK-004 | Job Handler | Ready |
| TASK-005 | Execution Result | Ready |
| TASK-006 | Worker Executor | Ready |
| TASK-007 | Worker Lifecycle | Ready |
| TASK-008 | Concurrency Limiter | Ready |
| TASK-009 | Retry Backoff | Ready |
| TASK-010 | Cancellation | Ready |
| TASK-011 | Heartbeat | Ready |
| TASK-012 | Supervision | Ready |
| TASK-013 | Queue Integration | Ready |
| TASK-014 | Runtime Integration | Ready |
| TASK-015 | Config Integration | Ready |
| TASK-016 | Worker Diagnostics | Ready |
| TASK-017 | Worker Test Utilities | Ready |
| TASK-018 | Worker Public API | Ready |
