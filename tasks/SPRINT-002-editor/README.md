---
id: SPRINT-002
title: Editor Foundation
status: In Review
version: 1.0
owner: H.Makki
created_at: 2026-07-01
updated_at: 2026-07-05
---

# Sprint 002 — Editor Foundation

## Overview

Sprint 002 establishes the provider-independent editor foundation for Atlas Studio.

The sprint builds the packages required to render Atlas documents, expose reusable editor UI contracts, process user interaction, manage selection and history, handle editor input, support translation workflows, and define collaboration abstractions.

This sprint does not implement a final Next.js application shell, backend API, AI OCR workers, storage providers, marketplace distribution, or vendor-specific collaboration services.

## Sprint Goal

Build the reusable editor packages required by Atlas Studio while preserving the architecture rules established by Sprint 001.

At the end of this sprint, the editor layer should provide stable public APIs for plugin extension, rendering, UI primitives, interaction handling, selection, history, input, translation, and collaboration.

## Objectives

- Implement plugin extension contracts.
- Implement renderer abstractions over Atlas Document.
- Implement reusable UI contracts and component primitives.
- Implement interaction sessions for pointer, keyboard, drag, resize, and related input flows.
- Implement selection models and selection lifecycle contracts.
- Implement history, undo, redo, transaction, and snapshot foundations.
- Implement editor input abstractions.
- Implement editor orchestration contracts.
- Implement provider-independent translation abstractions.
- Implement provider-independent collaboration abstractions.

## Included Epics

| Epic | Package | Status |
|---|---|---|
| EPIC-006 | `atlas-plugin` | Completed |
| EPIC-007 | `atlas-renderer` | Completed |
| EPIC-008 | `atlas-ui` | Completed |
| EPIC-009 | `atlas-interaction` | Completed |
| EPIC-010 | `atlas-selection` | Completed |
| EPIC-011 | `atlas-history` | Completed |
| EPIC-012 | `atlas-input` | Completed |
| EPIC-013 | `atlas-editor` | Completed |
| EPIC-014 | `atlas-translation` | Completed |
| EPIC-015 | `atlas-collaboration` | In Review |

## Deliverables

This sprint produces the following packages and task plans.

```text
packages/
atlas-plugin/
atlas-renderer/
atlas-ui/
atlas-interaction/
atlas-selection/
atlas-history/
atlas-input/
atlas-editor/
atlas-translation/
atlas-collaboration/
```

## Out of Scope

- Final frontend application shell.
- Backend API implementation.
- OCR provider implementation.
- Translation provider vendor integration.
- Collaboration vendor integration.
- Plugin marketplace and remote plugin installation.
- Persistent cloud synchronization.

## Architecture Rules

- Canvas and renderer packages must remain rendering layers only.
- Atlas Document remains the source of truth.
- Editor state changes must be expressed through commands.
- Business logic must remain inside reusable packages.
- Provider-specific AI, translation, and collaboration services must remain behind plugin or provider contracts.
- Package dependencies must not point from lower-level packages back into applications.

## Success Criteria

Sprint 002 is considered complete when:

- All included editor foundation packages expose public APIs.
- Package boundaries remain respected.
- Editor flows are command-oriented and do not mutate renderer state directly.
- Translation and collaboration remain provider-independent.
- Documentation and task indexes exist for each epic.
- Completed task files remain traceable to their epic scope.

## Current Audit Notes

- Most Sprint 002 task files are marked completed.
- `tasks/SPRINT-002-editor/TASK-016-follow-user.md` is still marked ready and should be reviewed before treating the sprint as fully closed.
- `EPIC-015 — atlas-collaboration` uses a different directory naming style than other epics.
- Sprint-level review details are documented in `tasks/SPRINT-002-editor/REVIEW.md`.
