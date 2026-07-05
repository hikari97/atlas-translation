---
id: TASK-0087

title: Implement DirtyRegion

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

# TASK-0087 — Implement DirtyRegion

## Summary

Implement `DirtyRegion`.

DirtyRegion tracks portions of the rendered scene that require repainting.

Instead of redrawing the entire scene, the renderer redraws only invalidated regions.

DirtyRegion is independent from rendering backends.

---

# Capability

After this task is complete, Atlas Studio can minimize rendering work by updating only modified screen regions.

---

# Goal

Provide efficient partial rendering.

---

# Business Value

Supports:

- Partial redraw
- Interactive editing
- Large documents
- Smooth viewport navigation
- Low CPU usage
- High FPS rendering

---

# Background

Only a small portion of the editor usually changes between frames.

DirtyRegion identifies those areas.

Example

Move Text

↓

Old Bounds Dirty

↓

New Bounds Dirty

↓

Union Region

↓

Partial Render

---

# Scope

## Included

- Dirty region tracking
- Region merging
- Region clearing
- Region querying

## Excluded

- GPU optimization
- Rendering
- Scene traversal
- Cache implementation

---

# Deliverables

```text
packages/
└── atlas-renderer/
    └── src/
        ├── DirtyRegion.ts
        ├── DirtyRectangle.ts
        ├── DirtyRegionCollection.ts
        └── index.ts
```

---

# Responsibilities

DirtyRegion is responsible for:

- tracking invalidated areas
- merging overlapping regions
- exposing dirty rectangles
- clearing processed regions

DirtyRegion is NOT responsible for:

- rendering
- cache
- object hierarchy
- viewport management

---

# Architecture

```text
EditorCommand

↓

DirtyRegion

↓

RenderPipeline

↓

RenderBackend
```

---

# Public API

```ts
interface DirtyRegion {
  invalidate(region: Rectangle2D): void;

  clear(): void;

  readonly regions: readonly DirtyRectangle[];
}
```

---

# Dirty Region Workflow

```text
Object Modified

↓

Old Bounds

↓

New Bounds

↓

Union

↓

DirtyRegion

↓

Partial Render
```

---

# Dependency

Depends On

- TASK-0082 — RenderPipeline
- TASK-0086 — RenderCache

---

# Risk

High

DirtyRegion is essential for maintaining interactive rendering performance.

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

- [ ] DirtyRegion implemented.
- [ ] Supports invalidation.
- [ ] Supports merging overlapping regions.
- [ ] Supports clearing processed regions.
- [ ] Backend independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio performs partial rendering using DirtyRegion.

---

# AI Constraints

Before implementation:

- Do not implement rendering.
- Do not implement GPU optimization.
- Do not implement viewport clipping.
- Focus only on dirty region tracking.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0082-render-pipeline.md
- TASK-0086-render-cache.md

---

# Next Task

TASK-0088-hit-test.md
