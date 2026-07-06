---
title: EPIC-056-translation-workbench-ui
status: Completed
sprint: SPRINT-005-frontend
area: translation-workbench-ui
owner: H.Makki
created_at: 2026-07-05
updated_at: 2026-07-05
---

# EPIC-056-translation-workbench-ui

## Purpose

Implement translation workbench UI for source/target text, glossary, memory suggestions, review states, batch editing, and QA warnings.

## Scope

Frontend-only implementation for `translation-workbench-ui`.

## Dependencies

- EPIC-053-bubble-text-editor-ui
- EPIC-054-typography-style-editor-ui

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
| TASK-001 | Translation Workbench Panel | Ready |
| TASK-002 | Segment List | Ready |
| TASK-003 | Source Target Editor | Ready |
| TASK-004 | Status Workflow | Ready |
| TASK-005 | Glossary Panel | Ready |
| TASK-006 | Translation Memory Panel | Ready |
| TASK-007 | Batch Edit | Ready |
| TASK-008 | Search Filter | Ready |
| TASK-009 | Keyboard Shortcuts | Ready |
| TASK-010 | Side By Side View | Ready |
| TASK-011 | Page Sync | Ready |
| TASK-012 | Quality Warnings | Ready |
| TASK-013 | Review Comments | Ready |
| TASK-014 | Translation Data Hooks | Ready |
| TASK-015 | Translation Mock Data | Ready |
| TASK-016 | Translation Workbench Tests | Ready |
| TASK-017 | Translation Accessibility | Ready |
| TASK-018 | Translation Public Boundary | Ready |
