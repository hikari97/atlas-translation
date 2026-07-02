---

id: TASK-0002
title: Implement AtlasDocument Root

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

# TASK-0002 — Implement AtlasDocument Root

## Summary

Implement the root document object for Atlas Studio.

`AtlasDocument` is the aggregate root of the document model and serves as the primary entry point for all document operations.

This task establishes the overall document structure but does not implement domain-specific behavior.

---

# Goal

Create the root document model that owns the workspace, projects, metadata, version information, and document lifecycle state.

The implementation should provide a stable foundation for all subsequent document models.

---

# Background

Every Atlas Studio file is represented by a single `AtlasDocument`.

The document is responsible for containing:

- Workspace
- Projects
- Metadata
- Version information
- Global settings

Domain logic belongs to child document models and should not be implemented here.

---

# Scope

## Included

- AtlasDocument class
- AtlasDocumentMetadata
- AtlasDocumentVersion
- AtlasDocumentSettings
- AtlasDocumentState
- Root exports

---

## Excluded

- Workspace implementation
- Project implementation
- Page implementation
- Serialization
- Validation
- Business logic

---

# Deliverables

```text
packages/
└── atlas-document/
    └── src/
        └── document/
            ├── AtlasDocument.ts
            ├── AtlasDocumentMetadata.ts
            ├── AtlasDocumentVersion.ts
            ├── AtlasDocumentSettings.ts
            ├── AtlasDocumentState.ts
            └── index.ts
```

---

# Responsibilities

AtlasDocument is responsible for:

- Owning the document lifecycle.
- Managing document metadata.
- Holding workspace references.
- Holding project collections.
- Providing the root entry point.

AtlasDocument is **not** responsible for:

- Translation.
- Rendering.
- OCR.
- Commands.
- Event dispatching.
- Business logic.

---

# Technical Requirements

The implementation must:

- Implement the contracts defined in `@atlas/types`.
- Use strict TypeScript.
- Keep mutable state encapsulated.
- Expose only the public API.
- Avoid runtime dependencies other than `@atlas/types`.

---

# Files Allowed

```text
packages/atlas-document/src/document/**
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

- EPIC-001 — atlas-types
- TASK-0001 — Initialize atlas-document Package

---

# Acceptance Criteria

- [ ] AtlasDocument class created.
- [ ] Metadata model implemented.
- [ ] Version model implemented.
- [ ] Settings model implemented.
- [ ] State model implemented.
- [ ] Barrel export created.
- [ ] Root package export updated.
- [ ] Package builds successfully.

---

# Definition of Done

The task is complete when:

- AtlasDocument is the single root object of the document model.
- Public API exports are updated.
- Build succeeds.
- Package is ready for WorkspaceDocument.

---

# AI Checklist

Before implementation:

- Implement only the root document model.
- Do not implement WorkspaceDocument.
- Do not implement ProjectDocument.
- Do not implement serialization.
- Do not implement validation.
- Stop after completing this task.

---

# Next Task

TASK-0003 — Implement WorkspaceDocument
