# TASK_PLAN — EPIC-045-workspace-dashboard-ui

## Epic

Area: `workspace-dashboard-ui`

Purpose: Implement the workspace dashboard frontend for recent projects, metrics, quick actions, and empty states.

## Dependencies

- EPIC-043-web-app-shell-navigation
- EPIC-044-web-state-data-access

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
| TASK-001 | Dashboard Route | Create the workspace dashboard route and layout integration. |
| TASK-002 | Summary Cards | Implement workspace summary cards for projects, pages, jobs, and exports. |
| TASK-003 | Recent Projects | Implement recent projects list/card UI. |
| TASK-004 | Quick Actions | Implement quick action cards for import, new project, resume editing, and export review. |
| TASK-005 | Activity Feed | Implement activity feed UI boundary with mockable data. |
| TASK-006 | Job Status Widget | Implement job status widget for AI/OCR/translation/export work. |
| TASK-007 | Dashboard Empty State | Implement first-run and no-project empty states. |
| TASK-008 | Dashboard Error State | Implement dashboard error and retry states. |
| TASK-009 | Dashboard Loading State | Implement dashboard skeleton and loading behavior. |
| TASK-010 | Dashboard Filters | Implement filter and sort controls for dashboard project lists. |
| TASK-011 | Dashboard Responsive Layout | Ensure dashboard layout works across viewport sizes. |
| TASK-012 | Keyboard Actions | Add keyboard-accessible dashboard actions. |
| TASK-013 | Dashboard Data Hook | Integrate dashboard UI with frontend data access boundary. |
| TASK-014 | Dashboard Mock Data | Add deterministic mock dashboard data for tests and development. |
| TASK-015 | Dashboard Tests | Add rendering and state tests for dashboard components. |
| TASK-016 | Dashboard Accessibility | Validate dashboard landmarks, headings, and focus behavior. |
| TASK-017 | Dashboard UX Polish | Refine spacing, hierarchy, and reusable dashboard component boundaries. |
| TASK-018 | Dashboard Public Boundary | Finalize dashboard feature exports and internal boundaries. |

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
