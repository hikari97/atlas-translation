# TASK_PLAN — EPIC-043-web-app-shell-navigation

## Epic

Area: `web-app-shell-navigation`

Purpose: Implement the frontend application shell, navigation, sidebar, top bar, breadcrumbs, and command entry points.

## Dependencies

- EPIC-041-web-app-foundation
- EPIC-042-atlas-ui-design-system

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
| TASK-001 | Shell Route Groups | Create app shell route groups and layout boundaries. |
| TASK-002 | Sidebar Navigation | Implement primary sidebar navigation for workspace, projects, editor, jobs, and settings. |
| TASK-003 | Top Bar | Implement top bar with page title, actions, and user/workspace area placeholder. |
| TASK-004 | Breadcrumbs | Implement breadcrumb model and breadcrumb rendering. |
| TASK-005 | Navigation Config | Define typed navigation configuration and route metadata. |
| TASK-006 | Responsive Navigation | Implement responsive navigation behavior for desktop and smaller screens. |
| TASK-007 | Command Menu Boundary | Implement command menu UI boundary without executing backend actions. |
| TASK-008 | Keyboard Shortcut Registry | Implement frontend shortcut registry for shell-level actions. |
| TASK-009 | Page Header | Implement reusable page header component for frontend pages. |
| TASK-010 | Action Slots | Implement typed action slot model for shell pages. |
| TASK-011 | Workspace Switcher Placeholder | Implement workspace switcher UI boundary with mockable data. |
| TASK-012 | User Menu Placeholder | Implement user menu UI boundary without auth provider coupling. |
| TASK-013 | Notification Entry Placeholder | Implement notification entry point placeholder for later notification integration. |
| TASK-014 | Shell Loading States | Implement loading states for app shell navigation. |
| TASK-015 | Shell Error States | Implement shell-level error UI surfaces. |
| TASK-016 | Navigation Tests | Add tests for navigation config, rendering, and active route behavior. |
| TASK-017 | Shell Accessibility | Ensure navigation landmarks, focus order, and keyboard behavior are accessible. |
| TASK-018 | Shell Public Boundary | Finalize shell component exports and internal boundaries. |

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
