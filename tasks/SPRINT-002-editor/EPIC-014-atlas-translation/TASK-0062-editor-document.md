---
id: TASK-0062

title: Implement EditorDocument

status: Ready

priority: Critical

story_points: 13

sprint: SPRINT-008-editor-foundation

epic: EPIC-014

package: atlas-editor

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0062 — Implement EditorDocument

## Summary

Implement `EditorDocument`.

EditorDocument represents an opened project asset inside an EditorSession.

It contains runtime editing state associated with a single document.

EditorDocument never owns the underlying asset.

---

# Capability

After this task is complete, Atlas Studio can edit multiple project assets independently.

---

# Goal

Separate project assets from editable documents.

---

# Business Value

Supports:

- multiple opened pages
- tabbed editor
- split editor
- independent document state
- future collaborative editing

---

# Background

ProjectAsset represents a file inside the project.

EditorDocument represents one opened instance of that asset.

Closing the document never removes the asset from the project.

---

# Scope

## Included

- Document contract
- Asset reference
- Dirty state
- Document metadata
- Runtime state

## Excluded

- Rendering
- Selection
- Undo/Redo
- Saving
- Viewport

---

# Deliverables

```text
packages/
└── atlas-editor/
    └── src/
        ├── EditorDocument.ts
        ├── DocumentState.ts
        └── index.ts
```

---

# Responsibilities

EditorDocument is responsible for:

- referencing a ProjectAsset
- exposing document runtime state
- tracking document modifications
- representing one opened document

EditorDocument is NOT responsible for:

- loading files
- rendering
- saving
- workflow execution

---

# Architecture

```text
ProjectAsset

↓

EditorDocument

↓

EditorSession
```

---

# Lifecycle

```text
Open

↓

Loaded

↓

Editing

↓

Modified

↓

Saved

↓

Closed
```

---

# Public API

```ts
interface EditorDocument {
  readonly id: string;

  readonly assetId: string;

  readonly state: DocumentState;
}
```

---

# Document States

Supported states:

- Opening
- Ready
- Editing
- Modified
- Saving
- Closed

---

# Dependency

Depends On

- TASK-0053 — ProjectAssets
- TASK-0061 — EditorSession

---

# Risk

Medium

EditorDocument becomes the runtime representation of editable project assets.

---

# Files Allowed

```text
packages/atlas-editor/src/**
```

---

# Files Forbidden

```text
packages/atlas-project/**
packages/atlas-translation/**
apps/**
```

---

# Acceptance Criteria

- [ ] EditorDocument implemented.
- [ ] References ProjectAsset.
- [ ] Supports runtime document state.
- [ ] Immutable asset reference.
- [ ] Serializable metadata.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio can represent opened project assets independently from ProjectAsset definitions.

---

# AI Constraints

Before implementation:

- Do not implement rendering.
- Do not implement saving.
- Do not implement selection.
- Focus only on EditorDocument.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0053-project-assets.md
- TASK-0061-editor-session.md

---

# Next Task

TASK-0063-editor-viewport.md
