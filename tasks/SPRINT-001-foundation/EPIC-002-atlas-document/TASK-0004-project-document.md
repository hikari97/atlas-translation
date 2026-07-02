---

id: TASK-0004
title: Implement ProjectDocument

status: Ready

priority: Critical

story_points: 5

sprint: SPRINT-001

epic: EPIC-002

package: atlas-document

owner: H.Makki

reviewer:

created_at: 2026-07-01

## updated_at: 2026-07-01

# TASK-0004 — Implement ProjectDocument

## Summary

Implement the `ProjectDocument`, the document model representing a single translation project within a workspace.

A `ProjectDocument` owns its pages, project metadata, settings, and lifecycle state. It provides a structured API for managing pages while remaining independent from application business logic.

---

# Goal

Create a reusable document model that represents a single Atlas Studio project and provides the foundation for page management.

---

# Background

A Workspace may contain multiple projects.

Each `ProjectDocument` represents one independent project and is responsible for organizing its own pages and metadata.

The project should expose a clean document API without containing OCR, translation, rendering, or export logic.

---

# Scope

## Included

- ProjectDocument class
- ProjectMetadata
- ProjectSettings
- ProjectState
- Page collection
- Collection management methods
- Barrel exports

---

## Excluded

- Page implementation
- Layer implementation
- Bubble implementation
- Translation implementation
- Serialization
- Validation
- Events
- Business logic

---

# Deliverables

```text
packages/
└── atlas-document/
    └── src/
        └── project/
            ├── ProjectDocument.ts
            ├── ProjectMetadata.ts
            ├── ProjectSettings.ts
            ├── ProjectState.ts
            ├── PageCollection.ts
            └── index.ts
```

---

# Responsibilities

ProjectDocument is responsible for:

- Managing project metadata.
- Managing project settings.
- Managing project lifecycle state.
- Owning the page collection.
- Registering pages.
- Removing pages.
- Looking up pages.
- Exposing read-only page enumeration.

ProjectDocument is **not** responsible for:

- OCR.
- Translation.
- Rendering.
- Export.
- Commands.
- Events.
- Persistence.
- Business rules.

---

# Public API

The document model should expose a simple page management API.

Examples include:

```ts
project.pages;

project.pageCount;

project.getPage(id);

project.hasPage(id);

project.addPage(page);

project.removePage(id);

project.clearPages();
```

The implementation must not expose mutable internal collections directly.

---

# Technical Requirements

The implementation must:

- Depend only on `@atlas/types`.
- Encapsulate mutable collections.
- Expose read-only collections where appropriate.
- Use strict TypeScript.
- Avoid unnecessary runtime dependencies.
- Follow the package coding standards.

---

# Files Allowed

```text
packages/atlas-document/src/project/**
packages/atlas-document/src/index.ts
```

---

# Files Forbidden

```text
packages/atlas-types/**
packages/atlas-command/**
packages/atlas-events/**
packages/atlas-core/**
apps/**
plugins/**
```

---

# Dependencies

Required:

- TASK-0001 — Initialize atlas-document Package
- TASK-0002 — Implement AtlasDocument Root
- TASK-0003 — Implement WorkspaceDocument

---

# Acceptance Criteria

- [ ] ProjectDocument implemented.
- [ ] ProjectMetadata implemented.
- [ ] ProjectSettings implemented.
- [ ] ProjectState implemented.
- [ ] PageCollection implemented.
- [ ] Read-only page collection exposed.
- [ ] Public API exported.
- [ ] Build succeeds.

---

# Definition of Done

The task is complete when:

- WorkspaceDocument owns one or more ProjectDocument instances.
- ProjectDocument manages its page collection.
- Internal collections remain encapsulated.
- Public API is stable.
- Package is ready for PageDocument.

---

# AI Checklist

Before implementation:

- Implement only ProjectDocument.
- Do not implement PageDocument.
- Do not implement LayerDocument.
- Do not implement serialization.
- Do not implement validation.
- Do not implement business logic.
- Stop after completing this task.

---

# Next Task

TASK-0005 — Implement PageDocument
