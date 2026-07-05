---
title: EPIC-047-asset-import-library-ui
status: Ready
sprint: SPRINT-005-frontend
area: asset-import-library-ui
owner: H.Makki
created_at: 2026-07-05
updated_at: 2026-07-05
---

# EPIC-047-asset-import-library-ui

## Purpose

Implement asset import and library UI for pages, images, upload states, validation, ordering, and metadata.

## Scope

Frontend-only implementation for `asset-import-library-ui`.

## Dependencies

- EPIC-046-project-management-ui

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
| TASK-001 | Asset Library Route | Ready |
| TASK-002 | Upload Dropzone | Ready |
| TASK-003 | File Validation UI | Ready |
| TASK-004 | Upload Queue UI | Ready |
| TASK-005 | Import Preview | Ready |
| TASK-006 | Page Ordering | Ready |
| TASK-007 | Page Metadata | Ready |
| TASK-008 | Library Grid | Ready |
| TASK-009 | Library List | Ready |
| TASK-010 | Bulk Actions | Ready |
| TASK-011 | Empty Error States | Ready |
| TASK-012 | Asset Data Hooks | Ready |
| TASK-013 | Asset Mock Data | Ready |
| TASK-014 | Image Loading | Ready |
| TASK-015 | Asset UI Tests | Ready |
| TASK-016 | Asset Accessibility | Ready |
| TASK-017 | Asset Responsive Layout | Ready |
| TASK-018 | Asset Public Boundary | Ready |
