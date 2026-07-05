---
id: TASK-002
title: Container Types
status: Draft
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

# TASK-002 — Container Types

## Summary

Define the core type model for dependency tokens, registrations, providers, lifetimes, scopes, and resolver options.

---

## Goal

Define the type model that future tasks will use for registration, providers, lifetimes, scopes, and resolution.

---

## Background

`atlas-container` is the dependency injection and service composition layer for Atlas backend packages. It should allow runtime, config, plugin, worker, and test code to register and resolve services without coupling Atlas packages to a specific framework, application, HTTP server, database, or external provider.

The container must stay explicit and predictable. It should not rely on decorators, runtime metadata reflection, or hidden global state.

---

## Scope

### Included

- Define `ContainerToken<T>` or equivalent typed token abstraction.
- Define service lifetime enum or string union.
- Define registration, provider, resolver, and container option interfaces.
- Define sync/async resolution result types if needed.
- Define minimal diagnostic metadata types.
- Export types from the package public API.

### Excluded

- No concrete registry implementation.
- No resolver logic.
- No circular dependency detection implementation.
- No integration with other packages.

---

## Deliverables

```txt
packages/atlas-container/src/types.ts
packages/atlas-container/src/index.ts
packages/atlas-container/tests/types.test.ts
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

- All public types are generic where service type safety matters.
- Provider and registration types do not depend on application classes.
- Types compile in strict TypeScript mode.
- The package does not require decorators or reflection metadata.
- Type tests or compile-time examples validate common usage.

---

## Testing

- Run TypeScript typecheck.
- Run package tests if available.
- Add compile-time/type tests for token and provider generic behavior.

---

## Definition of Done

Core container type contracts are stable enough for implementation tasks to build on.

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

Use explicit tokens rather than relying on class names or strings only. Token identity should be deterministic and safe.
