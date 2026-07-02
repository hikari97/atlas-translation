---
id: TASK-0073

title: Implement Layer

status: Ready

priority: Critical

story_points: 13

sprint: SPRINT-009-editor-object-model

epic: EPIC-014

package: atlas-editor

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0073 — Implement Layer

## Summary

Implement `Layer`.

Layer is an immutable container responsible for organizing EditorObjects inside an EditorDocument.

Layers provide ordering, visibility, locking, and grouping semantics.

Layers never render objects.

---

# Capability

After this task is complete, Atlas Studio can organize editor objects using independent layers.

---

# Goal

Provide reusable layer management.

---

# Business Value

Supports:

- object ordering
- hide/show layer
- lock layer
- grouping
- future folders
- future artboards

---

# Background

Every EditorDocument consists of one or more Layers.

Each Layer contains EditorObjects.

Rendering order follows the Layer hierarchy.

---

# Scope

## Included

- Layer contract
- Layer metadata
- Object collection
- Visibility
- Lock state

## Excluded

- Rendering
- Commands
- Layer panel
- Drag and drop

---

# Deliverables

```text
packages/
└── atlas-editor/
    └── src/
        ├── Layer.ts
        ├── LayerMetadata.ts
        └── index.ts
```

---

# Responsibilities

Layer is responsible for:

- grouping EditorObjects
- exposing object ordering
- exposing visibility
- exposing lock state

Layer is NOT responsible for:

- rendering
- hit testing
- command execution
- layout

---

# Architecture

```text
EditorDocument

↓

Layer

↓

EditorObject
```

---

# Public API

```ts
interface Layer {
  readonly id: string;

  readonly name: string;

  readonly visible: boolean;

  readonly locked: boolean;

  readonly objects: readonly EditorObject[];
}
```

---

# Layer Features

Supports:

- Rename
- Hide
- Show
- Lock
- Unlock
- Object Ordering

---

# Dependency

Depends On

- TASK-0062 — EditorDocument
- TASK-0071 — EditorObject

---

# Risk

Medium

Layer becomes the organizational unit for every EditorDocument.

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

- [ ] Layer implemented.
- [ ] Immutable.
- [ ] Serializable.
- [ ] Supports EditorObject collection.
- [ ] Supports visibility and locking.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio organizes EditorObjects using reusable immutable Layers.

---

# AI Constraints

Before implementation:

- Do not implement rendering.
- Do not implement drag-and-drop.
- Do not implement layer panel.
- Focus only on the layer model.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0062-editor-document.md
- TASK-0071-editor-object.md

---

# Next Task

TASK-0074-scene-graph.md
