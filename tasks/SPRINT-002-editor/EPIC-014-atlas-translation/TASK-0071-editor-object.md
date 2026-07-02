---
id: TASK-0071

title: Implement EditorObject

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

# TASK-0071 — Implement EditorObject

## Summary

Implement `EditorObject`.

EditorObject is the base abstraction for every editable object inside an EditorDocument.

All visual elements derive from EditorObject.

EditorObject defines identity, transform, visibility, locking, and metadata.

EditorObject never performs rendering.

---

# Capability

After this task is complete, Atlas Studio can represent every editable element using a unified object model.

---

# Goal

Provide the foundation of the editor scene graph.

---

# Business Value

Supports:

- Text
- Image
- Shape
- Bubble
- Group
- Guide
- Annotation
- Future plugin objects

without duplicating editor infrastructure.

---

# Background

Every editable element shares common properties.

Instead of implementing these repeatedly, EditorObject becomes the shared base model.

Examples:

Image

↓

EditorObject

Text

↓

EditorObject

Bubble

↓

EditorObject

---

# Scope

## Included

- Object identity
- Transform reference
- Visibility
- Lock state
- Metadata

## Excluded

- Rendering
- Hit testing
- Selection
- Commands
- Layout

---

# Deliverables

```text
packages/
└── atlas-editor/
    └── src/
        ├── EditorObject.ts
        ├── ObjectMetadata.ts
        └── index.ts
```

---

# Responsibilities

EditorObject is responsible for:

- providing object identity
- exposing transform
- exposing visibility
- exposing lock state
- exposing metadata

EditorObject is NOT responsible for:

- rendering
- hit testing
- command execution
- layout

---

# Architecture

```text
EditorObject
    │
    ├── ImageObject
    ├── TextObject
    ├── ShapeObject
    ├── BubbleObject
    ├── GroupObject
    └── PluginObject
```

---

# Public API

```ts
interface EditorObject {
  readonly id: string;

  readonly name: string;

  readonly transform: Transform2D;

  readonly visible: boolean;

  readonly locked: boolean;

  readonly metadata: ObjectMetadata;
}
```

---

# Object Features

Supports:

- Rename
- Lock
- Unlock
- Hide
- Show
- Metadata
- Transform reference

---

# Dependency

Depends On

- TASK-0062 — EditorDocument

---

# Risk

High

EditorObject becomes the base model for every editable element.

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

- [ ] EditorObject implemented.
- [ ] Immutable.
- [ ] Serializable.
- [ ] Supports shared object properties.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio represents all editable elements using EditorObject.

---

# AI Constraints

Before implementation:

- Do not implement rendering.
- Do not implement object-specific behavior.
- Do not implement layout.
- Focus only on the base object model.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0062-editor-document.md

---

# Next Task

TASK-0072-transform2d.md
