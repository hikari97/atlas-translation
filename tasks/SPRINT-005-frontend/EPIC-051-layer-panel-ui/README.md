---
title: EPIC-051-layer-panel-ui
status: Ready
sprint: SPRINT-005-frontend
area: layer-panel-ui
owner: H.Makki
created_at: 2026-07-05
updated_at: 2026-07-05
---

# EPIC-051-layer-panel-ui

## Purpose

Implement layer panel UI for image, bubble, text, mask, and overlay layers with ordering, visibility, locking, grouping, and selection.

## Scope

Frontend-only implementation for `layer-panel-ui`.

## Dependencies

- EPIC-048-editor-shell-layout
- EPIC-049-canvas-konva-renderer

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
| TASK-001 | Layers Panel | Ready |
| TASK-002 | Layer Model UI | Ready |
| TASK-003 | Layer Tree | Ready |
| TASK-004 | Layer Selection | Ready |
| TASK-005 | Layer Visibility | Ready |
| TASK-006 | Layer Locking | Ready |
| TASK-007 | Layer Ordering | Ready |
| TASK-008 | Layer Grouping | Ready |
| TASK-009 | Layer Renaming | Ready |
| TASK-010 | Layer Context Menu | Ready |
| TASK-011 | Layer Filtering | Ready |
| TASK-012 | Layer Bulk Actions | Ready |
| TASK-013 | Layer State Integration | Ready |
| TASK-014 | Layer Mock Data | Ready |
| TASK-015 | Layer Panel Tests | Ready |
| TASK-016 | Layer Accessibility | Ready |
| TASK-017 | Layer Responsive Behavior | Ready |
| TASK-018 | Layer Public Boundary | Ready |
