---
id: TASK-0078

title: Implement GroupObject

status: Completed

priority: High

story_points: 13

sprint: SPRINT-009-editor-object-model

epic: EPIC-014

package: atlas-editor

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0078 — Implement GroupObject

## Summary

Implement `GroupObject`.

GroupObject represents a logical collection of EditorObjects that behave as a single editable object.

GroupObject supports hierarchical grouping while preserving the identity of each child object.

GroupObject never performs rendering.

---

# Capability

After this task is complete, Atlas Studio can manipulate multiple editor objects as a single unit.

---

# Goal

Provide reusable object grouping.

---

# Business Value

Supports:

- Move multiple objects
- Rotate group
- Scale group
- Lock group
- Hide group
- Nested groups

without flattening editor objects.

---

# Background

Users frequently manipulate multiple objects together.

Instead of merging objects permanently, GroupObject provides a reusable container.

Example

Group

├── Text
├── Bubble
├── Image
└── Group

---

# Scope

## Included

- Group metadata
- Child object references
- Group hierarchy
- Group state

## Excluded

- Rendering
- Auto layout
- Selection
- Command implementation

---

# Deliverables

```text
packages/
└── atlas-editor/
    └── src/
        ├── GroupObject.ts
        ├── GroupProperties.ts
        └── index.ts
```

---

# Responsibilities

GroupObject is responsible for:

- grouping editor objects
- exposing child references
- supporting nested groups
- integrating with SceneGraph

GroupObject is NOT responsible for:

- rendering
- hit testing
- layout
- command execution

---

# Architecture

```text
EditorObject

↓

GroupObject

↓

EditorObject[]
```

---

# Public API

```ts
interface GroupObject {
  readonly object: EditorObject;

  readonly childObjectIds: readonly string[];

  readonly properties: GroupProperties;
}
```

---

# Group Features

Supports:

- Nested groups
- Collapse / Expand (future)
- Lock
- Hide
- Transform as one object

---

# Dependency

Depends On

- TASK-0071 — EditorObject
- TASK-0074 — SceneGraph

---

# Risk

Medium

GroupObject becomes the foundation for hierarchical editing.

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

- [ ] GroupObject implemented.
- [ ] Immutable.
- [ ] Serializable.
- [ ] Supports nested groups.
- [ ] References child EditorObjects.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio can represent hierarchical editable object groups.

---

# AI Constraints

Before implementation:

- Do not implement rendering.
- Do not implement group commands.
- Do not implement layout.
- Focus only on the GroupObject model.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0071-editor-object.md
- TASK-0074-scene-graph.md

---

# Next Task

TASK-0079-shape-object.md
