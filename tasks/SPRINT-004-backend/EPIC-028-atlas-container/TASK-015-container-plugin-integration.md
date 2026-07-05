---
id: TASK-015
title: Plugin Integration
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

# TASK-015 — Plugin Integration

## Summary

Add safe plugin-facing registration and resolution patterns for Atlas plugins.

---

## Goal

Add safe plugin-facing registration and resolution patterns for Atlas plugins.

---

## Background

`atlas-container` is the dependency injection and service composition layer for Atlas backend packages. It should allow runtime, config, plugin, worker, and test code to register and resolve services without coupling Atlas packages to a specific framework, application, HTTP server, database, or external provider.

The container must stay explicit and predictable. It should not rely on decorators, runtime metadata reflection, or hidden global state.

---

## Scope

### Included

- Define plugin container facade or restricted resolver API.
- Allow plugins to register services within a controlled scope.
- Prevent plugins from mutating root container unexpectedly.
- Support plugin-scoped overrides where safe.
- Add tests for restricted plugin access.

### Excluded

- No actual plugin loader.
- No marketplace or external plugin execution.
- No sandboxing/security runtime.
- No filesystem discovery.

---

## Deliverables

```txt
packages/atlas-container/src/plugin-adapter.ts
packages/atlas-container/src/index.ts
packages/atlas-container/tests/plugin-adapter.test.ts
packages/atlas-container/README.md
```

---

## Files Allowed

```txt
packages/atlas-container/**
packages/atlas-plugin/src/index.ts
packages/atlas-plugin-sdk/src/index.ts
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

- Plugin-facing API exposes only safe registration/resolution operations.
- Plugin-scoped services do not mutate unrelated scopes.
- Root container mutation rules are explicit and tested.
- No plugin package private internals are imported.
- Tests cover plugin scoped registration and restricted access.

---

## Testing

- Run plugin adapter tests.
- Run full package tests.
- Run TypeScript typecheck.

---

## Definition of Done

Plugins can integrate with the container through a controlled, minimal API.

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

If plugin SDK naming differs in the repo, avoid hard dependency and keep adapter interfaces local.
