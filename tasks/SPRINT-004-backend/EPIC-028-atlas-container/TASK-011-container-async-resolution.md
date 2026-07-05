---
id: TASK-011
title: Container Async Resolution
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

# TASK-011 — Container Async Resolution

## Summary

Support asynchronous factories and explicit async resolution APIs.

---

## Goal

Support asynchronous factories through explicit async resolution APIs.

---

## Background

`atlas-container` is the dependency injection and service composition layer for Atlas backend packages. It should allow runtime, config, plugin, worker, and test code to register and resolve services without coupling Atlas packages to a specific framework, application, HTTP server, database, or external provider.

The container must stay explicit and predictable. It should not rely on decorators, runtime metadata reflection, or hidden global state.

---

## Scope

### Included

- Add async provider resolution support.
- Add `resolveAsync` or equivalent API.
- Handle async dependencies in deterministic order.
- Prevent sync `resolve` from silently resolving async providers.
- Apply lifetime caching to async results safely.
- Add tests for async resolution and error paths.

### Excluded

- No network/provider-specific logic.
- No background jobs.
- No automatic promise unwrapping in sync APIs.
- No HTTP integration.

---

## Deliverables

```txt
packages/atlas-container/src/async-resolver.ts
packages/atlas-container/src/container.ts
packages/atlas-container/src/errors.ts
packages/atlas-container/tests/async-resolution.test.ts
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

- Async factory providers resolve via async API.
- Sync resolve throws actionable error for async-only providers.
- Async singleton/scoped providers are cached after successful resolution.
- Rejected async factories do not poison caches.
- Async dependency chains are tested.

---

## Testing

- Run async resolution tests.
- Run full package tests.
- Run TypeScript typecheck.

---

## Definition of Done

The container supports services that require asynchronous construction without making all resolution ambiguous.

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

Keep async behavior explicit. This reduces surprising behavior in runtime startup code.
