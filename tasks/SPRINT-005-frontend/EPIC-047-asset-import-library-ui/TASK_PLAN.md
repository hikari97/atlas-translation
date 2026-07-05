# TASK_PLAN — EPIC-047-asset-import-library-ui

## Epic

Area: `asset-import-library-ui`

Purpose: Implement asset import and library UI for pages, images, upload states, validation, ordering, and metadata.

## Dependencies

- EPIC-046-project-management-ui

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
| TASK-001 | Asset Library Route | Create asset library route and project integration. |
| TASK-002 | Upload Dropzone | Implement drag/drop and file picker UI boundary. |
| TASK-003 | File Validation UI | Implement frontend file validation messages and constraints. |
| TASK-004 | Upload Queue UI | Implement upload queue display and progress states. |
| TASK-005 | Import Preview | Implement preview cards for imported images/pages. |
| TASK-006 | Page Ordering | Implement page reorder UI boundary. |
| TASK-007 | Page Metadata | Implement metadata editor for page number, size, status, and notes. |
| TASK-008 | Library Grid | Implement image/page grid UI. |
| TASK-009 | Library List | Implement list/table view for asset library. |
| TASK-010 | Bulk Actions | Implement select, reorder, remove, and status update bulk UI. |
| TASK-011 | Empty Error States | Implement empty, invalid, and failed import states. |
| TASK-012 | Asset Data Hooks | Integrate asset UI with frontend data access boundaries. |
| TASK-013 | Asset Mock Data | Add deterministic mock asset data and file fixtures. |
| TASK-014 | Image Loading | Implement safe image loading, placeholder, and fallback behavior. |
| TASK-015 | Asset UI Tests | Add upload UI, ordering, and library component tests. |
| TASK-016 | Asset Accessibility | Ensure file input, keyboard selection, and action menus are accessible. |
| TASK-017 | Asset Responsive Layout | Ensure asset library works across viewport sizes. |
| TASK-018 | Asset Public Boundary | Finalize asset feature exports and internal boundaries. |

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
