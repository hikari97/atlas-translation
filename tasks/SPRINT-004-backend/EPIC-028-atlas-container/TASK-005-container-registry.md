---
id: TASK-005
title: Container Registry
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

# TASK-005 — Container Registry

## Summary

Implement the internal registry that stores service bindings without resolving them.

---

## Goal

Implement the internal registry that stores service bindings and supports lookup without resolving services.

---

## Background

`atlas-container` is the dependency injection and service composition layer for Atlas backend packages. It should allow runtime, config, plugin, worker, and test code to register and resolve services without coupling Atlas packages to a specific framework, application, HTTP server, database, or external provider.

The container must stay explicit and predictable. It should not rely on decorators, runtime metadata reflection, or hidden global state.

---

## Scope

### Included

- Add registry class or functional registry module.
- Support registering tokens with providers and lifetime metadata.
- Support checking if a token is registered.
- Support retrieving registration metadata.
- Support duplicate registration policy.
- Add registry tests.

### Excluded

- No service instance creation.
- No singleton caching.
- No scoped resolution.
- No circular dependency detection.

---

## Deliverables

```txt
packages/atlas-container/src/registry.ts
packages/atlas-container/src/errors.ts
packages/atlas-container/src/index.ts
packages/atlas-container/tests/registry.test.ts
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

- Registry can add, retrieve, and inspect registrations.
- Duplicate registration behavior is explicit and tested.
- Lookup for missing token does not silently return undefined unless API explicitly says so.
- Registry has no side effects outside package memory.
- Tests cover register, has, get, list, and duplicate cases.

---

## Testing

- Run registry unit tests.
- Run full package tests.
- Run TypeScript typecheck.

---

## Definition of Done

Registrations can be stored safely before resolution behavior is implemented.

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

Keep registry internal if possible. Public APIs should expose container-level registration rather than leaking all internals.
