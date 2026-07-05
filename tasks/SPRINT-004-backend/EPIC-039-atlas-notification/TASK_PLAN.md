# TASK_PLAN — EPIC-039-atlas-notification

## Epic

Package: `atlas-notification`

Purpose: Provider-neutral notification abstraction for channels, preferences, templates, events, delivery pipeline, in-app/email channels, queue/scheduler integration, routing, deduplication, rate limits, diagnostics, and test utilities.

## Dependencies

- EPIC-034-atlas-queue
- EPIC-035-atlas-scheduler
- EPIC-037-atlas-mail

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
| TASK-001 | Notification Package Foundation | Create the package foundation for atlas-notification. |
| TASK-002 | Notification Core Types | Define notification IDs, recipient IDs, operation options, and result contracts. |
| TASK-003 | Channel Model | Define provider-neutral notification channel contracts. |
| TASK-004 | Recipient Model | Define recipient references and recipient metadata. |
| TASK-005 | Recipient Preferences | Implement preference contracts and resolution helpers. |
| TASK-006 | Notification Template | Define title, body, action, locale, and channel-specific template content. |
| TASK-007 | Notification Event | Implement notification event envelopes and metadata. |
| TASK-008 | Delivery Result | Implement delivery status, failure reason, and delivery metadata helpers. |
| TASK-009 | Delivery Pipeline | Implement routing, channel selection, and delivery orchestration. |
| TASK-010 | In-App Channel | Implement provider-neutral in-app channel and in-memory development channel. |
| TASK-011 | Email Channel | Expose email channel bridge to atlas-mail public API. |
| TASK-012 | Queue Integration | Expose asynchronous delivery boundaries to atlas-queue. |
| TASK-013 | Scheduler Integration | Expose delayed notification boundaries to atlas-scheduler. |
| TASK-014 | State Model | Define read/unread, archived, dismissed, and delivery state contracts. |
| TASK-015 | Deduplication Rate Limit | Implement deduplication keys and rate-limit decision boundaries. |
| TASK-016 | Notification Diagnostics | Define diagnostics events and safe payloads for notification delivery. |
| TASK-017 | Notification Test Utilities | Create fake channels, fixtures, and delivery assertions. |
| TASK-018 | Notification Public API | Finalize public exports and package API documentation boundary. |

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
