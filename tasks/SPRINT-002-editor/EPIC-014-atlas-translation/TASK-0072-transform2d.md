---
id: TASK-0072

title: Implement Transform2D

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

# TASK-0072 — Implement Transform2D

## Summary

Implement `Transform2D`.

Transform2D is an immutable value object representing the spatial transformation of an EditorObject.

It stores translation, rotation, scaling, and transform origin.

Transform2D never performs rendering.

---

# Capability

After this task is complete, Atlas Studio can represent object transformations consistently across every editor object.

---

# Goal

Provide a reusable 2D transformation model.

---

# Business Value

Supports:

- Move
- Rotate
- Scale
- Flip
- Group Transform
- Future Animation

using a unified transform model.

---

# Background

Every EditorObject occupies a position in 2D space.

Instead of every object storing its own transform logic, Transform2D becomes a reusable value object.

---

# Scope

## Included

- Position
- Rotation
- Scale
- Transform origin

## Excluded

- Rendering
- Matrix multiplication
- Hit testing
- Physics

---

# Deliverables

```text
packages/
└── atlas-editor/
    └── src/
        ├── Transform2D.ts
        ├── Point2D.ts
        ├── Scale2D.ts
        └── index.ts
```

---

# Responsibilities

Transform2D is responsible for:

- storing object position
- storing rotation
- storing scale
- exposing immutable transform data

Transform2D is NOT responsible for:

- rendering
- animation
- hit testing
- object hierarchy

---

# Architecture

```text
EditorObject

↓

Transform2D

├── Position
├── Rotation
├── Scale
└── Origin
```

---

# Public API

```ts
interface Transform2D {
  readonly position: Point2D;

  readonly rotation: number;

  readonly scale: Scale2D;

  readonly origin: Point2D;
}
```

---

# Supported Operations

Supports:

- Translation
- Rotation
- Uniform Scale
- Non-uniform Scale
- Transform Origin

---

# Dependency

Depends On

- TASK-0071 — EditorObject

---

# Risk

Low

Transform2D is an immutable value object shared by every editor object.

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

- [ ] Transform2D implemented.
- [ ] Immutable.
- [ ] Serializable.
- [ ] Shared across EditorObjects.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio represents object transformations using a reusable immutable Transform2D.

---

# AI Constraints

Before implementation:

- Do not implement rendering.
- Do not implement transform matrices.
- Do not implement animation.
- Focus only on the transform model.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0071-editor-object.md

---

# Next Task

TASK-0073-layer.md
