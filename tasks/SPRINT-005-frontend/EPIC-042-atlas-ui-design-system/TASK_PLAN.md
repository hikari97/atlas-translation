# TASK_PLAN — EPIC-042-atlas-ui-design-system

## Epic

Area: `atlas-ui`

Purpose: Build the shared Atlas UI design system used by frontend screens and editor surfaces.

## Dependencies

- EPIC-041-web-app-foundation

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
| TASK-001 | UI Package Foundation | Create or normalize the packages/atlas-ui design system package. |
| TASK-002 | Theme Tokens | Define color, spacing, typography, radius, shadow, and z-index tokens. |
| TASK-003 | Theme Provider | Implement the design system theme provider boundary. |
| TASK-004 | Layout Primitives | Implement reusable layout primitives for stack, grid, panel, split, and page surfaces. |
| TASK-005 | Button Controls | Implement button, icon button, toggle, and segmented control primitives. |
| TASK-006 | Form Controls | Implement input, textarea, select, checkbox, switch, slider, and field wrapper primitives. |
| TASK-007 | Feedback Components | Implement alert, toast boundary, badge, progress, skeleton, and status components. |
| TASK-008 | Overlay Components | Implement modal, drawer, popover, tooltip, and menu primitives. |
| TASK-009 | Data Display | Implement table/list/card/detail display primitives. |
| TASK-010 | Toolbar Components | Implement toolbar, command bar, action group, and keyboard hint components. |
| TASK-011 | Empty Error States | Implement reusable empty, error, and offline state components. |
| TASK-012 | Icon Boundary | Create an icon abstraction boundary without locking the app to a single icon provider. |
| TASK-013 | Accessibility Helpers | Implement focus, aria, keyboard, and visually-hidden helpers. |
| TASK-014 | Responsive Helpers | Implement responsive layout helpers and breakpoint utilities. |
| TASK-015 | Component Tests | Add unit and rendering tests for shared UI components. |
| TASK-016 | Visual Fixtures | Create lightweight component fixtures for review and smoke testing. |
| TASK-017 | UI Export Index | Finalize package exports and internal/public component boundaries. |
| TASK-018 | Design System Notes | Add package-local documentation notes for design system usage. |

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
