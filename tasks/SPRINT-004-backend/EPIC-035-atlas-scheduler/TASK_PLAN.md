# TASK_PLAN — EPIC-035-atlas-scheduler

## Epic

Package: `atlas-scheduler`

Purpose: Provider-neutral scheduler abstraction for schedules, triggers, job registry, scheduler engine, locks, missed runs, queue/worker integration, diagnostics, and test utilities.

## Dependencies

- EPIC-034-atlas-queue
- EPIC-036-atlas-worker
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
| TASK-001 | Scheduler Package Foundation | Create the package foundation for atlas-scheduler. |
| TASK-002 | Scheduler Core Types | Define schedule IDs, job IDs, states, options, and result contracts. |
| TASK-003 | Schedule Definition | Define one-time, interval, cron-like, and disabled schedule contracts. |
| TASK-004 | Expression Validation | Implement lightweight schedule expression validation boundaries. |
| TASK-005 | Clock Abstraction | Implement deterministic clock abstraction for schedule evaluation. |
| TASK-006 | Trigger Calculator | Implement next-run calculation boundaries and result contracts. |
| TASK-007 | Job Registry | Implement scheduled job registry descriptors and validation. |
| TASK-008 | Scheduler Engine | Implement scheduler engine orchestration without starting background processes on import. |
| TASK-009 | Lock Lease | Define lock and lease contracts for distributed-safe scheduling. |
| TASK-010 | Missed Runs | Implement missed-run policies, catch-up behavior, and skip behavior descriptors. |
| TASK-011 | Timezone | Define timezone-aware metadata and validation boundaries. |
| TASK-012 | Persistence Boundary | Define scheduler state persistence contracts without database coupling. |
| TASK-013 | Queue Integration | Expose dispatch boundaries to atlas-queue public API. |
| TASK-014 | Worker Integration | Expose scheduled execution boundaries to atlas-worker public API. |
| TASK-015 | Config Integration | Expose atlas-config integration boundary for scheduler configuration. |
| TASK-016 | Scheduler Diagnostics | Define diagnostics events and safe payloads for schedule evaluation. |
| TASK-017 | Scheduler Test Utilities | Create deterministic clocks, fake stores, and scheduler assertions. |
| TASK-018 | Scheduler Public API | Finalize public exports and package API documentation boundary. |

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
