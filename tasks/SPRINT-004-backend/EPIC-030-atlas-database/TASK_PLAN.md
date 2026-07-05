# TASK_PLAN — EPIC-030-atlas-database

## Epic

Package: `atlas-database`

Purpose: Provider-neutral database foundation for connection contracts, transactions, migrations, repository primitives, diagnostics, and integration boundaries.

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
| TASK-001 | Database Package Foundation | Create the package foundation for atlas-database. |
| TASK-002 | Database Core Types | Define provider-neutral database identifiers, states, options, results, and metadata. |
| TASK-003 | Database Connection Config | Define connection configuration contracts without reading process.env directly. |
| TASK-004 | Database Client Contract | Define the database client boundary used by higher-level packages. |
| TASK-005 | Database Connection Manager | Implement connection lifecycle coordination around the client boundary. |
| TASK-006 | Database Transaction Contract | Define transaction context, transaction options, and transaction result contracts. |
| TASK-007 | Database Transaction Runner | Implement transaction orchestration helpers around provider-neutral callbacks. |
| TASK-008 | Database Query Result | Implement query result, affected-row, pagination, and operation result helpers. |
| TASK-009 | Repository Primitive | Implement minimal repository boundary contracts without ORM behavior. |
| TASK-010 | Migration Model | Define migration descriptors, direction, status, and execution records. |
| TASK-011 | Migration Runner | Implement deterministic migration runner orchestration over migration descriptors. |
| TASK-012 | Database Health Check | Implement provider-neutral health check contracts and result helpers. |
| TASK-013 | Database Error Model | Implement typed database errors, error codes, and safe serialization helpers. |
| TASK-014 | Database Diagnostics | Define diagnostics events and safe payloads for database operations. |
| TASK-015 | Config Integration | Expose atlas-config integration boundary for normalized database configuration. |
| TASK-016 | Runtime Integration | Expose atlas-runtime registration hooks for database capability. |
| TASK-017 | Database Test Utilities | Create fakes, fixtures, and deterministic test helpers. |
| TASK-018 | Database Public API | Finalize public exports and package API documentation boundary. |

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
