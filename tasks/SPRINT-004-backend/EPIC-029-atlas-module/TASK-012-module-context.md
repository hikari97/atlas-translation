---
id: TASK-012
title: Module Context
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

# TASK-012 — Module Context

## Summary

Implement the module context passed to lifecycle hooks without coupling to apps or servers.

---

## Goal

Implement module context for `atlas-module` while keeping the package framework-independent, type-safe, deterministic, and isolated from app/runtime-specific infrastructure.

---

## Background

`atlas-module` is the Atlas backend module system. It coordinates explicit module definitions, manifests, dependencies, lifecycle hooks, and optional integration boundaries with config, container, runtime, and plugin systems.

This package must be usable by backend API, workers, CLI tools, tests, and future desktop runtimes without depending on UI, HTTP, database, external providers, or application code.

---

## Scope

### Included

- Implement module context passed to lifecycle hooks.
- Expose logger/diagnostics/config/container/runtime placeholders as optional context capabilities without hard app coupling.
- Support scoped context creation for module execution.
- Prevent lifecycle hooks from mutating internal loader state directly.

### Excluded

- Do not implement concrete logger, config, container, or runtime behavior.
- Do not import application code.
- Do not introduce global context.

---

## Deliverables

```txt
packages/atlas-module/src/context.ts
packages/atlas-module/src/lifecycle.ts
packages/atlas-module/src/types.ts
packages/atlas-module/src/index.ts
packages/atlas-module/test/context.test.ts
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

- Lifecycle hooks receive a typed module context.
- Context is explicit and safe to construct in tests.
- Optional capabilities can be present or absent.
- Internal state is not exposed mutably.

---

## Testing

- Test context creation.
- Test lifecycle hook receives context.
- Test optional capability absence.
- Test context isolation.

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
