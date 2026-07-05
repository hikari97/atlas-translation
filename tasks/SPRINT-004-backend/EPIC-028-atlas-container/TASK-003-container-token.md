---
id: TASK-003
title: Container Token
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

# TASK-003 — Container Token

## Summary

Implement typed dependency tokens used to register and resolve services safely.

---

## Goal

Implement typed dependency tokens that can be used as stable service identifiers.

---

## Background

`atlas-container` is the dependency injection and service composition layer for Atlas backend packages. It should allow runtime, config, plugin, worker, and test code to register and resolve services without coupling Atlas packages to a specific framework, application, HTTP server, database, or external provider.

The container must stay explicit and predictable. It should not rely on decorators, runtime metadata reflection, or hidden global state.

---

## Scope

### Included

- Implement token creation helper.
- Support optional token metadata such as name, description, or debug label.
- Ensure token identity is unique and stable.
- Expose safe token comparison behavior if needed.
- Add tests for token identity and type inference.

### Excluded

- No registration registry.
- No service resolution.
- No global token registry unless required for debug labels only.
- No decorator API.

---

## Deliverables

```txt
packages/atlas-container/src/token.ts
packages/atlas-container/src/index.ts
packages/atlas-container/tests/token.test.ts
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

- `createContainerToken<T>()` or equivalent creates a typed token.
- Two tokens with the same label are not accidentally treated as the same token unless explicitly designed.
- Token debug labels are safe for diagnostics.
- Token API is exported publicly.
- Tests cover identity, labels, and TypeScript usage.

---

## Testing

- Run token unit tests.
- Run TypeScript typecheck.
- Ensure no test relies on private implementation details.

---

## Definition of Done

Atlas services can be identified with typed, explicit dependency tokens.

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

Avoid using plain strings as the only source of identity. A symbol-backed token or branded object is safer.
