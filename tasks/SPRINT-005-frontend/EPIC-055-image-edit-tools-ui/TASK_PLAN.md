# TASK_PLAN — EPIC-055-image-edit-tools-ui

## Epic

Area: `image-edit-tools-ui`

Purpose: Implement image editing UI boundaries for brush, eraser, mask, restore, crop, inpainting request, and non-destructive tool state.

## Dependencies

- EPIC-049-canvas-konva-renderer
- EPIC-052-selection-transform-tools

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
| TASK-001 | Image Tools Foundation | Create image edit tools feature boundary. |
| TASK-002 | Brush Tool UI | Implement brush tool controls for size, hardness, opacity, and mode. |
| TASK-003 | Eraser Tool UI | Implement eraser tool controls and canvas interaction boundary. |
| TASK-004 | Mask Tool UI | Implement mask painting controls and overlay visibility. |
| TASK-005 | Restore Tool UI | Implement restore-original-pixels tool UI boundary. |
| TASK-006 | Crop Tool UI | Implement crop rectangle UI and confirmation boundary. |
| TASK-007 | Image Transform Controls | Implement rotate, flip, scale, and reset controls. |
| TASK-008 | Inpainting Request UI | Implement inpainting prompt/request UI boundary without running AI. |
| TASK-009 | Tool Cursor Preview | Implement brush/eraser cursor preview on canvas. |
| TASK-010 | Tool History Boundary | Expose tool actions through editor command boundary for undo/redo later. |
| TASK-011 | Layer Integration | Connect image tools to layer visibility/lock constraints. |
| TASK-012 | Tool Settings Persistence | Persist user tool preferences safely in frontend state. |
| TASK-013 | Tool Progress State | Implement processing/progress states for image edit operations. |
| TASK-014 | Tool Mock Data | Add deterministic tool fixtures and canvas mocks. |
| TASK-015 | Image Tool Tests | Add tests for controls, state, and constraints. |
| TASK-016 | Image Tool Accessibility | Ensure tool controls and shortcuts are accessible. |
| TASK-017 | Performance Boundary | Add guardrails for canvas interaction frequency and render updates. |
| TASK-018 | Image Tools Public Boundary | Finalize image edit tool feature exports and internal boundaries. |

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
