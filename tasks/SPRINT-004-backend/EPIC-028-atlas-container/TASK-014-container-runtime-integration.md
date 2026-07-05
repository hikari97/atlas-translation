---
id: TASK-014
title: Runtime Integration
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

# TASK-014 — Runtime Integration

## Summary

Add optional integration patterns for atlas-runtime lifecycle, events, and modules.

---

## Goal

Add integration patterns for atlas-runtime without coupling container to runtime internals.

---

## Background

`atlas-container` is the dependency injection and service composition layer for Atlas backend packages. It should allow runtime, config, plugin, worker, and test code to register and resolve services without coupling Atlas packages to a specific framework, application, HTTP server, database, or external provider.

The container must stay explicit and predictable. It should not rely on decorators, runtime metadata reflection, or hidden global state.

---

## Scope

### Included

- Define runtime container bootstrap helper or adapter interface.
- Support registering runtime services through container modules.
- Support runtime lifecycle hooks only through public/public-like interfaces.
- Document how runtime creates a root container and scopes.
- Add tests with local runtime mocks.

### Excluded

- No runtime implementation changes unless strictly needed and allowed.
- No server startup.
- No event bus implementation.
- No plugin loading.

---

## Deliverables

```txt
packages/atlas-container/src/runtime-adapter.ts
packages/atlas-container/src/index.ts
packages/atlas-container/tests/runtime-adapter.test.ts
packages/atlas-container/README.md
```

---

## Files Allowed

```txt
packages/atlas-container/**
packages/atlas-runtime/src/index.ts
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

- Runtime can create or receive a container through an adapter pattern.
- Runtime integration uses public APIs only.
- Container does not depend on runtime private files.
- No circular dependency is introduced.
- Tests validate behavior using mocks if atlas-runtime is incomplete.

---

## Testing

- Run runtime adapter tests.
- Run dependency/typecheck validation.
- Run full package tests.

---

## Definition of Done

atlas-container can be composed with atlas-runtime safely once runtime integration is needed.

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

If `packages/atlas-runtime` is incomplete, keep this as generic adapter code and documentation. Do not force runtime changes.
