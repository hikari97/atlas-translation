# TASK_PLAN — EPIC-060-frontend-quality-accessibility

## Epic

Area: `frontend-quality-accessibility`

Purpose: Harden frontend quality through accessibility, responsiveness, performance, error handling, testing, and maintainability checks.

## Dependencies

- EPIC-041-web-app-foundation
- EPIC-042-atlas-ui-design-system
- EPIC-048-editor-shell-layout

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
| TASK-001 | Accessibility Audit Foundation | Create accessibility audit checklist and frontend test boundaries. |
| TASK-002 | Landmarks Headings | Validate and fix landmarks, headings, labels, and page structure. |
| TASK-003 | Keyboard Navigation | Validate and fix keyboard navigation across shell and editor surfaces. |
| TASK-004 | Focus Management | Validate and fix modal, drawer, panel, and editor focus behavior. |
| TASK-005 | Color Contrast | Validate and fix contrast issues using design system tokens. |
| TASK-006 | Responsive Audit | Audit and fix responsive behavior across dashboard, project, editor, and settings pages. |
| TASK-007 | Loading Error Empty Audit | Ensure consistent loading, error, and empty states across frontend features. |
| TASK-008 | Performance Boundaries | Add frontend performance guardrails for large editor documents. |
| TASK-009 | Bundle Boundary | Review lazy loading and client component boundaries. |
| TASK-010 | Test Coverage | Add or improve high-value frontend tests for critical flows. |
| TASK-011 | Editor Smoke Tests | Add editor smoke tests for loading, canvas, selection, panels, and text editor surfaces. |
| TASK-012 | Dashboard Smoke Tests | Add dashboard/project/settings smoke tests. |
| TASK-013 | Error Boundaries | Audit and strengthen feature-level error boundaries. |
| TASK-014 | Form Validation UX | Ensure frontend forms have validation, error messages, and accessible descriptions. |
| TASK-015 | Shortcuts Help | Add keyboard shortcut discoverability/help UI boundary. |
| TASK-016 | Mock Leak Audit | Ensure mock data/dev fixtures do not leak into production paths. |
| TASK-017 | Import Boundary Audit | Audit frontend import boundaries and eliminate cyclic feature imports. |
| TASK-018 | Frontend Quality Final Report | Create final frontend quality report and remaining risk list. |

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
