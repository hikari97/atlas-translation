# TASK_PLAN — EPIC-037-atlas-mail

## Epic

Package: `atlas-mail`

Purpose: Provider-neutral mail abstraction for message models, addresses, templates, transports, send pipeline, attachments, retry/rate-limit boundaries, queue integration, diagnostics, and test utilities.

## Dependencies

- EPIC-034-atlas-queue
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
| TASK-001 | Mail Package Foundation | Create the package foundation for atlas-mail. |
| TASK-002 | Mail Core Types | Define mail IDs, provider IDs, operation options, and result contracts. |
| TASK-003 | Mail Address | Implement email address and recipient validation boundaries. |
| TASK-004 | Mail Message | Implement message contracts for sender, recipients, subject, body, headers, and metadata. |
| TASK-005 | Mail Template | Define template contracts without coupling to a rendering engine. |
| TASK-006 | Transport Contract | Define mail transport contracts without SMTP/provider coupling. |
| TASK-007 | Development Transport | Implement in-memory/dev transport for tests and local development. |
| TASK-008 | Send Pipeline | Implement validation, transport dispatch, and typed send results. |
| TASK-009 | Attachments | Define attachment metadata and safe payload boundaries. |
| TASK-010 | Retry Boundary | Define retry descriptors and retry decisions without worker implementation. |
| TASK-011 | Rate Limit Boundary | Define mail rate-limit metadata and decision contracts. |
| TASK-012 | Mail Preview | Implement preview result contracts for development and tests. |
| TASK-013 | Queue Integration | Expose asynchronous mail delivery boundaries to atlas-queue. |
| TASK-014 | Config Integration | Expose atlas-config integration boundary for mail configuration. |
| TASK-015 | Notification Boundary | Expose email channel boundary for atlas-notification without cyclic imports. |
| TASK-016 | Mail Diagnostics | Define diagnostics events and safe payloads for mail operations. |
| TASK-017 | Mail Test Utilities | Create fake transports, fixtures, and send assertions. |
| TASK-018 | Mail Public API | Finalize public exports and package API documentation boundary. |

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
