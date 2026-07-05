# TASK_PLAN — EPIC-032-atlas-cache

## Epic

Package: `atlas-cache`

Purpose: Provider-neutral cache abstraction for keys, entries, stores, TTL, namespaces, tags, invalidation, metrics, errors, and integrations.

## Dependencies

- EPIC-026-atlas-runtime
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
| TASK-001 | Cache Package Foundation | Create the package foundation for atlas-cache. |
| TASK-002 | Cache Core Types | Define cache identifiers, values, operation options, and result contracts. |
| TASK-003 | Cache Key | Implement key normalization, namespacing, and key validation helpers. |
| TASK-004 | Cache Entry | Define cache entry metadata, timestamps, expiration, and version metadata. |
| TASK-005 | Cache Store Contract | Define store operations for get, set, delete, clear, has, and batch operations. |
| TASK-006 | Memory Store | Implement deterministic in-memory store for tests and local development. |
| TASK-007 | TTL Expiration | Implement TTL calculation, expiration checks, and stale behavior helpers. |
| TASK-008 | Cache Namespace | Implement namespace-scoped cache interfaces and helpers. |
| TASK-009 | Cache Serialization | Define serializer contracts and a safe JSON serializer. |
| TASK-010 | Cache Invalidation | Implement invalidation helpers for keys, namespaces, and patterns. |
| TASK-011 | Cache Tags | Implement tag metadata and tag-based invalidation boundaries. |
| TASK-012 | Stampede Protection | Implement provider-neutral single-flight contracts for cache population. |
| TASK-013 | Cache Metrics | Implement hit, miss, set, delete, and error metrics snapshots. |
| TASK-014 | Cache Error Model | Implement typed cache errors and safe serialization. |
| TASK-015 | Config Integration | Expose atlas-config integration boundary for cache configuration. |
| TASK-016 | Runtime Integration | Expose atlas-runtime registration hooks for cache capability. |
| TASK-017 | Cache Test Utilities | Create fake stores, deterministic clocks, and cache assertions. |
| TASK-018 | Cache Public API | Finalize public exports and package API documentation boundary. |

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
