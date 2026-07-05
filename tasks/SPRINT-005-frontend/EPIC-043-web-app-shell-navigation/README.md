---
title: EPIC-043-web-app-shell-navigation
status: Completed
sprint: SPRINT-005-frontend
area: web-app-shell-navigation
owner: H.Makki
created_at: 2026-07-05
updated_at: 2026-07-05
---

# EPIC-043-web-app-shell-navigation

## Purpose

Implement the frontend application shell, navigation, sidebar, top bar, breadcrumbs, and command entry points.

## Scope

Frontend-only implementation for `web-app-shell-navigation`.

## Dependencies

- EPIC-041-web-app-foundation
- EPIC-042-atlas-ui-design-system

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
| TASK-001 | Shell Route Groups | Ready |
| TASK-002 | Sidebar Navigation | Ready |
| TASK-003 | Top Bar | Ready |
| TASK-004 | Breadcrumbs | Ready |
| TASK-005 | Navigation Config | Ready |
| TASK-006 | Responsive Navigation | Ready |
| TASK-007 | Command Menu Boundary | Ready |
| TASK-008 | Keyboard Shortcut Registry | Ready |
| TASK-009 | Page Header | Ready |
| TASK-010 | Action Slots | Ready |
| TASK-011 | Workspace Switcher Placeholder | Ready |
| TASK-012 | User Menu Placeholder | Ready |
| TASK-013 | Notification Entry Placeholder | Ready |
| TASK-014 | Shell Loading States | Ready |
| TASK-015 | Shell Error States | Ready |
| TASK-016 | Navigation Tests | Ready |
| TASK-017 | Shell Accessibility | Ready |
| TASK-018 | Shell Public Boundary | Ready |
