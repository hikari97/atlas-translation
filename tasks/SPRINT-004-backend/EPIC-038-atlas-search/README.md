---
title: EPIC-038-atlas-search
status: Ready
sprint: SPRINT-004-backend
package: atlas-search
owner: H.Makki
created_at: 2026-07-05
updated_at: 2026-07-05
---

# EPIC-038-atlas-search

## Purpose

Provider-neutral search abstraction for indexes, documents, analyzers, query DSL, in-memory adapter, indexing, facets, ranking, reindexing, diagnostics, and integrations.

## Scope

Search contracts and deterministic in-memory search only; no Elasticsearch/Meilisearch/Algolia provider.

## Dependencies

- EPIC-030-atlas-database
- EPIC-033-atlas-storage
- EPIC-027-atlas-config

## Deliverables

```txt
packages/atlas-search/**
```

## Acceptance Criteria

- All task files are implemented sequentially.
- `atlas-search` remains reusable and framework-independent.
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
| TASK-001 | Search Package Foundation | Ready |
| TASK-002 | Search Core Types | Ready |
| TASK-003 | Index Schema | Ready |
| TASK-004 | Search Document | Ready |
| TASK-005 | Analyzer Contract | Ready |
| TASK-006 | Query DSL | Ready |
| TASK-007 | Search Filter | Ready |
| TASK-008 | Sorting Pagination | Ready |
| TASK-009 | Memory Search Adapter | Ready |
| TASK-010 | Indexing Service | Ready |
| TASK-011 | Batch Indexing | Ready |
| TASK-012 | Facets | Ready |
| TASK-013 | Ranking | Ready |
| TASK-014 | Reindex Plan | Ready |
| TASK-015 | Database Storage Boundary | Ready |
| TASK-016 | Config Integration | Ready |
| TASK-017 | Search Test Utilities | Ready |
| TASK-018 | Search Public API | Ready |
