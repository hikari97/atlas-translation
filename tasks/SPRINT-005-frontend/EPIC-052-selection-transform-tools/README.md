---
title: EPIC-052-selection-transform-tools
status: Completed
sprint: SPRINT-005-frontend
area: selection-transform-tools
owner: H.Makki
created_at: 2026-07-05
updated_at: 2026-07-05
---

# EPIC-052-selection-transform-tools

## Purpose

Implement selection, transform, snapping, guides, handles, keyboard movement, and bounding box tools for editor objects.

## Scope

Frontend-only implementation for `selection-transform-tools`.

## Dependencies

- EPIC-049-canvas-konva-renderer
- EPIC-051-layer-panel-ui

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
| TASK-001 | Selection Tool Foundation | Ready |
| TASK-002 | Selection Hit Flow | Ready |
| TASK-003 | Multi Select | Ready |
| TASK-004 | Bounding Box | Ready |
| TASK-005 | Transform Handles | Ready |
| TASK-006 | Drag Move | Ready |
| TASK-007 | Resize Transform | Ready |
| TASK-008 | Rotate Transform | Ready |
| TASK-009 | Keyboard Nudge | Ready |
| TASK-010 | Snapping | Ready |
| TASK-011 | Guides | Ready |
| TASK-012 | Transform Constraints | Ready |
| TASK-013 | Command Boundary | Ready |
| TASK-014 | Selection State Tests | Ready |
| TASK-015 | Selection UI Tests | Ready |
| TASK-016 | Selection Accessibility | Ready |
| TASK-017 | Selection Performance | Ready |
| TASK-018 | Selection Public Boundary | Ready |
