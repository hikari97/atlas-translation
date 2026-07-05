---
title: EPIC-031-atlas-orm
status: Ready
sprint: SPRINT-004-backend
package: atlas-orm
owner: H.Makki
created_at: 2026-07-05
updated_at: 2026-07-05
---

# EPIC-031-atlas-orm

## Purpose

Lightweight ORM layer for entity schemas, field metadata, relations, query descriptors, repositories, mapping, and database integration.

## Scope

ORM metadata and provider-neutral query model only; no concrete MongoDB adapter and no decorator/reflection dependency.

## Dependencies

- EPIC-030-atlas-database

## Deliverables

```txt
packages/atlas-orm/**
```

## Acceptance Criteria

- All task files are implemented sequentially.
- `atlas-orm` remains reusable and framework-independent.
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
| TASK-001 | ORM Package Foundation | Ready |
| TASK-002 | ORM Core Types | Ready |
| TASK-003 | Entity Metadata | Ready |
| TASK-004 | Field Definition | Ready |
| TASK-005 | Model Schema | Ready |
| TASK-006 | Relation Definition | Ready |
| TASK-007 | Query Descriptor | Ready |
| TASK-008 | Filter Operators | Ready |
| TASK-009 | Projection Sorting Pagination | Ready |
| TASK-010 | Repository Contract | Ready |
| TASK-011 | Repository Implementation | Ready |
| TASK-012 | Unit Of Work | Ready |
| TASK-013 | Entity Mapper | Ready |
| TASK-014 | ORM Serialization | Ready |
| TASK-015 | Database Integration | Ready |
| TASK-016 | ORM Diagnostics | Ready |
| TASK-017 | ORM Test Utilities | Ready |
| TASK-018 | ORM Public API | Ready |
