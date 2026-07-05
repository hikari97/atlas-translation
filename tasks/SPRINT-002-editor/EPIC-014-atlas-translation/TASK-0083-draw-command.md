---
id: TASK-0083

title: Implement DrawCommand

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

# TASK-0083 — Implement DrawCommand

## Summary

Implement `DrawCommand`.

DrawCommand represents a backend-independent rendering instruction produced by RenderPipeline.

DrawCommands are immutable and executable by any RenderBackend.

DrawCommands never reference EditorObjects directly.

---

# Capability

After this task is complete, Atlas Studio can render using a unified command model independent of rendering backends.

---

# Goal

Provide an intermediate rendering representation.

---

# Business Value

Supports:

- Canvas2D
- WebGL
- Skia
- Metal
- Vulkan

using identical rendering instructions.

---

# Background

RenderPipeline transforms SceneGraph into DrawCommands.

RenderBackend consumes DrawCommands.

Editor models never reach RenderBackend.

---

# Scope

## Included

- Draw command contract
- Draw command metadata
- Render order
- Command typing

## Excluded

- Canvas rendering
- GPU rendering
- Scene traversal
- Rendering backend implementation

---

# Deliverables

```text
packages/
└── atlas-renderer/
    └── src/
        ├── DrawCommand.ts
        ├── DrawCommandType.ts
        ├── DrawCommandMetadata.ts
        └── index.ts
```

---

# Responsibilities

DrawCommand is responsible for:

- describing render operations
- remaining backend independent
- exposing immutable rendering data

DrawCommand is NOT responsible for:

- drawing
- traversing SceneGraph
- loading assets
- rendering text

---

# Architecture

```text
SceneGraph

↓

RenderPipeline

↓

DrawCommand[]

↓

RenderBackend
```

---

# Public API

```ts
interface DrawCommand {
  readonly id: string;

  readonly type: DrawCommandType;

  readonly zIndex: number;

  readonly metadata: DrawCommandMetadata;
}
```

---

# Example Command Types

- DrawImage
- DrawText
- DrawShape
- DrawPath
- DrawGroup
- PushClip
- PopClip
- PushOpacity
- PopOpacity
- PushTransform
- PopTransform

---

# Rendering Order

Commands are executed sequentially.

```text
PushTransform

↓

DrawImage

↓

DrawBubble

↓

DrawText

↓

PopTransform
```

---

# Dependency

Depends On

- TASK-0081 — Renderer
- TASK-0082 — RenderPipeline

---

# Risk

High

DrawCommand becomes the rendering contract shared by every rendering backend.

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

- [ ] DrawCommand implemented.
- [ ] Immutable.
- [ ] Serializable.
- [ ] Backend independent.
- [ ] Supports multiple command types.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio represents rendering instructions using DrawCommand independently from rendering backends.

---

# AI Constraints

Before implementation:

- Do not implement Canvas rendering.
- Do not implement GPU rendering.
- Do not implement SceneGraph traversal.
- Focus only on DrawCommand.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0081-renderer.md
- TASK-0082-render-pipeline.md

---

# Next Task

TASK-0084-render-backend.md
