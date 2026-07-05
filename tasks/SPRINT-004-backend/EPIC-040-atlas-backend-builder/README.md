---
title: EPIC-040-atlas-backend-builder
status: Ready
sprint: SPRINT-004-backend
package: atlas-backend-builder
owner: H.Makki
created_at: 2026-07-05
updated_at: 2026-07-05
---

# EPIC-040-atlas-backend-builder

## Purpose

Backend composition package for wiring runtime, config, container, modules, database, cache, storage, queue, scheduler, worker, mail, search, notification, diagnostics, and app-facing build plans.

## Scope

Composition descriptors and build plans only; no app startup, no Express route implementation, and no external provider boot.

## Dependencies

- EPIC-026-atlas-runtime
- EPIC-027-atlas-config
- EPIC-028-atlas-container
- EPIC-029-atlas-module
- EPIC-030-atlas-database
- EPIC-032-atlas-cache
- EPIC-033-atlas-storage
- EPIC-034-atlas-queue
- EPIC-036-atlas-worker

## Deliverables

```txt
packages/atlas-backend-builder/**
```

## Acceptance Criteria

- All task files are implemented sequentially.
- `atlas-backend-builder` remains reusable and framework-independent.
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
| TASK-001 | Backend Builder Package Foundation | Ready |
| TASK-002 | Backend Builder Core Types | Ready |
| TASK-003 | Backend Manifest | Ready |
| TASK-004 | Capability Registry | Ready |
| TASK-005 | Config Composition | Ready |
| TASK-006 | Runtime Composition | Ready |
| TASK-007 | Container Composition | Ready |
| TASK-008 | Module Composition | Ready |
| TASK-009 | Database Composition | Ready |
| TASK-010 | Cache Storage Composition | Ready |
| TASK-011 | Queue Worker Composition | Ready |
| TASK-012 | Scheduler Composition | Ready |
| TASK-013 | Mail Search Notification Composition | Ready |
| TASK-014 | Diagnostics Composition | Ready |
| TASK-015 | Backend Build Plan | Ready |
| TASK-016 | Backend Testing Harness | Ready |
| TASK-017 | Apps API Boundary | Ready |
| TASK-018 | Backend Builder Public API | Ready |
