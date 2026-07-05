# TASK_PLAN — EPIC-050-page-navigation-thumbnails

## Epic

Area: `page-navigation-thumbnails`

Purpose: Implement page navigation UI, thumbnails, page status, page ordering, and editor page switching.

## Dependencies

- EPIC-048-editor-shell-layout
- EPIC-049-canvas-konva-renderer

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
| TASK-001 | Pages Panel | Create pages panel inside editor left panel. |
| TASK-002 | Thumbnail Card | Implement thumbnail card component with image, page number, and status. |
| TASK-003 | Thumbnail List | Implement virtual-friendly page thumbnail list. |
| TASK-004 | Page Selection | Implement page selection and active page state integration. |
| TASK-005 | Page Navigation Shortcuts | Implement previous/next page keyboard shortcut boundary. |
| TASK-006 | Page Status Badges | Implement status badges for imported, OCR, translated, reviewed, and exported states. |
| TASK-007 | Page Reorder UI | Implement page reorder UI boundary. |
| TASK-008 | Page Context Menu | Implement page context menu actions boundary. |
| TASK-009 | Page Filtering | Implement filters for page status and search. |
| TASK-010 | Page Bulk Selection | Implement bulk page selection UI. |
| TASK-011 | Page Loading Error | Implement loading, missing thumbnail, and error states. |
| TASK-012 | Thumbnail Cache Boundary | Define frontend thumbnail cache boundary without backend storage coupling. |
| TASK-013 | Page Data Hooks | Integrate page navigation with frontend data access boundary. |
| TASK-014 | Page Mock Data | Add deterministic page and thumbnail fixtures. |
| TASK-015 | Page Navigation Tests | Add tests for selection, navigation, and status UI. |
| TASK-016 | Page Accessibility | Ensure thumbnail list and page actions are keyboard-accessible. |
| TASK-017 | Page Responsive Behavior | Ensure page panel is usable in narrow editor layouts. |
| TASK-018 | Page Public Boundary | Finalize page navigation exports and internal boundaries. |

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
