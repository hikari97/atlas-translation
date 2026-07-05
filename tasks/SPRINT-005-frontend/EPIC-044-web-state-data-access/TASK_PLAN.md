# TASK_PLAN — EPIC-044-web-state-data-access

## Epic

Area: `web-state-data-access`

Purpose: Create frontend state management and API data-access boundaries for screens and editor workflows.

## Dependencies

- EPIC-041-web-app-foundation

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
| TASK-001 | State Boundary | Create frontend-local state and data access structure. |
| TASK-002 | App Store | Implement app-level state store boundary for UI preferences and session-independent state. |
| TASK-003 | Workspace Store | Implement workspace selection and workspace UI state. |
| TASK-004 | Project Store | Implement project selection and project UI state. |
| TASK-005 | Editor Store | Implement editor-local state boundaries for page, selection, viewport, and panels. |
| TASK-006 | Job Store | Implement frontend job state for OCR, translation, export, and AI workflow displays. |
| TASK-007 | Data Client Boundary | Implement typed API client boundary without hardcoding final backend routes. |
| TASK-008 | Data Query Keys | Define stable query key helpers for frontend data fetching. |
| TASK-009 | Fetch Hooks | Implement typed data fetching hooks for workspace and project placeholder APIs. |
| TASK-010 | Mutation Hooks | Implement typed mutation hook boundaries for create/update/delete flows. |
| TASK-011 | Data Error Normalization | Implement frontend-safe error normalization helpers. |
| TASK-012 | Loading Policy | Define loading, optimistic, stale, and refetch behavior contracts. |
| TASK-013 | State Persistence | Implement safe local persistence for UI preferences only. |
| TASK-014 | Mock Data Adapters | Create deterministic mock adapters for tests and disconnected UI development. |
| TASK-015 | State Test Utilities | Create test harnesses for store and data hooks. |
| TASK-016 | State Integration Tests | Add tests for store behavior, data client boundaries, and error handling. |
| TASK-017 | Import Boundaries | Ensure state/data-access imports do not leak into UI packages improperly. |
| TASK-018 | State Public Boundary | Finalize frontend state and data-access public internal boundaries. |

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
