---
id: TASK-0090

title: Implement Render Events

status: Completed

priority: Medium

story_points: 8

sprint: SPRINT-010-rendering-engine

epic: EPIC-014

package: atlas-renderer

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0090 — Implement Render Events

## Summary

Implement `RenderEvent`.

Render Events represent immutable runtime notifications emitted by the Rendering Engine during the rendering lifecycle.

They allow diagnostics, profiling, plugins, overlays, and telemetry to observe rendering activity without affecting rendering behavior.

Render Events never modify rendering state.

---

# Capability

After this task is complete, Atlas Studio exposes standardized rendering lifecycle events.

---

# Goal

Provide a unified rendering event model.

---

# Business Value

Supports:

- Debug Overlay
- Performance Monitor
- Plugin integration
- Diagnostics
- Telemetry
- Automated Benchmarking

without coupling event consumers to Renderer implementations.

---

# Background

Rendering naturally produces lifecycle events.

Example

Frame Started

↓

Pipeline Started

↓

Render Pass Started

↓

Draw Commands Executed

↓

Render Pass Finished

↓

Frame Finished

↓

Frame Presented

These events are notifications only.

---

# Scope

## Included

- Render event contract
- Event metadata
- Event typing
- Runtime notifications

## Excluded

- Event Bus
- Logging
- Telemetry upload
- Rendering

---

# Deliverables

```text
packages/
└── atlas-renderer/
    └── src/
        ├── RenderEvent.ts
        ├── RenderEventType.ts
        ├── RenderEventMetadata.ts
        └── index.ts
```

---

# Responsibilities

RenderEvent is responsible for:

- describing rendering lifecycle events
- exposing immutable runtime notifications
- supporting observers

RenderEvent is NOT responsible for:

- rendering
- dispatching events
- telemetry upload
- logging

---

# Architecture

```text
Renderer

↓

RenderEvent

↓

Profiler

↓

Overlay

↓

Plugin

↓

Telemetry
```

---

# Event Types

Minimum supported events

- FrameStarted
- FrameFinished
- PipelineStarted
- PipelineFinished
- RenderPassStarted
- RenderPassFinished
- DrawCommandExecuted
- CacheHit
- CacheMiss
- DirtyRegionUpdated
- BackendInitialized
- BackendDisposed

---

# Public API

```ts
interface RenderEvent {
  readonly id: string;

  readonly type: RenderEventType;

  readonly timestamp: Date;

  readonly frameNumber: number;
}
```

---

# Dependency

Depends On

- TASK-0084 — RenderBackend
- TASK-0085 — RenderPass
- TASK-0089 — RenderStatistics

---

# Risk

Low

Render Events expose rendering lifecycle without affecting rendering behavior.

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

- [ ] RenderEvent implemented.
- [ ] Immutable.
- [ ] Serializable.
- [ ] Supports rendering lifecycle events.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio exposes rendering runtime events independently from rendering implementations.

---

# AI Constraints

Before implementation:

- Do not implement Event Bus.
- Do not implement logging.
- Do not implement telemetry upload.
- Focus only on the RenderEvent model.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0084-render-backend.md
- TASK-0085-render-pass.md
- TASK-0089-render-statistics.md

---

# Sprint Completion

After Sprint 10 is completed, Atlas Studio is capable of:

✓ Rendering SceneGraph

✓ Building DrawCommands

✓ Supporting multiple RenderBackends

✓ Executing RenderPass pipelines

✓ Caching rendering artifacts

✓ Partial rendering with DirtyRegion

✓ Geometry-based Hit Testing

✓ Producing RenderStatistics

✓ Publishing RenderEvents

The Rendering Engine is now complete.

---

# Next Task

TASK-0091-input-event.md
