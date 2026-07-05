---
title: SPRINT-005-frontend
status: Ready
owner: H.Makki
created_at: 2026-07-05
updated_at: 2026-07-05
---

# SPRINT-005 — Frontend

## Goal

Implement the Atlas Studio frontend foundation and professional UI workflows for dashboard, project management, asset import, editor, canvas, translation workbench, AI job monitoring, export preview, settings, and frontend quality.

## Scope

Frontend-only work for:

```txt
apps/web/**
packages/atlas-ui/**
```

## Deliverables

```txt
apps/web/**
packages/atlas-ui/**
tasks/SPRINT-005-frontend/**
```

Sprint 5 delivers frontend task specifications and, after implementation, the Atlas Studio frontend application foundation, design system, shell, dashboard, project UI, asset UI, editor UI, canvas renderer, translation workbench, AI job UI, export UI, settings UI, and frontend quality pass.

## Excluded

- Backend implementation
- Database implementation
- AI provider implementation
- Worker implementation
- Plugin runtime implementation
- External hosted services

## Included Epics

The included EPICs are EPIC-041 through EPIC-060.

## EPIC Roadmap

| EPIC | Folder | Purpose |
|---|---|---|
| EPIC-041 | `EPIC-041-web-app-foundation` | Establish the frontend application foundation for Atlas Studio web UI. |
| EPIC-042 | `EPIC-042-atlas-ui-design-system` | Build the shared Atlas UI design system used by frontend screens and editor surfaces. |
| EPIC-043 | `EPIC-043-web-app-shell-navigation` | Implement the frontend application shell, navigation, sidebar, top bar, breadcrumbs, and command entry points. |
| EPIC-044 | `EPIC-044-web-state-data-access` | Create frontend state management and API data-access boundaries for screens and editor workflows. |
| EPIC-045 | `EPIC-045-workspace-dashboard-ui` | Implement the workspace dashboard frontend for recent projects, metrics, quick actions, and empty states. |
| EPIC-046 | `EPIC-046-project-management-ui` | Implement frontend screens for project listing, creation, metadata, settings, and basic lifecycle actions. |
| EPIC-047 | `EPIC-047-asset-import-library-ui` | Implement asset import and library UI for pages, images, upload states, validation, ordering, and metadata. |
| EPIC-048 | `EPIC-048-editor-shell-layout` | Implement the editor application shell with panels, toolbar, canvas area, inspector area, timeline/status, and resizable layout. |
| EPIC-049 | `EPIC-049-canvas-konva-renderer` | Implement Konva-based canvas rendering for pages, image layers, bubble overlays, text overlays, viewport, and hit testing. |
| EPIC-050 | `EPIC-050-page-navigation-thumbnails` | Implement page navigation UI, thumbnails, page status, page ordering, and editor page switching. |
| EPIC-051 | `EPIC-051-layer-panel-ui` | Implement layer panel UI for image, bubble, text, mask, and overlay layers with ordering, visibility, locking, grouping, and selection. |
| EPIC-052 | `EPIC-052-selection-transform-tools` | Implement selection, transform, snapping, guides, handles, keyboard movement, and bounding box tools for editor objects. |
| EPIC-053 | `EPIC-053-bubble-text-editor-ui` | Implement UI for editing speech bubbles, original text, translated text, text boxes, bubble metadata, and review status. |
| EPIC-054 | `EPIC-054-typography-style-editor-ui` | Implement typography and style editor UI for font, size, layout, stroke, shadow, direction, alignment, and presets. |
| EPIC-055 | `EPIC-055-image-edit-tools-ui` | Implement image editing UI boundaries for brush, eraser, mask, restore, crop, inpainting request, and non-destructive tool state. |
| EPIC-056 | `EPIC-056-translation-workbench-ui` | Implement translation workbench UI for source/target text, glossary, memory suggestions, review states, batch editing, and QA warnings. |
| EPIC-057 | `EPIC-057-ai-workflow-job-ui` | Implement frontend UI for AI workflow jobs such as OCR, translation, review, inpainting, progress tracking, logs, and retry controls. |
| EPIC-058 | `EPIC-058-export-preview-ui` | Implement export preview UI for pages, formats, validation, quality warnings, progress, and download-ready states. |
| EPIC-059 | `EPIC-059-settings-plugin-management-ui` | Implement settings and plugin management UI for preferences, providers, shortcuts, workspace/project settings, and plugin status. |
| EPIC-060 | `EPIC-060-frontend-quality-accessibility` | Harden frontend quality through accessibility, responsiveness, performance, error handling, testing, and maintainability checks. |

## Implementation Order

```txt
EPIC-041-web-app-foundation
EPIC-042-atlas-ui-design-system
EPIC-043-web-app-shell-navigation
EPIC-044-web-state-data-access
EPIC-045-workspace-dashboard-ui
EPIC-046-project-management-ui
EPIC-047-asset-import-library-ui
EPIC-048-editor-shell-layout
EPIC-049-canvas-konva-renderer
EPIC-050-page-navigation-thumbnails
EPIC-051-layer-panel-ui
EPIC-052-selection-transform-tools
EPIC-053-bubble-text-editor-ui
EPIC-054-typography-style-editor-ui
EPIC-055-image-edit-tools-ui
EPIC-056-translation-workbench-ui
EPIC-057-ai-workflow-job-ui
EPIC-058-export-preview-ui
EPIC-059-settings-plugin-management-ui
EPIC-060-frontend-quality-accessibility
```

## Timeline

This sprint is a frontend master sprint and should be executed in smaller implementation waves. Recommended waves:

```txt
Wave 1: EPIC-041 to EPIC-044  foundation, design system, shell, state/data access
Wave 2: EPIC-045 to EPIC-047  dashboard, project management, asset import
Wave 3: EPIC-048 to EPIC-052  editor shell, canvas, pages, layers, selection tools
Wave 4: EPIC-053 to EPIC-058  bubble/text editing, typography, image tools, translation, jobs, export
Wave 5: EPIC-059 to EPIC-060  settings/plugin UI and frontend quality pass
```

Do not treat all 20 EPICs as one Codex implementation batch.

## Completion Criteria

- All EPIC tasks are implemented sequentially.
- Frontend flows are accessible, type-safe, and testable.
- No backend or provider logic is introduced into UI components.
- Tests, typecheck, and build pass where available.
