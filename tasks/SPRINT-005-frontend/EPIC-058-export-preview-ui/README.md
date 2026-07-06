---
title: EPIC-058-export-preview-ui
status: Completed
sprint: SPRINT-005-frontend
area: export-preview-ui
owner: H.Makki
created_at: 2026-07-05
updated_at: 2026-07-05
---

# EPIC-058-export-preview-ui

## Purpose

Implement export preview UI for pages, formats, validation, quality warnings, progress, and download-ready states.

## Scope

Frontend-only implementation for `export-preview-ui`.

## Dependencies

- EPIC-048-editor-shell-layout
- EPIC-057-ai-workflow-job-ui

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
| TASK-001 | Export Preview Panel | Ready |
| TASK-002 | Format Selection | Ready |
| TASK-003 | Page Range Selection | Ready |
| TASK-004 | Quality Settings | Ready |
| TASK-005 | Preview Grid | Ready |
| TASK-006 | Single Page Preview | Ready |
| TASK-007 | Export Validation | Ready |
| TASK-008 | Start Export UI | Ready |
| TASK-009 | Export Progress | Ready |
| TASK-010 | Export Result | Ready |
| TASK-011 | Export Error States | Ready |
| TASK-012 | Export Presets | Ready |
| TASK-013 | Export Data Hooks | Ready |
| TASK-014 | Export Mock Data | Ready |
| TASK-015 | Export UI Tests | Ready |
| TASK-016 | Export Accessibility | Ready |
| TASK-017 | Export Responsive Layout | Ready |
| TASK-018 | Export Public Boundary | Ready |
