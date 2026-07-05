---
id: TASK-009
title: Container Dependency Graph
status: Completed
priority: High
story_points: 5
sprint: SPRINT-004-backend
epic: EPIC-028-atlas-container
package: atlas-container
owner: H.Makki
reviewer:
created_at: 2026-07-05
updated_at: 2026-07-05
---

# TASK-009 — Container Dependency Graph

## Summary

Implement dependency graph tracking for resolution and diagnostics.

---

## Goal

Track dependency graph information during registration and resolution for later diagnostics.

---

## Background

`atlas-container` is the dependency injection and service composition layer for Atlas backend packages. It should allow runtime, config, plugin, worker, and test code to register and resolve services without coupling Atlas packages to a specific framework, application, HTTP server, database, or external provider.

The container must stay explicit and predictable. It should not rely on decorators, runtime metadata reflection, or hidden global state.

---

## Scope

### Included

- Represent dependency graph nodes and edges.
- Build graph from explicit provider dependencies.
- Expose a safe graph snapshot for diagnostics.
- Keep graph read-only from public consumers.
- Add tests for graph generation.

### Excluded

- No visualization UI.
- No external graph library unless already used by repo.
- No circular dependency throwing yet unless part of helper behavior.
- No runtime event emission.

---

## Deliverables

```txt
packages/atlas-container/src/graph.ts
packages/atlas-container/src/container.ts
packages/atlas-container/src/index.ts
packages/atlas-container/tests/graph.test.ts
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

- Graph shows registered tokens and dependencies.
- Graph snapshot does not expose mutable internals.
- Unregistered dependency references are visible in diagnostics if possible.
- Graph works for value, class, and factory providers.
- Tests cover simple and nested graphs.

---

## Testing

- Run graph tests.
- Run resolver tests.
- Run TypeScript typecheck.

---

## Definition of Done

Container dependency relationships are inspectable for diagnostics and validation.

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

Keep graph identifiers based on token debug labels and internal token identity, not service instance values.
