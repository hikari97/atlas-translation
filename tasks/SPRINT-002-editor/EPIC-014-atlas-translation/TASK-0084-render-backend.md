---
id: TASK-0084

title: Implement RenderBackend

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

# TASK-0084 — Implement RenderBackend

## Summary

Implement `RenderBackend`.

RenderBackend defines the backend abstraction responsible for executing DrawCommands.

Each backend translates DrawCommands into platform-specific rendering operations.

RenderBackend never traverses SceneGraph.

---

# Capability

After this task is complete, Atlas Studio can support multiple rendering technologies without changing the rendering pipeline.

---

# Goal

Provide a backend-independent rendering execution layer.

---

# Business Value

Supports:

- Canvas2D
- WebGL
- Skia
- SVG
- Headless rendering
- Future Vulkan
- Future Metal

using the same DrawCommand stream.

---

# Background

RenderPipeline generates DrawCommands.

RenderBackend executes DrawCommands.

Backend implementations remain interchangeable.

---

# Scope

## Included

- Backend contract
- DrawCommand execution
- Backend lifecycle
- Backend capability reporting

## Excluded

- Scene traversal
- Editor integration
- GPU implementation
- Hit testing

---

# Deliverables

```text
packages/
└── atlas-renderer/
    └── src/
        ├── RenderBackend.ts
        ├── BackendCapabilities.ts
        ├── BackendType.ts
        └── index.ts
```

---

# Responsibilities

RenderBackend is responsible for:

- executing DrawCommands
- reporting backend capabilities
- managing rendering lifecycle

RenderBackend is NOT responsible for:

- traversing SceneGraph
- generating DrawCommands
- editing objects
- hit testing

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

↓

Platform Rendering API
```

---

# Public API

```ts
interface RenderBackend {
  readonly type: BackendType;

  readonly capabilities: BackendCapabilities;

  beginFrame(): void;

  execute(command: DrawCommand): void;

  endFrame(): void;
}
```

---

# Supported Backends

Minimum supported backend contracts:

- Canvas2D
- WebGL
- Skia
- SVG
- Headless

---

# Backend Lifecycle

```text
Begin Frame

↓

Execute DrawCommands

↓

End Frame

↓

Present
```

---

# Dependency

Depends On

- TASK-0083 — DrawCommand

---

# Risk

High

RenderBackend is the platform abstraction for all rendering.

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

- [ ] RenderBackend implemented.
- [ ] Executes DrawCommands.
- [ ] Backend independent.
- [ ] Reports backend capabilities.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio can execute DrawCommands using interchangeable rendering backends.

---

# AI Constraints

Before implementation:

- Do not implement Canvas2D.
- Do not implement WebGL.
- Do not implement Skia.
- Focus only on the backend abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0082-render-pipeline.md
- TASK-0083-draw-command.md

---

# Next Task

TASK-0085-render-pass.md
