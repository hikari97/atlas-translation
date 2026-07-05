---
id: TASK-004
title: Container Provider
status: Completed
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

# TASK-004 — Container Provider

## Summary

Implement provider definitions for value, class, factory, and async factory registrations.

---

## Goal

Implement provider definitions for registering services as values, classes, factories, and async factories.

---

## Background

`atlas-container` is the dependency injection and service composition layer for Atlas backend packages. It should allow runtime, config, plugin, worker, and test code to register and resolve services without coupling Atlas packages to a specific framework, application, HTTP server, database, or external provider.

The container must stay explicit and predictable. It should not rely on decorators, runtime metadata reflection, or hidden global state.

---

## Scope

### Included

- Implement value provider type and helper.
- Implement class provider type and helper.
- Implement factory provider type and helper.
- Implement async factory provider type and helper.
- Add provider normalization if helpful.
- Add tests for provider shape and type inference.

### Excluded

- No actual resolution behavior beyond provider shape helpers.
- No lifecycle caching.
- No container scopes.
- No runtime integration.

---

## Deliverables

```txt
packages/atlas-container/src/provider.ts
packages/atlas-container/src/types.ts
packages/atlas-container/src/index.ts
packages/atlas-container/tests/provider.test.ts
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

- Providers can describe value, class, factory, and async factory services.
- Factory providers can declare dependencies explicitly.
- Provider helpers preserve generic service type information.
- Invalid provider shapes are rejected by TypeScript or normalization checks.
- Public exports are documented in README or comments if needed.

---

## Testing

- Run provider unit tests.
- Run TypeScript typecheck.
- Add tests for each provider kind.

---

## Definition of Done

Service providers can be declared without yet resolving them.

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

Dependency declarations should be explicit arrays of tokens to keep resolution deterministic.
