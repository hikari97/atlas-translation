---
id: TASK-016
title: Container Diagnostics
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

# TASK-016 — Container Diagnostics

## Summary

Implement diagnostics, error classes, debug snapshots, and registration inspection.

---

## Goal

Implement diagnostics, error classes, debug snapshots, and registration inspection utilities.

---

## Background

`atlas-container` is the dependency injection and service composition layer for Atlas backend packages. It should allow runtime, config, plugin, worker, and test code to register and resolve services without coupling Atlas packages to a specific framework, application, HTTP server, database, or external provider.

The container must stay explicit and predictable. It should not rely on decorators, runtime metadata reflection, or hidden global state.

---

## Scope

### Included

- Create structured container errors.
- Create diagnostics snapshot API.
- Expose safe registration list or debug metadata.
- Redact values by default where appropriate.
- Add tests for diagnostics output.

### Excluded

- No telemetry export.
- No logging framework.
- No UI inspector.
- No external monitoring integration.

---

## Deliverables

```txt
packages/atlas-container/src/errors.ts
packages/atlas-container/src/diagnostics.ts
packages/atlas-container/src/index.ts
packages/atlas-container/tests/diagnostics.test.ts
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

- Errors have stable names/codes.
- Missing binding and circular dependency errors are actionable.
- Diagnostics do not expose sensitive service instance values by default.
- Snapshots are immutable or read-only from consumers.
- Tests cover error shape and diagnostic snapshots.

---

## Testing

- Run diagnostics tests.
- Run full package tests.
- Run TypeScript typecheck.

---

## Definition of Done

Container failures can be debugged without exposing unsafe internal state.

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

Prefer structured fields over message-only errors so future tooling can consume diagnostics.
