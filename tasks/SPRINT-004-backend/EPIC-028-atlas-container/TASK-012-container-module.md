---
id: TASK-012
title: Container Module
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

# TASK-012 — Container Module

## Summary

Implement container modules for grouped registrations and composition.

---

## Goal

Implement container modules for grouped service registrations and composition.

---

## Background

`atlas-container` is the dependency injection and service composition layer for Atlas backend packages. It should allow runtime, config, plugin, worker, and test code to register and resolve services without coupling Atlas packages to a specific framework, application, HTTP server, database, or external provider.

The container must stay explicit and predictable. It should not rely on decorators, runtime metadata reflection, or hidden global state.

---

## Scope

### Included

- Define module registration API.
- Support applying a module to a container.
- Support module dependencies or ordering metadata if needed.
- Prevent accidental duplicate module application if policy requires.
- Add tests for module composition.

### Excluded

- No atlas-runtime module integration yet.
- No dynamic import or filesystem discovery.
- No plugin module loading.
- No network loading.

---

## Deliverables

```txt
packages/atlas-container/src/module.ts
packages/atlas-container/src/container.ts
packages/atlas-container/src/index.ts
packages/atlas-container/tests/module.test.ts
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

- A module can register multiple services.
- Multiple modules can be composed into one container.
- Duplicate registrations follow existing registry policy.
- Module API stays framework-independent.
- Tests cover order and duplicate behavior.

---

## Testing

- Run module tests.
- Run registry and resolver tests.
- Run TypeScript typecheck.

---

## Definition of Done

Container registrations can be packaged into reusable modules.

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

Use simple functions or objects. Avoid coupling this to atlas-runtime until the dedicated integration task.
