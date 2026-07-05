---
id: TASK-009
title: Module Graph
status: Draft
priority: High
story_points: 5
sprint: SPRINT-004-backend
epic: EPIC-029-atlas-module
package: atlas-module
owner: H.Makki
reviewer:
created_at: 2026-07-05
updated_at: 2026-07-05
---

# TASK-009 — Module Graph

## Summary

Implement module dependency graph construction and topological ordering.

---

## Goal

Implement module graph for `atlas-module` while keeping the package framework-independent, type-safe, deterministic, and isolated from app/runtime-specific infrastructure.

---

## Background

`atlas-module` is the Atlas backend module system. It coordinates explicit module definitions, manifests, dependencies, lifecycle hooks, and optional integration boundaries with config, container, runtime, and plugin systems.

This package must be usable by backend API, workers, CLI tools, tests, and future desktop runtimes without depending on UI, HTTP, database, external providers, or application code.

---

## Scope

### Included

- Build a dependency graph from registered or loaded modules.
- Support topological ordering for required dependencies.
- Represent optional dependencies without failing when absent unless strict options require it.
- Expose graph snapshots for diagnostics.

### Excluded

- Do not execute lifecycle hooks.
- Do not implement cycle detection beyond what is necessary to prevent unsafe ordering; full cycle diagnostics are TASK-010.
- Do not implement package manager resolution.

---

## Deliverables

```txt
packages/atlas-module/src/graph.ts
packages/atlas-module/src/dependency.ts
packages/atlas-module/src/types.ts
packages/atlas-module/src/index.ts
packages/atlas-module/test/graph.test.ts
```

---

## Files Allowed

```txt
packages/atlas-module/**
package.json
pnpm-workspace.yaml
tsconfig*.json
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
packages/atlas-plugin-*/**
```

---

## Acceptance Criteria

- Graph includes nodes and dependency edges.
- Topological ordering is deterministic.
- Missing required dependencies are diagnosable.
- Optional missing dependencies do not break default graph building.

---

## Testing

- Test graph construction.
- Test topological order.
- Test missing required dependency diagnostics.
- Test optional dependency behavior.

---

## Definition of Done

- The task scope is implemented only inside allowed files.
- Public APIs added by this task are exported intentionally.
- Tests cover the behavior introduced by this task.
- TypeScript validation passes.
- No forbidden files are modified.
- No unrelated refactor is included.

---

## AI Constraints

- Implement only this task.
- Do not expand scope beyond `atlas-module`.
- Do not implement UI, HTTP, database, network, filesystem discovery, package-manager discovery, or provider-specific integrations.
- Do not add hidden global mutable state.
- Do not require decorators or metadata reflection.
- Do not bypass public APIs of other Atlas packages.
- Preserve existing public APIs unless this task explicitly requires a change.
- If validation fails, stop and report the exact failure.

---

## Implementation Notes

Prefer small pure functions, explicit types, readonly data structures, clear errors/diagnostics, and deterministic output ordering. Keep optional integrations as narrow contracts so `atlas-module` does not become tightly coupled to app-level packages.
