# TASK_PLAN — EPIC-049-canvas-konva-renderer

## Epic

Area: `canvas-konva-renderer`

Purpose: Implement Konva-based canvas rendering for pages, image layers, bubble overlays, text overlays, viewport, and hit testing.

## Dependencies

- EPIC-048-editor-shell-layout

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
| TASK-001 | Konva Canvas Foundation | Create Konva canvas component boundary and lazy-safe rendering setup. |
| TASK-002 | Stage Layer Model | Define canvas stage/layer model for background, artwork, bubbles, text, selections, and overlays. |
| TASK-003 | Image Rendering | Implement page image rendering with loading and fallback behavior. |
| TASK-004 | Viewport Transform | Implement zoom, pan, fit-to-screen, and reset viewport controls. |
| TASK-005 | Coordinate System | Implement conversion between screen, stage, page, and normalized coordinates. |
| TASK-006 | Bubble Overlay Rendering | Render bubble polygons/rectangles/ellipses as overlays. |
| TASK-007 | Text Overlay Rendering | Render translated text overlays using current text box metadata. |
| TASK-008 | Selection Rendering | Render selection outlines and handles placeholders. |
| TASK-009 | Hit Testing | Implement hit testing for page objects and overlay objects. |
| TASK-010 | Cursor Tool State | Implement cursor and tool visual state handling. |
| TASK-011 | Grid Guides | Implement optional grid, guides, and alignment overlay rendering. |
| TASK-012 | Performance Boundary | Add memoization and render boundary rules for large pages. |
| TASK-013 | Snapshot Boundary | Define frontend snapshot/render capture boundary without final export pipeline. |
| TASK-014 | Canvas Error Boundary | Implement canvas-specific error and fallback states. |
| TASK-015 | Canvas Mock Fixtures | Add mock page/canvas fixtures for tests and development. |
| TASK-016 | Canvas Tests | Add tests for coordinate transforms, hit testing, and render boundaries. |
| TASK-017 | Canvas Accessibility | Provide accessible labels and keyboard-accessible object navigation boundaries. |
| TASK-018 | Canvas Public Boundary | Finalize canvas renderer exports and internal boundaries. |

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
