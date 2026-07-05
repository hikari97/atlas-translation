# TASK_PLAN — EPIC-036-atlas-worker

## Epic

Package: `atlas-worker`

Purpose: Provider-neutral worker abstraction for job handlers, execution, lifecycle, concurrency, retry/backoff, cancellation, heartbeat, supervision, queue integration, diagnostics, and test utilities.

## Dependencies

- EPIC-034-atlas-queue
- EPIC-026-atlas-runtime
- EPIC-027-atlas-config

## Codex Implementation Rule

Do not implement all tasks at once.

Use these batches:

```txt
TASK-001 to TASK-004
TASK-005 to TASK-008
TASK-009 to TASK-012
TASK-013 to TASK-016
TASK-017 to TASK-018
```

Stop immediately if validation fails.

## Task List

| Task | Title | Goal |
|---|---|---|
| TASK-001 | Worker Package Foundation | Create the package foundation for atlas-worker. |
| TASK-002 | Worker Core Types | Define worker IDs, job IDs, execution options, states, and result contracts. |
| TASK-003 | Worker Context | Implement execution context contracts for metadata, cancellation, and service access. |
| TASK-004 | Job Handler | Define typed job handler contracts and handler registration helpers. |
| TASK-005 | Execution Result | Implement success, failure, skipped, cancelled, and retryable result helpers. |
| TASK-006 | Worker Executor | Implement handler execution orchestration with explicit error handling. |
| TASK-007 | Worker Lifecycle | Implement lifecycle states, start/stop hooks, and graceful shutdown contracts. |
| TASK-008 | Concurrency Limiter | Implement deterministic concurrency limiter boundaries. |
| TASK-009 | Retry Backoff | Implement retry policies and backoff strategies. |
| TASK-010 | Cancellation | Implement cancellation token contracts and cancellation-aware helpers. |
| TASK-011 | Heartbeat | Implement heartbeat contracts and status reporting. |
| TASK-012 | Supervision | Define supervision policies for controlled failure handling. |
| TASK-013 | Queue Integration | Expose worker boundaries for atlas-queue consumer messages. |
| TASK-014 | Runtime Integration | Expose atlas-runtime registration hooks for worker capability. |
| TASK-015 | Config Integration | Expose atlas-config integration boundary for worker configuration. |
| TASK-016 | Worker Diagnostics | Define diagnostics events and safe payloads for worker execution. |
| TASK-017 | Worker Test Utilities | Create fake jobs, harnesses, and handler assertions. |
| TASK-018 | Worker Public API | Finalize public exports and package API documentation boundary. |

## Standard Prompt

```txt
Read README.md, TASK_PLAN.md, and the task files for the current batch.

Implement only the current batch.
Work sequentially.
Before each task, read the full task file.
Only modify Files Allowed.
Do not modify Files Forbidden.
Add or update tests.
Run available validation commands.
Stop on validation failure.
Report files changed, tests run, validation results, and unfinished items.
```
