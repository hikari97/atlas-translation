---
title: EPIC-035-atlas-scheduler
status: Ready
sprint: SPRINT-004-backend
package: atlas-scheduler
owner: H.Makki
created_at: 2026-07-05
updated_at: 2026-07-05
---

# EPIC-035-atlas-scheduler

## Purpose

Provider-neutral scheduler abstraction for schedules, triggers, job registry, scheduler engine, locks, missed runs, queue/worker integration, diagnostics, and test utilities.

## Scope

Schedule evaluation and orchestration boundaries only; no always-on background daemon by default.

## Dependencies

- EPIC-034-atlas-queue
- EPIC-036-atlas-worker
- EPIC-027-atlas-config

## Deliverables

```txt
packages/atlas-scheduler/**
```

## Acceptance Criteria

- All task files are implemented sequentially.
- `atlas-scheduler` remains reusable and framework-independent.
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
| TASK-001 | Scheduler Package Foundation | Ready |
| TASK-002 | Scheduler Core Types | Ready |
| TASK-003 | Schedule Definition | Ready |
| TASK-004 | Expression Validation | Ready |
| TASK-005 | Clock Abstraction | Ready |
| TASK-006 | Trigger Calculator | Ready |
| TASK-007 | Job Registry | Ready |
| TASK-008 | Scheduler Engine | Ready |
| TASK-009 | Lock Lease | Ready |
| TASK-010 | Missed Runs | Ready |
| TASK-011 | Timezone | Ready |
| TASK-012 | Persistence Boundary | Ready |
| TASK-013 | Queue Integration | Ready |
| TASK-014 | Worker Integration | Ready |
| TASK-015 | Config Integration | Ready |
| TASK-016 | Scheduler Diagnostics | Ready |
| TASK-017 | Scheduler Test Utilities | Ready |
| TASK-018 | Scheduler Public API | Ready |
