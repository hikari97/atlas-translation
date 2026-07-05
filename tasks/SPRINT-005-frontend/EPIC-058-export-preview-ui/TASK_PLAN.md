# TASK_PLAN — EPIC-058-export-preview-ui

## Epic

Area: `export-preview-ui`

Purpose: Implement export preview UI for pages, formats, validation, quality warnings, progress, and download-ready states.

## Dependencies

- EPIC-048-editor-shell-layout
- EPIC-057-ai-workflow-job-ui

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
| TASK-001 | Export Preview Panel | Create export preview panel/route boundary. |
| TASK-002 | Format Selection | Implement export format selection for PNG, JPG, WEBP, PDF, CBZ, ZIP, and project archive UI. |
| TASK-003 | Page Range Selection | Implement page range and selected pages UI. |
| TASK-004 | Quality Settings | Implement quality, scale, compression, and output option controls. |
| TASK-005 | Preview Grid | Implement export preview grid for pages. |
| TASK-006 | Single Page Preview | Implement single page preview surface. |
| TASK-007 | Export Validation | Implement frontend validation warnings for missing translations, overflow, low quality, and hidden layers. |
| TASK-008 | Start Export UI | Implement export job start action boundary. |
| TASK-009 | Export Progress | Implement export progress display and status updates. |
| TASK-010 | Export Result | Implement completed export result and download-ready UI boundary. |
| TASK-011 | Export Error States | Implement export failure, retry, and partial result UI. |
| TASK-012 | Export Presets | Implement export preset selection and save/apply UI boundary. |
| TASK-013 | Export Data Hooks | Integrate export UI with frontend data access and job boundaries. |
| TASK-014 | Export Mock Data | Add deterministic export fixtures. |
| TASK-015 | Export UI Tests | Add tests for settings, validation, preview, and job states. |
| TASK-016 | Export Accessibility | Ensure format controls and preview actions are accessible. |
| TASK-017 | Export Responsive Layout | Ensure export preview works across viewport sizes. |
| TASK-018 | Export Public Boundary | Finalize export preview feature exports and internal boundaries. |

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
