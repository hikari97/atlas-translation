---
id: TASK-006
title: Container Lifetime
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

# TASK-006 — Container Lifetime

## Summary

Implement singleton, transient, and scoped service lifetimes.

---

## Goal

Implement service lifetimes: singleton, transient, and scoped.

---

## Background

`atlas-container` is the dependency injection and service composition layer for Atlas backend packages. It should allow runtime, config, plugin, worker, and test code to register and resolve services without coupling Atlas packages to a specific framework, application, HTTP server, database, or external provider.

The container must stay explicit and predictable. It should not rely on decorators, runtime metadata reflection, or hidden global state.

---

## Scope

### Included

- Define lifetime behavior clearly.
- Implement lifetime cache storage where appropriate.
- Support singleton instance reuse.
- Support transient new instance creation.
- Support scoped instance reuse inside a scope only.
- Add tests for lifetime behavior using simple providers.

### Excluded

- No child scope API beyond what is necessary for scoped lifetime tests.
- No plugin integration.
- No module system.
- No async lifecycle teardown yet unless already necessary.

---

## Deliverables

```txt
packages/atlas-container/src/lifetime.ts
packages/atlas-container/src/container.ts
packages/atlas-container/src/index.ts
packages/atlas-container/tests/lifetime.test.ts
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

- Singleton providers resolve once per root container.
- Transient providers resolve a fresh value per request.
- Scoped providers resolve once per scope.
- Lifetime defaults are documented and tested.
- Lifetime behavior is deterministic and does not leak across tests.

---

## Testing

- Run lifetime tests.
- Run registry/provider/token tests.
- Run TypeScript typecheck.

---

## Definition of Done

The container has a deterministic lifetime model ready for resolver integration.

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

Do not use global caches. Cache ownership must belong to the container or scope instance.
