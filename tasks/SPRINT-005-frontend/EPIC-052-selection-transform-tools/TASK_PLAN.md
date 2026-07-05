# TASK_PLAN — EPIC-052-selection-transform-tools

## Epic

Area: `selection-transform-tools`

Purpose: Implement selection, transform, snapping, guides, handles, keyboard movement, and bounding box tools for editor objects.

## Dependencies

- EPIC-049-canvas-konva-renderer
- EPIC-051-layer-panel-ui

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
| TASK-001 | Selection Tool Foundation | Create selection tool model and editor tool boundary. |
| TASK-002 | Selection Hit Flow | Connect canvas hit testing to selection state. |
| TASK-003 | Multi Select | Implement additive and range-like multi-selection behavior. |
| TASK-004 | Bounding Box | Implement bounding box calculation and rendering boundary. |
| TASK-005 | Transform Handles | Implement resize/rotate handle UI boundaries. |
| TASK-006 | Drag Move | Implement drag move behavior and coordinate updates. |
| TASK-007 | Resize Transform | Implement resize transform calculations. |
| TASK-008 | Rotate Transform | Implement rotate transform calculations. |
| TASK-009 | Keyboard Nudge | Implement keyboard movement and larger step movement. |
| TASK-010 | Snapping | Implement snap-to-object, snap-to-page, and snap-to-guide calculations. |
| TASK-011 | Guides | Implement guide rendering and alignment hints. |
| TASK-012 | Transform Constraints | Implement locked/aspect/min-size constraint behavior. |
| TASK-013 | Command Boundary | Expose selection transforms through editor command boundary. |
| TASK-014 | Selection State Tests | Add tests for selection model and calculations. |
| TASK-015 | Selection UI Tests | Add tests for hit flow, handles, and keyboard behavior where feasible. |
| TASK-016 | Selection Accessibility | Add keyboard-accessible selection interactions and labels. |
| TASK-017 | Selection Performance | Optimize transform calculations for multiple objects. |
| TASK-018 | Selection Public Boundary | Finalize selection feature exports and internal boundaries. |

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
