# TASK_PLAN — EPIC-056-translation-workbench-ui

## Epic

Area: `translation-workbench-ui`

Purpose: Implement translation workbench UI for source/target text, glossary, memory suggestions, review states, batch editing, and QA warnings.

## Dependencies

- EPIC-053-bubble-text-editor-ui
- EPIC-054-typography-style-editor-ui

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
| TASK-001 | Translation Workbench Panel | Create translation workbench panel/route boundary. |
| TASK-002 | Segment List | Implement translation segment list for page/project text. |
| TASK-003 | Source Target Editor | Implement paired source and target text editor UI. |
| TASK-004 | Status Workflow | Implement draft, translated, reviewed, approved, and needs-work statuses. |
| TASK-005 | Glossary Panel | Implement glossary suggestion UI boundary. |
| TASK-006 | Translation Memory Panel | Implement translation memory suggestion UI boundary. |
| TASK-007 | Batch Edit | Implement batch edit, apply, and status update UI boundaries. |
| TASK-008 | Search Filter | Implement filtering by text, status, confidence, and warnings. |
| TASK-009 | Keyboard Shortcuts | Implement translator-focused keyboard shortcuts. |
| TASK-010 | Side By Side View | Implement side-by-side original/translated comparison UI. |
| TASK-011 | Page Sync | Synchronize workbench selection with editor page/bubble selection. |
| TASK-012 | Quality Warnings | Display length, empty, mismatch, and style warning UI. |
| TASK-013 | Review Comments | Implement reviewer comment and note UI boundary. |
| TASK-014 | Translation Data Hooks | Integrate workbench with frontend state/data boundary. |
| TASK-015 | Translation Mock Data | Add deterministic translation fixtures. |
| TASK-016 | Translation Workbench Tests | Add tests for segment editing, status updates, filters, and sync. |
| TASK-017 | Translation Accessibility | Ensure editor fields and shortcuts are accessible. |
| TASK-018 | Translation Public Boundary | Finalize translation workbench feature exports and internal boundaries. |

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
