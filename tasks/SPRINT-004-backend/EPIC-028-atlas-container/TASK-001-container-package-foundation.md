---
id: TASK-001
title: Container Package Foundation
status: Completed
priority: High
story_points: 3
sprint: SPRINT-004-backend
epic: EPIC-028-atlas-container
package: atlas-container
owner: H.Makki
reviewer:
created_at: 2026-07-05
updated_at: 2026-07-05
---

# TASK-001 — Container Package Foundation

## Summary

Create the atlas-container package foundation and package-level scaffolding.

---

## Goal

Create the package skeleton for `packages/atlas-container` so later tasks can add typed container behavior safely.

---

## Background

`atlas-container` is the dependency injection and service composition layer for Atlas backend packages. It should allow runtime, config, plugin, worker, and test code to register and resolve services without coupling Atlas packages to a specific framework, application, HTTP server, database, or external provider.

The container must stay explicit and predictable. It should not rely on decorators, runtime metadata reflection, or hidden global state.

---

## Scope

### Included

- Create package directory structure.
- Add package metadata consistent with existing Atlas packages.
- Add TypeScript configuration consistent with the monorepo.
- Add `src/index.ts` as the initial public export surface.
- Add test directory and placeholder smoke test if the repo test setup supports it.
- Update root workspace configuration only if required by the current repo package manager.

### Excluded

- No service registration implementation.
- No resolver implementation.
- No runtime/config/plugin integration.
- No global container instance.

---

## Deliverables

```txt
packages/atlas-container/
  README.md
  package.json
  tsconfig.json
  src/index.ts
  src/index.test.ts or tests/smoke.test.ts
```

---

## Files Allowed

```txt
packages/atlas-container/**
package.json
pnpm-workspace.yaml
workspace.json
turbo.json
tsconfig.json
tsconfig.base.json
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

- `packages/atlas-container` exists and can be imported by package name or workspace alias.
- Package build/typecheck works with the repository conventions.
- No production behavior is added beyond package scaffolding.
- README explains package purpose and non-goals.
- No app, UI, HTTP, database, or plugin code is modified.

---

## Testing

- Run available package typecheck/build commands.
- Run available package test command or smoke test.
- If no test runner exists, ensure TypeScript compilation validates the package.

---

## Definition of Done

The `atlas-container` package exists as an empty but valid, buildable package.

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

Prefer the same package manager and module format already used by existing packages. Do not introduce a new build system.
