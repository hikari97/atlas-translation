---
id: TASK-014
title: Container Integration
status: Completed
priority: High
story_points: 5
sprint: SPRINT-004-backend
epic: EPIC-029-atlas-module
package: atlas-module
owner: H.Makki
reviewer:
created_at: 2026-07-05
updated_at: 2026-07-05
---

# TASK-014 — Container Integration

## Summary

Add optional integration patterns for atlas-container registration and scoped resolution.

---

## Goal

Implement container integration for `atlas-module` while keeping the package framework-independent, type-safe, deterministic, and isolated from app/runtime-specific infrastructure.

---

## Background

`atlas-module` is the Atlas backend module system. It coordinates explicit module definitions, manifests, dependencies, lifecycle hooks, and optional integration boundaries with config, container, runtime, and plugin systems.

This package must be usable by backend API, workers, CLI tools, tests, and future desktop runtimes without depending on UI, HTTP, database, external providers, or application code.

---

## Scope

### Included

- Define optional atlas-container integration surfaces for module service registration.
- Allow modules to declare service registrations or a register hook that receives container-like capabilities.
- Support module-scoped registration patterns without hidden global container state.
- Keep integration explicit and testable.

### Excluded

- Do not implement atlas-container internals.
- Do not create global service containers.
- Do not require decorators or metadata reflection.

---

## Deliverables

```txt
packages/atlas-module/src/integrations/container.ts
packages/atlas-module/src/context.ts
packages/atlas-module/src/lifecycle.ts
packages/atlas-module/src/index.ts
packages/atlas-module/test/container-integration.test.ts
```

---

## Files Allowed

```txt
packages/atlas-module/**
package.json
pnpm-workspace.yaml
tsconfig*.json
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
packages/atlas-plugin-*/**
```

---

## Acceptance Criteria

- Modules can participate in service registration explicitly.
- Container integration can be mocked in tests.
- No global container is introduced.
- No circular package dependency is introduced.

---

## Testing

- Test module register hook with container-like context.
- Test missing container capability behavior.
- Test integration type contracts.

---

## Definition of Done

- The task scope is implemented only inside allowed files.
- Public APIs added by this task are exported intentionally.
- Tests cover the behavior introduced by this task.
- TypeScript validation passes.
- No forbidden files are modified.
- No unrelated refactor is included.

---

## AI Constraints

- Implement only this task.
- Do not expand scope beyond `atlas-module`.
- Do not implement UI, HTTP, database, network, filesystem discovery, package-manager discovery, or provider-specific integrations.
- Do not add hidden global mutable state.
- Do not require decorators or metadata reflection.
- Do not bypass public APIs of other Atlas packages.
- Preserve existing public APIs unless this task explicitly requires a change.
- If validation fails, stop and report the exact failure.

---

## Implementation Notes

Prefer small pure functions, explicit types, readonly data structures, clear errors/diagnostics, and deterministic output ordering. Keep optional integrations as narrow contracts so `atlas-module` does not become tightly coupled to app-level packages.
