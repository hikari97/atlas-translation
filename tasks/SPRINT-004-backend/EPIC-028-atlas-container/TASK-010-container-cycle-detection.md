---
id: TASK-010
title: Container Cycle Detection
status: Draft
priority: High
story_points: 8
sprint: SPRINT-004-backend
epic: EPIC-028-atlas-container
package: atlas-container
owner: H.Makki
reviewer:
created_at: 2026-07-05
updated_at: 2026-07-05
---

# TASK-010 — Container Cycle Detection

## Summary

Detect circular dependencies and fail with actionable diagnostics.

---

## Goal

Detect circular dependencies during resolution and report clear error paths.

---

## Background

`atlas-container` is the dependency injection and service composition layer for Atlas backend packages. It should allow runtime, config, plugin, worker, and test code to register and resolve services without coupling Atlas packages to a specific framework, application, HTTP server, database, or external provider.

The container must stay explicit and predictable. It should not rely on decorators, runtime metadata reflection, or hidden global state.

---

## Scope

### Included

- Detect direct circular dependencies.
- Detect indirect circular dependencies.
- Include dependency path in error messages.
- Ensure failure does not poison container lifetime caches.
- Add tests for direct and indirect cycles.

### Excluded

- No graph visualization.
- No automatic cycle resolution.
- No lazy proxy injection unless explicitly required by a later task.
- No plugin-specific diagnostics.

---

## Deliverables

```txt
packages/atlas-container/src/cycle.ts
packages/atlas-container/src/errors.ts
packages/atlas-container/src/resolver.ts
packages/atlas-container/tests/cycle.test.ts
```

---

## Files Allowed

```txt
packages/atlas-container/**
```

---

## Files Forbidden

```txt
apps/**
plugins/**
packages/atlas-ui/**
packages/atlas-renderer/**
packages/atlas-http/**
packages/atlas-router/**
packages/atlas-request/**
packages/atlas-response/**
```

---

## Acceptance Criteria

- Direct cycle A -> A throws a container cycle error.
- Indirect cycle A -> B -> C -> A throws a container cycle error.
- Error includes a readable token path.
- Non-cyclic dependency graphs still resolve successfully.
- Failed resolutions do not leave partially cached singleton/scoped instances.

---

## Testing

- Run cycle tests.
- Run resolver and lifetime tests.
- Run TypeScript typecheck.

---

## Definition of Done

Circular dependencies are caught deterministically and reported safely.

---

## AI Constraints

- Implement only this task.
- Do not expand scope beyond `atlas-container`.
- Do not implement UI, HTTP, database, network, or provider-specific integrations.
- Do not add hidden global mutable state.
- Do not require decorators or metadata reflection.
- Do not bypass public APIs of other Atlas packages.
- Preserve existing public APIs unless this task explicitly requires a change.
- If validation fails, stop and report the exact failure.

---

## Implementation Notes

Maintain a per-resolution stack rather than a global mutable cycle state.
