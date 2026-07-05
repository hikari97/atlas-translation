---
title: EPIC-057-ai-workflow-job-ui
status: Ready
sprint: SPRINT-005-frontend
area: ai-workflow-job-ui
owner: H.Makki
created_at: 2026-07-05
updated_at: 2026-07-05
---

# EPIC-057-ai-workflow-job-ui

## Purpose

Implement frontend UI for AI workflow jobs such as OCR, translation, review, inpainting, progress tracking, logs, and retry controls.

## Scope

Frontend-only implementation for `ai-workflow-job-ui`.

## Dependencies

- EPIC-044-web-state-data-access
- EPIC-056-translation-workbench-ui

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
| TASK-001 | AI Job Panel | Ready |
| TASK-002 | AI Job Model UI | Ready |
| TASK-003 | Job List | Ready |
| TASK-004 | Job Detail | Ready |
| TASK-005 | Progress UI | Ready |
| TASK-006 | Job Actions | Ready |
| TASK-007 | OCR Action UI | Ready |
| TASK-008 | Translation Action UI | Ready |
| TASK-009 | AI Review Action UI | Ready |
| TASK-010 | Inpainting Action UI | Ready |
| TASK-011 | Job Logs | Ready |
| TASK-012 | Job Error States | Ready |
| TASK-013 | Job Data Hooks | Ready |
| TASK-014 | Job Notifications Boundary | Ready |
| TASK-015 | Job Mock Data | Ready |
| TASK-016 | AI Job Tests | Ready |
| TASK-017 | AI Job Accessibility | Ready |
| TASK-018 | AI Job Public Boundary | Ready |
