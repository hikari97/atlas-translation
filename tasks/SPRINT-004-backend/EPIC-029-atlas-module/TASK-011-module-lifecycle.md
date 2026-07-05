---
id: TASK-011
title: Module Lifecycle
status: Completed
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

# TASK-011 — Module Lifecycle

## Summary

Implement lifecycle phases such as register, configure, start, stop, and dispose.

---

## Goal

Implement module lifecycle for `atlas-module` while keeping the package framework-independent, type-safe, deterministic, and isolated from app/runtime-specific infrastructure.

---

## Background

`atlas-module` is the Atlas backend module system. It coordinates explicit module definitions, manifests, dependencies, lifecycle hooks, and optional integration boundaries with config, container, runtime, and plugin systems.

This package must be usable by backend API, workers, CLI tools, tests, and future desktop runtimes without depending on UI, HTTP, database, external providers, or application code.

---

## Scope

### Included

- Implement lifecycle phase model and executor.
- Support phases such as register, configure, start, stop, and dispose when declared by modules.
- Execute modules in dependency-safe order for startup phases and reverse order for shutdown phases where appropriate.
- Support sync and async lifecycle hooks.

### Excluded

- Do not create an HTTP server or app runtime.
- Do not integrate concrete config/container/runtime packages yet.
- Do not implement plugin installation.

---

## Deliverables

```txt
packages/atlas-module/src/lifecycle.ts
packages/atlas-module/src/loader.ts
packages/atlas-module/src/graph.ts
packages/atlas-module/src/types.ts
packages/atlas-module/src/index.ts
packages/atlas-module/test/lifecycle.test.ts
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

- Lifecycle phases can be executed deterministically.
- Async hooks are awaited.
- Failures include module ID and phase in diagnostics.
- Shutdown/dispose ordering is safe and tested.

---

## Testing

- Test sync lifecycle hooks.
- Test async lifecycle hooks.
- Test phase failure diagnostics.
- Test reverse shutdown/dispose order.

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
