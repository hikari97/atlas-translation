# TASK_PLAN — EPIC-053-bubble-text-editor-ui

## Epic

Area: `bubble-text-editor-ui`

Purpose: Implement UI for editing speech bubbles, original text, translated text, text boxes, bubble metadata, and review status.

## Dependencies

- EPIC-049-canvas-konva-renderer
- EPIC-052-selection-transform-tools

## Codex Implementation Rule

Do not implement all tasks at once.

Use these batches:

```txt
TASK-001 to TASK-004
TASK-005 to TASK-008
TASK-009 to TASK-012
TASK-013 to TASK-016
TASK-017 to TASK-018
```

Stop immediately if validation fails.

## Task List

| Task | Title | Goal |
|---|---|---|
| TASK-001 | Bubble Editor Foundation | Create bubble/text editor feature boundary. |
| TASK-002 | Bubble List Panel | Implement bubble list panel with status and ordering. |
| TASK-003 | Bubble Detail Inspector | Implement inspector UI for selected bubble metadata. |
| TASK-004 | Original Text Field | Implement original OCR text display/edit field boundary. |
| TASK-005 | Translated Text Field | Implement translated text editor field. |
| TASK-006 | Language Metadata | Implement source/target language metadata UI. |
| TASK-007 | Bubble Status Workflow | Implement statuses for detected, OCR, translated, reviewed, approved. |
| TASK-008 | Canvas Selection Link | Link bubble list/inspector with canvas selection state. |
| TASK-009 | Create Edit Bubble | Implement create/edit bubble UI boundary. |
| TASK-010 | Delete Restore Bubble | Implement delete/restore confirmation UI boundary. |
| TASK-011 | Confidence UI | Display OCR/translation confidence and warning indicators. |
| TASK-012 | Comments Notes | Implement notes/comments UI boundary for translation review. |
| TASK-013 | Batch Actions | Implement batch status and selection actions. |
| TASK-014 | Bubble Data Hooks | Integrate bubble editor with frontend state/data access boundary. |
| TASK-015 | Bubble Mock Data | Add deterministic bubble/text fixtures. |
| TASK-016 | Bubble Editor Tests | Add tests for list, inspector, text editing, and selection sync. |
| TASK-017 | Bubble Accessibility | Ensure text fields, lists, and status actions are accessible. |
| TASK-018 | Bubble Public Boundary | Finalize bubble editor feature exports and internal boundaries. |

## Standard Prompt

```txt
Read README.md, TASK_PLAN.md, and the task files for the current batch.

Implement only the current batch.
Work sequentially.
Before each task, read the full task file.
Only modify Files Allowed.
Do not modify Files Forbidden.
Add or update tests.
Run available validation commands.
Stop on validation failure.
Report files changed, tests run, validation results, and unfinished items.
```
