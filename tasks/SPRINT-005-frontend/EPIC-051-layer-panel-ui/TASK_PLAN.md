# TASK_PLAN — EPIC-051-layer-panel-ui

## Epic

Area: `layer-panel-ui`

Purpose: Implement layer panel UI for image, bubble, text, mask, and overlay layers with ordering, visibility, locking, grouping, and selection.

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
| TASK-001 | Layers Panel | Create layers panel inside editor shell. |
| TASK-002 | Layer Model UI | Define frontend layer display model and layer type labels/icons. |
| TASK-003 | Layer Tree | Implement layer tree/list rendering. |
| TASK-004 | Layer Selection | Integrate layer selection with editor selection state. |
| TASK-005 | Layer Visibility | Implement visibility toggles and visual states. |
| TASK-006 | Layer Locking | Implement lock/unlock UI boundaries. |
| TASK-007 | Layer Ordering | Implement layer reorder UI boundary. |
| TASK-008 | Layer Grouping | Implement group display and nested layer UI boundary. |
| TASK-009 | Layer Renaming | Implement inline rename UI for layers. |
| TASK-010 | Layer Context Menu | Implement context menu action boundary. |
| TASK-011 | Layer Filtering | Implement filtering by type, status, and search. |
| TASK-012 | Layer Bulk Actions | Implement bulk visibility/lock/delete action UI boundaries. |
| TASK-013 | Layer State Integration | Integrate layer panel with editor state boundary. |
| TASK-014 | Layer Mock Data | Add deterministic layer fixtures. |
| TASK-015 | Layer Panel Tests | Add tests for layer render, selection, visibility, and ordering. |
| TASK-016 | Layer Accessibility | Ensure layer tree roles, labels, and keyboard interaction are accessible. |
| TASK-017 | Layer Responsive Behavior | Ensure layer panel is usable in editor panel layouts. |
| TASK-018 | Layer Public Boundary | Finalize layer feature exports and internal boundaries. |

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
