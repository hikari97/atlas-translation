---
title: EPIC-030-atlas-database
status: Ready
sprint: SPRINT-004-backend
package: atlas-database
owner: H.Makki
created_at: 2026-07-05
updated_at: 2026-07-05
---

# EPIC-030-atlas-database

## Purpose

Provider-neutral database foundation for connection contracts, transactions, migrations, repository primitives, diagnostics, and integration boundaries.

## Scope

Database abstraction only; no MongoDB driver implementation, no app routes, no ORM entity behavior.

## Dependencies

- EPIC-026-atlas-runtime
- EPIC-027-atlas-config

## Deliverables

```txt
packages/atlas-database/**
```

## Acceptance Criteria

- All task files are implemented sequentially.
- `atlas-database` remains reusable and framework-independent.
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
| TASK-001 | Database Package Foundation | Ready |
| TASK-002 | Database Core Types | Ready |
| TASK-003 | Database Connection Config | Ready |
| TASK-004 | Database Client Contract | Ready |
| TASK-005 | Database Connection Manager | Ready |
| TASK-006 | Database Transaction Contract | Ready |
| TASK-007 | Database Transaction Runner | Ready |
| TASK-008 | Database Query Result | Ready |
| TASK-009 | Repository Primitive | Ready |
| TASK-010 | Migration Model | Ready |
| TASK-011 | Migration Runner | Ready |
| TASK-012 | Database Health Check | Ready |
| TASK-013 | Database Error Model | Ready |
| TASK-014 | Database Diagnostics | Ready |
| TASK-015 | Config Integration | Ready |
| TASK-016 | Runtime Integration | Ready |
| TASK-017 | Database Test Utilities | Ready |
| TASK-018 | Database Public API | Ready |
