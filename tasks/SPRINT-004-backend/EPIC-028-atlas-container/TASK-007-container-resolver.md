---
id: TASK-007
title: Container Resolver
status: Completed
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

# TASK-007 — Container Resolver

## Summary

Implement the resolver that creates service instances from registered providers.

---

## Goal

Implement the main resolver that creates service instances from registered providers.

---

## Background

`atlas-container` is the dependency injection and service composition layer for Atlas backend packages. It should allow runtime, config, plugin, worker, and test code to register and resolve services without coupling Atlas packages to a specific framework, application, HTTP server, database, or external provider.

The container must stay explicit and predictable. It should not rely on decorators, runtime metadata reflection, or hidden global state.

---

## Scope

### Included

- Implement `resolve` or equivalent synchronous resolution API.
- Resolve value providers.
- Resolve class providers with explicit dependency token lists.
- Resolve factory providers with explicit dependency token lists.
- Apply lifetime behavior from TASK-006.
- Add missing binding errors.
- Add resolver tests.

### Excluded

- No async factory resolution unless explicitly separated for TASK-011.
- No circular dependency detection beyond basic guard if needed.
- No module loading.
- No plugin-specific API.

---

## Deliverables

```txt
packages/atlas-container/src/container.ts
packages/atlas-container/src/resolver.ts
packages/atlas-container/src/errors.ts
packages/atlas-container/src/index.ts
packages/atlas-container/tests/resolver.test.ts
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

- Registered value providers can be resolved.
- Registered class providers can be resolved with dependencies.
- Registered factory providers can be resolved with dependencies.
- Missing registrations throw actionable errors.
- Lifetime semantics are respected during resolution.
- Tests cover nested dependencies.

---

## Testing

- Run resolver unit tests.
- Run full package tests.
- Run TypeScript typecheck.

---

## Definition of Done

Consumers can register and synchronously resolve services from `atlas-container`.

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

Keep dependency injection explicit. Do not inspect constructor parameter names or use metadata reflection.
