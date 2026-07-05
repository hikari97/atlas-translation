# TASK_PLAN — EPIC-031-atlas-orm

## Epic

Package: `atlas-orm`

Purpose: Lightweight ORM layer for entity schemas, field metadata, relations, query descriptors, repositories, mapping, and database integration.

## Dependencies

- EPIC-030-atlas-database

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
| TASK-001 | ORM Package Foundation | Create the package foundation for atlas-orm. |
| TASK-002 | ORM Core Types | Define entity identifiers, model identifiers, entity state, options, and result contracts. |
| TASK-003 | Entity Metadata | Define entity metadata without decorators or runtime reflection. |
| TASK-004 | Field Definition | Define scalar field metadata, nullability, defaults, and constraints. |
| TASK-005 | Model Schema | Implement serializable model schema contracts. |
| TASK-006 | Relation Definition | Define relation metadata for one-to-one, one-to-many, many-to-one, and many-to-many. |
| TASK-007 | Query Descriptor | Define provider-neutral ORM query descriptors. |
| TASK-008 | Filter Operators | Implement comparison and logical filter operator helpers. |
| TASK-009 | Projection Sorting Pagination | Implement projection, sorting, and pagination descriptor helpers. |
| TASK-010 | Repository Contract | Define typed repository contracts over entity schemas. |
| TASK-011 | Repository Implementation | Implement repository orchestration over atlas-database client boundaries. |
| TASK-012 | Unit Of Work | Define unit-of-work contracts for coordinated repository operations. |
| TASK-013 | Entity Mapper | Implement entity-to-record and record-to-entity mapper boundaries. |
| TASK-014 | ORM Serialization | Implement safe plain-object serialization helpers. |
| TASK-015 | Database Integration | Integrate atlas-orm contracts with atlas-database public API only. |
| TASK-016 | ORM Diagnostics | Define diagnostics events and safe debug payloads for ORM operations. |
| TASK-017 | ORM Test Utilities | Create fixtures, fake repositories, and mapper test helpers. |
| TASK-018 | ORM Public API | Finalize public exports and package API documentation boundary. |

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
