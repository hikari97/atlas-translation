---
id: TASK-0082

title: Implement RenderPipeline

status: Ready

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

# TASK-0082 — Implement RenderPipeline

## Summary

Implement `RenderPipeline`.

RenderPipeline transforms a SceneGraph into an ordered sequence of DrawCommands.

RenderPipeline is backend-independent and never performs drawing.

---

# Capability

After this task is complete, Atlas Studio can generate deterministic rendering instructions from editor data.

---

# Goal

Provide a reusable rendering pipeline.

---

# Business Value

Supports:

- Canvas2D
- WebGL
- Skia
- Future Vulkan
- Future Metal

using the same rendering pipeline.

---

# Background

Rendering should be separated into two phases.

Phase 1

SceneGraph

↓

DrawCommand[]

Phase 2

DrawCommand[]

↓

RenderBackend

This separation keeps rendering deterministic and testable.

---

# Scope

## Included

- Scene traversal
- Layer ordering
- Visibility filtering
- Transform propagation
- DrawCommand generation

## Excluded

- Canvas drawing
- GPU rendering
- Hit testing
- Input

---

# Deliverables

```text
packages/
└── atlas-renderer/
    └── src/
        ├── RenderPipeline.ts
        ├── PipelineContext.ts
        ├── PipelineResult.ts
        └── index.ts
```

---

# Responsibilities

RenderPipeline is responsible for:

- traversing SceneGraph
- applying visibility
- applying hierarchy transforms
- generating DrawCommands

RenderPipeline is NOT responsible for:

- drawing
- GPU execution
- event handling
- editor state

---

# Architecture

```text
SceneGraph

↓

RenderPipeline

↓

DrawCommand[]

↓

Renderer
```

---

# Public API

```ts
interface RenderPipeline {
  build(context: PipelineContext): PipelineResult;
}
```

---

# Pipeline Stages

```text
SceneGraph

↓

Resolve Layers

↓

Resolve Hierarchy

↓

Resolve Visibility

↓

Resolve Transform

↓

Generate DrawCommands
```

---

# Dependency

Depends On

- TASK-0074 — SceneGraph
- TASK-0081 — Renderer

---

# Risk

High

RenderPipeline determines every visual output produced by Atlas Studio.

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
apps/**
```

---

# Acceptance Criteria

- [ ] RenderPipeline implemented.
- [ ] Traverses SceneGraph.
- [ ] Produces ordered DrawCommands.
- [ ] Backend independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio can transform SceneGraph into backend-independent DrawCommands.

---

# AI Constraints

Before implementation:

- Do not implement Canvas rendering.
- Do not implement WebGL rendering.
- Do not implement hit testing.
- Focus only on the rendering pipeline.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0074-scene-graph.md
- TASK-0081-renderer.md

---

# Next Task

TASK-0083-draw-command.md
