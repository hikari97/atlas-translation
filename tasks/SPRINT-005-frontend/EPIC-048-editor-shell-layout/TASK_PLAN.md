# TASK_PLAN — EPIC-048-editor-shell-layout

## Epic

Area: `editor-shell-layout`

Purpose: Implement the editor application shell with panels, toolbar, canvas area, inspector area, timeline/status, and resizable layout.

## Dependencies

- EPIC-043-web-app-shell-navigation
- EPIC-044-web-state-data-access
- EPIC-047-asset-import-library-ui

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
| TASK-001 | Editor Route | Create editor route structure and project/page routing boundary. |
| TASK-002 | Editor Shell Layout | Implement main editor layout with canvas, left panel, right inspector, top toolbar, and status bar. |
| TASK-003 | Panel System | Implement typed panel registry and panel visibility state. |
| TASK-004 | Resizable Panels | Implement resizable panel layout behavior. |
| TASK-005 | Editor Toolbar | Implement editor toolbar action groups and tool slots. |
| TASK-006 | Status Bar | Implement editor status bar for zoom, selection, page, job, and save state. |
| TASK-007 | Inspector Shell | Implement right inspector container and tab boundaries. |
| TASK-008 | Left Panel Shell | Implement left panel container for pages, layers, assets, and jobs. |
| TASK-009 | Viewport State | Implement viewport state boundaries for zoom, pan, fit, and scroll. |
| TASK-010 | Selection State | Implement selection state boundary without actual transform tools. |
| TASK-011 | Command Dispatch Boundary | Implement frontend command dispatch boundary for editor actions. |
| TASK-012 | Undo Redo UI Boundary | Implement undo/redo button and shortcut boundary without final command engine coupling. |
| TASK-013 | Editor Loading Error States | Implement editor loading, missing page, and error states. |
| TASK-014 | Mock Editor Document | Add deterministic mock document/page data for disconnected editor UI development. |
| TASK-015 | Editor Shell Tests | Add layout, toolbar, panel, and route tests. |
| TASK-016 | Editor Accessibility | Ensure editor shell landmarks, labels, and focus traps are accessible. |
| TASK-017 | Editor Responsive Layout | Define supported responsive behavior for editor viewport sizes. |
| TASK-018 | Editor Public Boundary | Finalize editor shell feature exports and internal boundaries. |

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
