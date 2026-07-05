---
id: TASK-0088

title: Implement HitTestEngine

status: Completed

priority: Critical

story_points: 21

sprint: SPRINT-010-rendering-engine

epic: EPIC-014

package: atlas-renderer

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0088 — Implement HitTestEngine

## Summary

Implement `HitTestEngine`.

HitTestEngine identifies which EditorObject is located at a given coordinate.

Hit testing is performed using SceneGraph and object geometry rather than rendered pixels.

HitTestEngine is completely backend-independent.

---

# Capability

After this task is complete, Atlas Studio can accurately determine object selection and interaction targets.

---

# Goal

Provide a reusable hit testing engine.

---

# Business Value

Supports:

- Selection
- Drag & Drop
- Resize Handles
- Hover
- Context Menu
- Smart Guides
- Future Touch Input

without depending on Canvas or GPU rendering.

---

# Background

Rendering and hit testing are separate responsibilities.

Rendering produces pixels.

Hit testing queries editor geometry.

---

# Scope

## Included

- Hit testing contract
- Point hit testing
- Rectangle hit testing
- Hit result ordering
- Visibility filtering

## Excluded

- Rendering
- Selection logic
- Input handling
- GPU picking

---

# Deliverables

```text
packages/
└── atlas-renderer/
    └── src/
        ├── HitTestEngine.ts
        ├── HitTestContext.ts
        ├── HitTestResult.ts
        ├── HitTarget.ts
        └── index.ts
```

---

# Responsibilities

HitTestEngine is responsible for:

- traversing SceneGraph
- evaluating object geometry
- respecting visibility
- respecting lock state
- returning ordered hit results

HitTestEngine is NOT responsible for:

- rendering
- object selection
- input handling
- command execution

---

# Architecture

```text
Pointer Position

↓

HitTestEngine

↓

SceneGraph

↓

EditorObject

↓

HitTestResult
```

---

# Public API

```ts
interface HitTestEngine {
  hitTest(context: HitTestContext): readonly HitTestResult[];
}
```

---

# Supported Queries

Supports:

- Point hit test
- Rectangle hit test
- Top-most object
- Multi-hit
- Visibility filtering
- Locked object filtering

---

# Hit Test Flow

```text
Pointer

↓

Viewport Transform

↓

SceneGraph Traversal

↓

Geometry Test

↓

Sort by Z Order

↓

Hit Results
```

---

# Dependency

Depends On

- TASK-0074 — SceneGraph
- TASK-0087 — DirtyRegion

---

# Risk

High

HitTestEngine is the foundation for all editor interaction.

---

# Files Allowed

```text
packages/atlas-renderer/src/**
```

---

# Files Forbidden

```text
packages/atlas-editor/**
packages/atlas-project/**
packages/atlas-translation/**
apps/**
```

---

# Acceptance Criteria

- [ ] HitTestEngine implemented.
- [ ] Supports point hit testing.
- [ ] Supports rectangle hit testing.
- [ ] Returns ordered hit results.
- [ ] Backend independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio can identify editor objects independently from rendering technology.

---

# AI Constraints

Before implementation:

- Do not implement GPU picking.
- Do not implement rendering.
- Do not implement selection.
- Focus only on geometry-based hit testing.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0074-scene-graph.md
- TASK-0087-dirty-region.md

---

# Next Task

TASK-0089-render-statistics.md
