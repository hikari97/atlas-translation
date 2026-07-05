---
id: TASK-008
title: Container Scope
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

# TASK-008 — Container Scope

## Summary

Implement child scopes and scope isolation for request/runtime/plugin contexts.

---

## Goal

Implement container scopes and child containers for isolated contextual resolution.

---

## Background

`atlas-container` is the dependency injection and service composition layer for Atlas backend packages. It should allow runtime, config, plugin, worker, and test code to register and resolve services without coupling Atlas packages to a specific framework, application, HTTP server, database, or external provider.

The container must stay explicit and predictable. It should not rely on decorators, runtime metadata reflection, or hidden global state.

---

## Scope

### Included

- Add API to create child scope or scoped container.
- Scoped registrations inherit root registrations when appropriate.
- Scoped lifetime caches are isolated per scope.
- Allow scope-local overrides if explicitly supported.
- Add scope disposal stub if useful for later cleanup.
- Add tests for scope isolation.

### Excluded

- No request/HTTP integration.
- No plugin lifecycle integration.
- No async disposal unless required by existing API.
- No cross-scope mutation of root registrations unless explicitly allowed.

---

## Deliverables

```txt
packages/atlas-container/src/scope.ts
packages/atlas-container/src/container.ts
packages/atlas-container/src/index.ts
packages/atlas-container/tests/scope.test.ts
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

- A child scope can resolve root registrations.
- Scoped services are reused inside one scope and isolated across scopes.
- Overrides are deterministic and tested if supported.
- Root singleton behavior remains unchanged.
- No global state is introduced.

---

## Testing

- Run scope tests.
- Run lifetime and resolver tests.
- Run TypeScript typecheck.

---

## Definition of Done

The container can support runtime/request/plugin-specific contextual dependencies.

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

Think of scopes as logical contexts, not HTTP request objects. Keep the implementation generic.
