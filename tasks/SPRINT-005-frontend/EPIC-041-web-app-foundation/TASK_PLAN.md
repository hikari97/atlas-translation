# TASK_PLAN — EPIC-041-web-app-foundation

## Epic

Area: `web-app-foundation`

Purpose: Establish the frontend application foundation for Atlas Studio web UI.

## Dependencies

- None

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
| TASK-001 | Web Package Foundation | Create or normalize the apps/web frontend package foundation. |
| TASK-002 | Next.js Configuration | Configure Next.js application defaults required by the frontend without backend coupling. |
| TASK-003 | TypeScript Configuration | Ensure frontend TypeScript configuration is strict and compatible with repository conventions. |
| TASK-004 | Frontend Folder Structure | Create a clear apps/web source structure for app routes, components, features, hooks, lib, and tests. |
| TASK-005 | Root Layout | Implement the root layout boundary for the web app. |
| TASK-006 | Provider Shell | Implement frontend provider composition for theme, state, and application context. |
| TASK-007 | Route Foundation | Create base route structure for dashboard, projects, editor, settings, and auth placeholders. |
| TASK-008 | Error Boundary | Implement frontend error boundary and fallback UI contracts. |
| TASK-009 | Loading Empty States | Implement shared loading, empty, and unavailable state primitives inside apps/web. |
| TASK-010 | Frontend Env Boundary | Create a safe frontend environment/config access boundary. |
| TASK-011 | Assets And Fonts | Configure frontend static asset and font usage without hardcoded external dependencies. |
| TASK-012 | Frontend Test Setup | Add package-local frontend test setup and testing utilities. |
| TASK-013 | Frontend Smoke Surface | Create a minimal smoke surface proving the app renders. |
| TASK-014 | Frontend Build Scripts | Normalize package scripts for build, test, typecheck, and lint when available. |
| TASK-015 | Frontend Import Rules | Document and enforce local import boundaries within apps/web where possible. |
| TASK-016 | Basic Routing Tests | Add tests for route availability and root rendering boundaries. |
| TASK-017 | Foundation Notes | Add package-local notes for how the frontend foundation is organized. |
| TASK-018 | Foundation Public Boundary | Finalize public internal boundaries for apps/web foundation. |

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
