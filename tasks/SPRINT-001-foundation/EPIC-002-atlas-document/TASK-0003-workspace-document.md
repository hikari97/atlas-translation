---

id: TASK-0003
title: Implement WorkspaceDocument

status: Completed

priority: Critical

story_points: 5

sprint: SPRINT-001

epic: EPIC-002

package: atlas-document

owner: H.Makki

reviewer:

created_at: 2026-07-01

## updated_at: 2026-07-01

# TASK-0003 — Implement WorkspaceDocument

## Summary

Implement the `WorkspaceDocument`, the top-level container responsible for managing projects within an AtlasDocument.

The WorkspaceDocument provides a structured API for accessing and maintaining project collections while remaining independent from application-specific business logic.

---

# Goal

Create a reusable workspace model that owns all project documents and provides a stable entry point for project management.

---

# Background

Every `AtlasDocument` contains exactly one `WorkspaceDocument`.

The workspace acts as the root container for all projects and exposes a consistent API for managing the project collection.

It should remain lightweight and focus only on document structure.

---

# Scope

## Included

- WorkspaceDocument class
- WorkspaceMetadata
- Project collection
- Read-only project access
- Collection management methods
- Barrel exports

---

## Excluded

- Project implementation
- Page implementation
- Serialization
- Validation
- Business logic
- Events

---

# Deliverables

```text
packages/
└── atlas-document/
    └── src/
        └── workspace/
            ├── WorkspaceDocument.ts
            ├── WorkspaceMetadata.ts
            ├── WorkspaceCollection.ts
            └── index.ts
```

---

# Responsibilities

WorkspaceDocument is responsible for:

- Owning the project collection.
- Providing project lookup.
- Managing project registration.
- Managing project removal.
- Exposing read-only project enumeration.

WorkspaceDocument is **not** responsible for:

- Page management.
- Translation.
- Rendering.
- Commands.
- Validation.
- Persistence.

---

# Public API

The document model should provide a simple collection API.

Examples include:

```ts
workspace.projects;

workspace.projectCount;

workspace.getProject(id);

workspace.hasProject(id);

workspace.addProject(project);

workspace.removeProject(id);

workspace.clearProjects();
```

The implementation should not expose mutable internal collections directly.

---

# Technical Requirements

The implementation must:

- Depend only on `@atlas/types`.
- Encapsulate mutable collections.
- Expose read-only collections where possible.
- Avoid runtime dependencies.
- Use strict TypeScript.

---

# Files Allowed

```text
packages/atlas-document/src/workspace/**
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

- TASK-0001
- TASK-0002

---

# Acceptance Criteria

- [ ] WorkspaceDocument implemented.
- [ ] WorkspaceMetadata implemented.
- [ ] WorkspaceCollection implemented.
- [ ] Project collection encapsulated.
- [ ] Read-only collection exposed.
- [ ] Public API exported.
- [ ] Build succeeds.

---

# Definition of Done

The task is complete when:

- AtlasDocument owns a single WorkspaceDocument.
- WorkspaceDocument manages project registration and lookup.
- Internal collections remain encapsulated.
- Public API is stable.
- Package is ready for ProjectDocument.

---

# AI Checklist

Before implementation:

- Implement only WorkspaceDocument.
- Do not implement ProjectDocument.
- Do not implement PageDocument.
- Do not implement serialization.
- Do not implement validation.
- Stop after completing this task.

---

# Next Task

TASK-0004 — Implement ProjectDocument
