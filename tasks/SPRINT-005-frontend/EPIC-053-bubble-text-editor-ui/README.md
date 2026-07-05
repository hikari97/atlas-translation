---
title: EPIC-053-bubble-text-editor-ui
status: Completed
sprint: SPRINT-005-frontend
area: bubble-text-editor-ui
owner: H.Makki
created_at: 2026-07-05
updated_at: 2026-07-05
---

# EPIC-053-bubble-text-editor-ui

## Purpose

Implement UI for editing speech bubbles, original text, translated text, text boxes, bubble metadata, and review status.

## Scope

Frontend-only implementation for `bubble-text-editor-ui`.

## Dependencies

- EPIC-049-canvas-konva-renderer
- EPIC-052-selection-transform-tools

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
| TASK-001 | Bubble Editor Foundation | Ready |
| TASK-002 | Bubble List Panel | Ready |
| TASK-003 | Bubble Detail Inspector | Ready |
| TASK-004 | Original Text Field | Ready |
| TASK-005 | Translated Text Field | Ready |
| TASK-006 | Language Metadata | Ready |
| TASK-007 | Bubble Status Workflow | Ready |
| TASK-008 | Canvas Selection Link | Ready |
| TASK-009 | Create Edit Bubble | Ready |
| TASK-010 | Delete Restore Bubble | Ready |
| TASK-011 | Confidence UI | Ready |
| TASK-012 | Comments Notes | Ready |
| TASK-013 | Batch Actions | Ready |
| TASK-014 | Bubble Data Hooks | Ready |
| TASK-015 | Bubble Mock Data | Ready |
| TASK-016 | Bubble Editor Tests | Ready |
| TASK-017 | Bubble Accessibility | Ready |
| TASK-018 | Bubble Public Boundary | Ready |
