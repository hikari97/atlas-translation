---
title: EPIC-037-atlas-mail
status: Ready
sprint: SPRINT-004-backend
package: atlas-mail
owner: H.Makki
created_at: 2026-07-05
updated_at: 2026-07-05
---

# EPIC-037-atlas-mail

## Purpose

Provider-neutral mail abstraction for message models, addresses, templates, transports, send pipeline, attachments, retry/rate-limit boundaries, queue integration, diagnostics, and test utilities.

## Scope

Mail contracts and development transport only; no SMTP/provider SDK integration.

## Dependencies

- EPIC-034-atlas-queue
- EPIC-027-atlas-config

## Deliverables

```txt
packages/atlas-mail/**
```

## Acceptance Criteria

- All task files are implemented sequentially.
- `atlas-mail` remains reusable and framework-independent.
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
| TASK-001 | Mail Package Foundation | Ready |
| TASK-002 | Mail Core Types | Ready |
| TASK-003 | Mail Address | Ready |
| TASK-004 | Mail Message | Ready |
| TASK-005 | Mail Template | Ready |
| TASK-006 | Transport Contract | Ready |
| TASK-007 | Development Transport | Ready |
| TASK-008 | Send Pipeline | Ready |
| TASK-009 | Attachments | Ready |
| TASK-010 | Retry Boundary | Ready |
| TASK-011 | Rate Limit Boundary | Ready |
| TASK-012 | Mail Preview | Ready |
| TASK-013 | Queue Integration | Ready |
| TASK-014 | Config Integration | Ready |
| TASK-015 | Notification Boundary | Ready |
| TASK-016 | Mail Diagnostics | Ready |
| TASK-017 | Mail Test Utilities | Ready |
| TASK-018 | Mail Public API | Ready |
