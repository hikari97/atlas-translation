# TASK_PLAN — EPIC-046-project-management-ui

## Epic

Area: `project-management-ui`

Purpose: Implement frontend screens for project listing, creation, metadata, settings, and basic lifecycle actions.

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
| TASK-001 | Projects Route | Create projects list route and shell integration. |
| TASK-002 | Projects List | Implement project list UI with cards/table variants. |
| TASK-003 | Project Filters Sorting | Implement project filtering, search, and sorting controls. |
| TASK-004 | Create Project Flow | Implement create project modal/page UI boundary. |
| TASK-005 | Edit Project Metadata | Implement edit metadata UI for title, language, format, and notes. |
| TASK-006 | Project Detail Route | Create project detail route and navigation integration. |
| TASK-007 | Project Overview | Implement project overview panels for pages, progress, and recent activity. |
| TASK-008 | Project Settings | Implement project settings UI boundary. |
| TASK-009 | Archive Delete UI | Implement archive/delete confirmation UI without backend destructive behavior. |
| TASK-010 | Project Progress | Implement project progress and status indicators. |
| TASK-011 | Language Settings | Implement source/target language settings UI. |
| TASK-012 | Collaboration Placeholder | Implement collaboration-related UI placeholders without real-time networking. |
| TASK-013 | Project Data Hooks | Integrate project UI with frontend data access boundaries. |
| TASK-014 | Project Mock Data | Add deterministic mock project data for tests and development. |
| TASK-015 | Project UI Tests | Add rendering, interaction, and state tests for project management UI. |
| TASK-016 | Project Accessibility | Ensure project forms, dialogs, and lists are accessible. |
| TASK-017 | Project Responsive Layout | Ensure project pages work across viewport sizes. |
| TASK-018 | Project Public Boundary | Finalize project feature exports and internal boundaries. |

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
