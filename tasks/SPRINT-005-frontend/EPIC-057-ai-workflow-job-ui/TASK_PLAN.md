# TASK_PLAN — EPIC-057-ai-workflow-job-ui

## Epic

Area: `ai-workflow-job-ui`

Purpose: Implement frontend UI for AI workflow jobs such as OCR, translation, review, inpainting, progress tracking, logs, and retry controls.

## Dependencies

- EPIC-044-web-state-data-access
- EPIC-056-translation-workbench-ui

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
| TASK-001 | AI Job Panel | Create AI workflow/job panel boundary. |
| TASK-002 | AI Job Model UI | Define frontend job display model for OCR, translation, review, export, and inpainting. |
| TASK-003 | Job List | Implement AI job list with status, progress, and timestamps. |
| TASK-004 | Job Detail | Implement job detail drawer/panel with logs and metadata. |
| TASK-005 | Progress UI | Implement progress bar, stepper, and partial result display. |
| TASK-006 | Job Actions | Implement start, cancel, retry, pause/resume placeholder actions. |
| TASK-007 | OCR Action UI | Implement OCR action entry points for selected pages/bubbles. |
| TASK-008 | Translation Action UI | Implement translation action entry points for selected text/pages. |
| TASK-009 | AI Review Action UI | Implement AI review action entry points and result display boundary. |
| TASK-010 | Inpainting Action UI | Implement inpainting job entry points from image tools. |
| TASK-011 | Job Logs | Implement structured log display UI. |
| TASK-012 | Job Error States | Implement job failure, partial failure, and retryable error UI. |
| TASK-013 | Job Data Hooks | Integrate job UI with frontend data access and mock adapters. |
| TASK-014 | Job Notifications Boundary | Expose frontend notification hooks for job completion/failure without backend coupling. |
| TASK-015 | Job Mock Data | Add deterministic AI job fixtures. |
| TASK-016 | AI Job Tests | Add tests for job list, detail, actions, and error states. |
| TASK-017 | AI Job Accessibility | Ensure progress, logs, and controls are accessible. |
| TASK-018 | AI Job Public Boundary | Finalize AI workflow job feature exports and internal boundaries. |

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
