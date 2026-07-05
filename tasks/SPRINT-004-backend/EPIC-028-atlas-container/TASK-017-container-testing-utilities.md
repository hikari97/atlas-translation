---
id: TASK-017
title: Container Testing Utilities
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

# TASK-017 — Container Testing Utilities

## Summary

Add utilities that make container behavior easy to test and override.

---

## Goal

Add test utilities for overriding services and constructing test containers.

---

## Background

`atlas-container` is the dependency injection and service composition layer for Atlas backend packages. It should allow runtime, config, plugin, worker, and test code to register and resolve services without coupling Atlas packages to a specific framework, application, HTTP server, database, or external provider.

The container must stay explicit and predictable. It should not rely on decorators, runtime metadata reflection, or hidden global state.

---

## Scope

### Included

- Add test container factory helper.
- Add service override helper.
- Add reset/dispose helper if needed.
- Document test usage examples.
- Add tests for testing utilities themselves.

### Excluded

- No dependency on a specific test runner unless already used.
- No mocking library dependency.
- No global test container.
- No app-level test fixtures.

---

## Deliverables

```txt
packages/atlas-container/src/testing.ts
packages/atlas-container/src/index.ts
packages/atlas-container/tests/testing.test.ts
packages/atlas-container/README.md
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

- Tests can create isolated containers easily.
- Overrides are explicit and scoped to a test container.
- Utilities do not leak state across tests.
- No test-runner-specific API is required.
- README includes a small test utility example.

---

## Testing

- Run testing utility tests.
- Run full package tests.
- Run TypeScript typecheck.

---

## Definition of Done

Developers can use atlas-container cleanly in package and application tests.

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

Keep these utilities optional exports. They should not be required for production usage.
