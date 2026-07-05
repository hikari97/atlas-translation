---
id: TASK-018
title: Module Public API
status: Draft
priority: High
story_points: 3
sprint: SPRINT-004-backend
epic: EPIC-029-atlas-module
package: atlas-module
owner: H.Makki
reviewer:
created_at: 2026-07-05
updated_at: 2026-07-05
---

# TASK-018 — Module Public API

## Summary

Finalize public exports, package README, examples, and API hardening for atlas-module.

---

## Goal

Implement module public api for `atlas-module` while keeping the package framework-independent, type-safe, deterministic, and isolated from app/runtime-specific infrastructure.

---

## Background

`atlas-module` is the Atlas backend module system. It coordinates explicit module definitions, manifests, dependencies, lifecycle hooks, and optional integration boundaries with config, container, runtime, and plugin systems.

This package must be usable by backend API, workers, CLI tools, tests, and future desktop runtimes without depending on UI, HTTP, database, external providers, or application code.

---

## Scope

### Included

- Finalize public exports from `src/index.ts`.
- Add or update package README with examples.
- Ensure examples cover module definition, registry, loader, lifecycle, and optional integration patterns.
- Harden public API naming and remove accidental internal exports.

### Excluded

- Do not add unrelated feature implementation.
- Do not change behavior unless needed for public API consistency.
- Do not wire app-level code.

---

## Deliverables

```txt
packages/atlas-module/src/index.ts
packages/atlas-module/README.md
packages/atlas-module/test/public-api.test.ts
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

- Public API exports are intentional and documented.
- README includes minimal working examples.
- Internal-only modules are not accidentally exported.
- All package tests and typechecks pass.

---

## Testing

- Run public API import tests.
- Run package tests.
- Run TypeScript checks.
- Run build if available.

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
