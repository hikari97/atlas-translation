---
id: TASK-0086

title: Implement RenderCache

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

# TASK-0086 — Implement RenderCache

## Summary

Implement `RenderCache`.

RenderCache stores reusable rendering artifacts to reduce unnecessary rendering work.

RenderCache allows RenderPipeline and RenderBackend to reuse previously generated rendering results whenever possible.

RenderCache never owns SceneGraph or EditorObjects.

---

# Capability

After this task is complete, Atlas Studio can avoid redundant rendering and improve performance on large documents.

---

# Goal

Provide reusable rendering cache.

---

# Business Value

Supports:

- Partial redraw
- Dirty region rendering
- Layer caching
- DrawCommand caching
- Future GPU resource cache

---

# Background

Large editor documents often contain thousands of objects.

Most objects remain unchanged between frames.

RenderCache avoids rebuilding identical rendering results.

---

# Scope

## Included

- Cache contract
- Cache lookup
- Cache invalidation
- Cache metadata

## Excluded

- GPU texture cache
- Image decoding
- Asset loading
- Memory management

---

# Deliverables

```text
packages/
└── atlas-renderer/
    └── src/
        ├── RenderCache.ts
        ├── CacheEntry.ts
        ├── CacheKey.ts
        └── index.ts
```

---

# Responsibilities

RenderCache is responsible for:

- storing render artifacts
- cache lookup
- cache invalidation
- cache reuse

RenderCache is NOT responsible for:

- rendering
- scene traversal
- editor state
- asset loading

---

# Architecture

```text
SceneGraph

↓

RenderPipeline

↓

RenderCache

↓

DrawCommand[]

↓

RenderBackend
```

---

# Public API

```ts
interface RenderCache {
  get(key: CacheKey): CacheEntry | undefined;

  put(entry: CacheEntry): void;

  invalidate(key: CacheKey): void;
}
```

---

# Cached Items

Supports caching of:

- DrawCommand
- RenderPass output
- Layer output
- Visibility results
- Transform results

---

# Dependency

Depends On

- TASK-0082 — RenderPipeline
- TASK-0085 — RenderPass

---

# Risk

High

RenderCache becomes essential for rendering large projects efficiently.

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

- [ ] RenderCache implemented.
- [ ] Supports lookup.
- [ ] Supports invalidation.
- [ ] Immutable cache entries.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio reuses rendering artifacts through RenderCache to minimize redundant rendering work.

---

# AI Constraints

Before implementation:

- Do not implement GPU cache.
- Do not implement image cache.
- Do not implement memory eviction policy.
- Focus only on render artifact caching.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0082-render-pipeline.md
- TASK-0085-render-pass.md

---

# Next Task

TASK-0087-dirty-region.md
