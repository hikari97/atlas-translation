---
title: EPIC-048-editor-shell-layout
status: Completed
sprint: SPRINT-005-frontend
area: editor-shell-layout
owner: H.Makki
created_at: 2026-07-05
updated_at: 2026-07-05
---

# EPIC-048-editor-shell-layout

## Purpose

Implement the editor application shell with panels, toolbar, canvas area, inspector area, timeline/status, and resizable layout.

## Scope

Frontend-only implementation for `editor-shell-layout`.

## Dependencies

- EPIC-043-web-app-shell-navigation
- EPIC-044-web-state-data-access
- EPIC-047-asset-import-library-ui

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
| TASK-001 | Editor Route | Ready |
| TASK-002 | Editor Shell Layout | Ready |
| TASK-003 | Panel System | Ready |
| TASK-004 | Resizable Panels | Ready |
| TASK-005 | Editor Toolbar | Ready |
| TASK-006 | Status Bar | Ready |
| TASK-007 | Inspector Shell | Ready |
| TASK-008 | Left Panel Shell | Ready |
| TASK-009 | Viewport State | Ready |
| TASK-010 | Selection State | Ready |
| TASK-011 | Command Dispatch Boundary | Ready |
| TASK-012 | Undo Redo UI Boundary | Ready |
| TASK-013 | Editor Loading Error States | Ready |
| TASK-014 | Mock Editor Document | Ready |
| TASK-015 | Editor Shell Tests | Ready |
| TASK-016 | Editor Accessibility | Ready |
| TASK-017 | Editor Responsive Layout | Ready |
| TASK-018 | Editor Public Boundary | Ready |
