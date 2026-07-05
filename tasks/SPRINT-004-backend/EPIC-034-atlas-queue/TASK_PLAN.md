# TASK_PLAN — EPIC-034-atlas-queue

## Epic

Package: `atlas-queue`

Purpose: Provider-neutral queue abstraction for messages, producers, consumers, retries, dead letters, concurrency, delayed jobs, priority, idempotency, and diagnostics.

## Dependencies

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
| TASK-001 | Queue Package Foundation | Create the package foundation for atlas-queue. |
| TASK-002 | Queue Core Types | Define queue names, message IDs, operation options, and result contracts. |
| TASK-003 | Message Envelope | Implement typed message envelope, headers, metadata, and correlation IDs. |
| TASK-004 | Queue Adapter Contract | Define queue adapter operations without provider coupling. |
| TASK-005 | Memory Queue Adapter | Implement deterministic in-memory queue adapter for tests and development. |
| TASK-006 | Queue Producer | Implement producer helpers for enqueueing typed messages. |
| TASK-007 | Queue Consumer | Implement consumer contracts and handler boundaries. |
| TASK-008 | Acknowledgement | Implement ack/nack and message settlement contracts. |
| TASK-009 | Retry Policy | Implement retry metadata, retry decisions, and backoff descriptors. |
| TASK-010 | Dead Letter Queue | Implement dead-letter descriptors and routing boundaries. |
| TASK-011 | Concurrency | Define concurrency options and safe handler execution boundaries. |
| TASK-012 | Delayed Jobs | Define delayed job descriptors without scheduler coupling. |
| TASK-013 | Priority | Implement priority metadata and comparison helpers. |
| TASK-014 | Idempotency | Implement idempotency key contracts and duplicate-handling boundaries. |
| TASK-015 | Config Integration | Expose atlas-config integration boundary for queue configuration. |
| TASK-016 | Runtime Integration | Expose atlas-runtime registration hooks for queue capability. |
| TASK-017 | Queue Test Utilities | Create fake queues, fixtures, and handler assertions. |
| TASK-018 | Queue Public API | Finalize public exports and package API documentation boundary. |

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
