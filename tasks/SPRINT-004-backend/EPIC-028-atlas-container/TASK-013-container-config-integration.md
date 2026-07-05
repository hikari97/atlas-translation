---
id: TASK-013
title: Config Integration
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

# TASK-013 — Config Integration

## Summary

Add optional integration points for atlas-config without introducing a hard runtime dependency if avoidable.

---

## Goal

Add optional integration points that allow atlas-config values to be registered without coupling container to config internals.

---

## Background

`atlas-container` is the dependency injection and service composition layer for Atlas backend packages. It should allow runtime, config, plugin, worker, and test code to register and resolve services without coupling Atlas packages to a specific framework, application, HTTP server, database, or external provider.

The container must stay explicit and predictable. It should not rely on decorators, runtime metadata reflection, or hidden global state.

---

## Scope

### Included

- Define generic config registration helpers or adapter interfaces.
- Support registering typed config values by token.
- Support optional validation callback if provided by config package.
- Document how atlas-config can feed atlas-container.
- Add tests with local mock config objects.

### Excluded

- No dependency on private atlas-config internals.
- No file loading or environment parsing.
- No secret management implementation.
- No hard runtime dependency unless repo architecture requires it.

---

## Deliverables

```txt
packages/atlas-container/src/config-adapter.ts
packages/atlas-container/src/index.ts
packages/atlas-container/tests/config-adapter.test.ts
packages/atlas-container/README.md
```

---

## Files Allowed

```txt
packages/atlas-container/**
packages/atlas-config/src/index.ts
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

- Config values can be registered as typed container services.
- Integration works with plain objects or public config API only.
- No config file parsing is added to atlas-container.
- No circular package dependency is introduced.
- Tests use mock config values or public exported APIs only.

---

## Testing

- Run config adapter tests.
- Run package dependency/typecheck validation.
- Run full package tests.

---

## Definition of Done

atlas-container can consume configuration values through a safe public adapter pattern.

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

If `packages/atlas-config` does not exist yet, implement only mock-friendly adapter types inside `atlas-container` and document future usage.
