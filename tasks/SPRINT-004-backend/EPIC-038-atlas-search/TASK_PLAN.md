# TASK_PLAN — EPIC-038-atlas-search

## Epic

Package: `atlas-search`

Purpose: Provider-neutral search abstraction for indexes, documents, analyzers, query DSL, in-memory adapter, indexing, facets, ranking, reindexing, diagnostics, and integrations.

## Dependencies

- EPIC-030-atlas-database
- EPIC-033-atlas-storage
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
| TASK-001 | Search Package Foundation | Create the package foundation for atlas-search. |
| TASK-002 | Search Core Types | Define index IDs, document IDs, operation options, and result contracts. |
| TASK-003 | Index Schema | Define index settings, field definitions, and schema metadata. |
| TASK-004 | Search Document | Define document contracts, metadata, versions, and source payloads. |
| TASK-005 | Analyzer Contract | Define analyzer/tokenizer contracts without provider coupling. |
| TASK-006 | Query DSL | Implement provider-neutral query descriptors for term, match, boolean, range, and exists queries. |
| TASK-007 | Search Filter | Implement filter descriptors and validation helpers. |
| TASK-008 | Sorting Pagination | Implement sorting, pagination, cursor, and result metadata. |
| TASK-009 | Memory Search Adapter | Implement deterministic in-memory search adapter for tests and development. |
| TASK-010 | Indexing Service | Implement add, update, delete, get, and search orchestration over adapter boundary. |
| TASK-011 | Batch Indexing | Implement batch indexing descriptors and result helpers. |
| TASK-012 | Facets | Define facet descriptors and aggregation result contracts. |
| TASK-013 | Ranking | Define ranking score metadata and ranking option boundaries. |
| TASK-014 | Reindex Plan | Define reindex plan descriptors and safe execution boundaries. |
| TASK-015 | Database Storage Boundary | Expose optional boundaries to atlas-database and atlas-storage public APIs. |
| TASK-016 | Config Integration | Expose atlas-config integration boundary for search configuration. |
| TASK-017 | Search Test Utilities | Create fixtures, fake analyzers, and search assertions. |
| TASK-018 | Search Public API | Finalize public exports and package API documentation boundary. |

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
