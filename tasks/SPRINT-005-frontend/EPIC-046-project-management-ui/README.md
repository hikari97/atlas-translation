---
title: EPIC-046-project-management-ui
status: Ready
sprint: SPRINT-005-frontend
area: project-management-ui
owner: H.Makki
created_at: 2026-07-05
updated_at: 2026-07-05
---

# EPIC-046-project-management-ui

## Purpose

Implement frontend screens for project listing, creation, metadata, settings, and basic lifecycle actions.

## Scope

Frontend-only implementation for `project-management-ui`.

## Dependencies

- EPIC-043-web-app-shell-navigation
- EPIC-044-web-state-data-access

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
| TASK-001 | Projects Route | Ready |
| TASK-002 | Projects List | Ready |
| TASK-003 | Project Filters Sorting | Ready |
| TASK-004 | Create Project Flow | Ready |
| TASK-005 | Edit Project Metadata | Ready |
| TASK-006 | Project Detail Route | Ready |
| TASK-007 | Project Overview | Ready |
| TASK-008 | Project Settings | Ready |
| TASK-009 | Archive Delete UI | Ready |
| TASK-010 | Project Progress | Ready |
| TASK-011 | Language Settings | Ready |
| TASK-012 | Collaboration Placeholder | Ready |
| TASK-013 | Project Data Hooks | Ready |
| TASK-014 | Project Mock Data | Ready |
| TASK-015 | Project UI Tests | Ready |
| TASK-016 | Project Accessibility | Ready |
| TASK-017 | Project Responsive Layout | Ready |
| TASK-018 | Project Public Boundary | Ready |
