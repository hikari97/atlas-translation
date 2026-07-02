---
id: TASK-0074

title: Implement SceneGraph

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

# TASK-0074 — Implement SceneGraph

## Summary

Implement `SceneGraph`.

SceneGraph is the root container responsible for organizing every editable object inside an EditorDocument.

SceneGraph owns the Object Repository, Layer collection, and hierarchical relationships between objects.

SceneGraph never performs rendering.

---

# Capability

After this task is complete, Atlas Studio can organize complex editor documents using a centralized scene graph.

---

# Goal

Provide a scalable object organization model.

---

# Business Value

Supports:

- thousands of objects
- multiple layers
- object hierarchy
- grouping
- future artboards
- plugin extensions

without coupling objects to rendering.

---

# Background

EditorDocument should not directly own every collection.

Instead, SceneGraph becomes the single source of truth for editor objects.

---

# Scope

## Included

- SceneGraph contract
- Layer collection
- Object repository
- Hierarchy definition

## Excluded

- Rendering
- Hit testing
- Selection
- Commands

---

# Deliverables

```text
packages/
└── atlas-editor/
    └── src/
        ├── SceneGraph.ts
        ├── ObjectRepository.ts
        ├── ObjectRelationship.ts
        └── index.ts
```

---

# Responsibilities

SceneGraph is responsible for:

- owning editor objects
- owning layers
- maintaining hierarchy
- exposing object lookup

SceneGraph is NOT responsible for:

- rendering
- executing commands
- hit testing
- layout

---

# Architecture

```text
EditorDocument
        │
        ▼
SceneGraph
        │
        ├── ObjectRepository
        ├── Layers
        └── Relationships
```

---

# Public API

```ts
interface SceneGraph {
  readonly layers: readonly Layer[];

  readonly repository: ObjectRepository;
}
```

---

# Dependency

Depends On

- TASK-0071 — EditorObject
- TASK-0073 — Layer

---

# Risk

High

SceneGraph becomes the central data structure for every editor document.

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

- [ ] SceneGraph implemented.
- [ ] Immutable structure.
- [ ] ObjectRepository integrated.
- [ ] Layer collection supported.
- [ ] Serializable.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio manages all editor objects through SceneGraph.

---

# AI Constraints

Before implementation:

- Do not implement rendering.
- Do not implement hit testing.
- Do not implement selection.
- Focus only on SceneGraph.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0071-editor-object.md
- TASK-0073-layer.md

---

# Next Task

TASK-0075-image-object.md
