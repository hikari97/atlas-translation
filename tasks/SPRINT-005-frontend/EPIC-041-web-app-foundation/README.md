---
title: EPIC-041-web-app-foundation
status: Completed
sprint: SPRINT-005-frontend
area: web-app-foundation
owner: H.Makki
created_at: 2026-07-05
updated_at: 2026-07-05
---

# EPIC-041-web-app-foundation

## Purpose

Establish the frontend application foundation for Atlas Studio web UI.

## Scope

Frontend-only implementation for `web-app-foundation`.

## Dependencies

- None

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
| TASK-001 | Web Package Foundation | Ready |
| TASK-002 | Next.js Configuration | Ready |
| TASK-003 | TypeScript Configuration | Ready |
| TASK-004 | Frontend Folder Structure | Ready |
| TASK-005 | Root Layout | Ready |
| TASK-006 | Provider Shell | Ready |
| TASK-007 | Route Foundation | Ready |
| TASK-008 | Error Boundary | Ready |
| TASK-009 | Loading Empty States | Ready |
| TASK-010 | Frontend Env Boundary | Ready |
| TASK-011 | Assets And Fonts | Ready |
| TASK-012 | Frontend Test Setup | Ready |
| TASK-013 | Frontend Smoke Surface | Ready |
| TASK-014 | Frontend Build Scripts | Ready |
| TASK-015 | Frontend Import Rules | Ready |
| TASK-016 | Basic Routing Tests | Ready |
| TASK-017 | Foundation Notes | Ready |
| TASK-018 | Foundation Public Boundary | Ready |
