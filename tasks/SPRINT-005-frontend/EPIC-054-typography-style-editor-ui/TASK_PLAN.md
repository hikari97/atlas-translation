# TASK_PLAN — EPIC-054-typography-style-editor-ui

## Epic

Area: `typography-style-editor-ui`

Purpose: Implement typography and style editor UI for font, size, layout, stroke, shadow, direction, alignment, and presets.

## Dependencies

- EPIC-053-bubble-text-editor-ui

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
| TASK-001 | Typography Inspector | Create typography inspector panel for selected text objects. |
| TASK-002 | Font Family Control | Implement font family selection UI boundary. |
| TASK-003 | Font Size Control | Implement font size and line-height controls. |
| TASK-004 | Weight Style Controls | Implement weight, italic, underline, and casing controls. |
| TASK-005 | Alignment Controls | Implement horizontal and vertical alignment controls. |
| TASK-006 | Text Direction Controls | Implement horizontal/vertical/RTL direction controls. |
| TASK-007 | Stroke Fill Controls | Implement text fill, stroke, and opacity controls. |
| TASK-008 | Shadow Controls | Implement shadow controls and preview state. |
| TASK-009 | Spacing Controls | Implement letter spacing, word spacing, and paragraph spacing controls. |
| TASK-010 | Text Box Fit Controls | Implement fit, wrap, shrink, overflow, and padding controls. |
| TASK-011 | Typography Presets | Implement style preset selection and application boundary. |
| TASK-012 | Style Preview | Implement live style preview integration with canvas text rendering. |
| TASK-013 | Batch Apply | Implement batch style apply UI boundary. |
| TASK-014 | State Integration | Integrate typography controls with editor state and command boundary. |
| TASK-015 | Typography Mock Data | Add deterministic text style fixtures. |
| TASK-016 | Typography Tests | Add tests for controls, style updates, and preview behavior. |
| TASK-017 | Typography Accessibility | Ensure controls are labelled and keyboard accessible. |
| TASK-018 | Typography Public Boundary | Finalize typography feature exports and internal boundaries. |

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
