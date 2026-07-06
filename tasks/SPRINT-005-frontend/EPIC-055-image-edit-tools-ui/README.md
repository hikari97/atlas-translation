---
title: EPIC-055-image-edit-tools-ui
status: Completed
sprint: SPRINT-005-frontend
area: image-edit-tools-ui
owner: H.Makki
created_at: 2026-07-05
updated_at: 2026-07-05
---

# EPIC-055-image-edit-tools-ui

## Purpose

Implement image editing UI boundaries for brush, eraser, mask, restore, crop, inpainting request, and non-destructive tool state.

## Scope

Frontend-only implementation for `image-edit-tools-ui`.

## Dependencies

- EPIC-049-canvas-konva-renderer
- EPIC-052-selection-transform-tools

## Deliverables

```txt
apps/web/**
```

## Acceptance Criteria

- All task files are implemented sequentially.
- Frontend code remains accessible, type-safe, and deterministic.
- UI does not call backend/database/provider code directly.
- No forbidden paths are modified.
- Tests and typecheck/build commands pass where available.

## Related Documents

- README.MD
- AGENTS.md
- CONSTITUTION.md
- DO_NOT_BREAK.md
- tasks/README.md
- tasks/templates/TASK_TEMPLATE.md

## Tasks

| Task | Title | Status |
|---|---|---|
| TASK-001 | Image Tools Foundation | Ready |
| TASK-002 | Brush Tool UI | Ready |
| TASK-003 | Eraser Tool UI | Ready |
| TASK-004 | Mask Tool UI | Ready |
| TASK-005 | Restore Tool UI | Ready |
| TASK-006 | Crop Tool UI | Ready |
| TASK-007 | Image Transform Controls | Ready |
| TASK-008 | Inpainting Request UI | Ready |
| TASK-009 | Tool Cursor Preview | Ready |
| TASK-010 | Tool History Boundary | Ready |
| TASK-011 | Layer Integration | Ready |
| TASK-012 | Tool Settings Persistence | Ready |
| TASK-013 | Tool Progress State | Ready |
| TASK-014 | Tool Mock Data | Ready |
| TASK-015 | Image Tool Tests | Ready |
| TASK-016 | Image Tool Accessibility | Ready |
| TASK-017 | Performance Boundary | Ready |
| TASK-018 | Image Tools Public Boundary | Ready |
