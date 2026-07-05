---
title: EPIC-039-atlas-notification
status: Ready
sprint: SPRINT-004-backend
package: atlas-notification
owner: H.Makki
created_at: 2026-07-05
updated_at: 2026-07-05
---

# EPIC-039-atlas-notification

## Purpose

Provider-neutral notification abstraction for channels, preferences, templates, events, delivery pipeline, in-app/email channels, queue/scheduler integration, routing, deduplication, rate limits, diagnostics, and test utilities.

## Scope

Notification orchestration boundaries only; no push provider and no application UI storage implementation.

## Dependencies

- EPIC-034-atlas-queue
- EPIC-035-atlas-scheduler
- EPIC-037-atlas-mail

## Deliverables

```txt
packages/atlas-notification/**
```

## Acceptance Criteria

- All task files are implemented sequentially.
- `atlas-notification` remains reusable and framework-independent.
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
| TASK-001 | Notification Package Foundation | Ready |
| TASK-002 | Notification Core Types | Ready |
| TASK-003 | Channel Model | Ready |
| TASK-004 | Recipient Model | Ready |
| TASK-005 | Recipient Preferences | Ready |
| TASK-006 | Notification Template | Ready |
| TASK-007 | Notification Event | Ready |
| TASK-008 | Delivery Result | Ready |
| TASK-009 | Delivery Pipeline | Ready |
| TASK-010 | In-App Channel | Ready |
| TASK-011 | Email Channel | Ready |
| TASK-012 | Queue Integration | Ready |
| TASK-013 | Scheduler Integration | Ready |
| TASK-014 | State Model | Ready |
| TASK-015 | Deduplication Rate Limit | Ready |
| TASK-016 | Notification Diagnostics | Ready |
| TASK-017 | Notification Test Utilities | Ready |
| TASK-018 | Notification Public API | Ready |
