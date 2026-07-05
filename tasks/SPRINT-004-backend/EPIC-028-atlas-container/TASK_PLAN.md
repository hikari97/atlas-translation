---
id: EPIC-028
title: atlas-container
status: Draft
priority: High
sprint: SPRINT-004-backend
package: atlas-container
owner: H.Makki
created_at: 2026-07-05
updated_at: 2026-07-05
---

# EPIC-028 — atlas-container

## Purpose

`atlas-container` provides a small, framework-independent dependency injection and service container for Atlas backend packages. It is responsible for typed service registration, dependency resolution, lifetimes, scopes, module composition, diagnostics, and safe integration points with runtime, config, and plugin systems.

The package must remain independent from UI, HTTP servers, databases, external providers, and application code. It should be usable by backend API, workers, CLI tools, tests, and future desktop runtimes.

## Design Principles

- Framework-independent TypeScript package.
- Explicit registration before resolution.
- Type-safe tokens and service contracts.
- No hidden global container.
- No reflection or decorators required.
- Deterministic service lifetimes.
- Clear diagnostics for missing bindings and circular dependencies.
- Safe composition with runtime modules and plugins.
- Tests for each behavior before depending on the package elsewhere.

## Proposed Package Path

```txt
packages/atlas-container/
```

## Task List

| Task | File | Goal |
|---|---|---|
| TASK-001 | `TASK-001-container-package-foundation.md` | Create the atlas-container package foundation and package-level scaffolding. |
| TASK-002 | `TASK-002-container-types.md` | Define the core type model for dependency tokens, registrations, providers, lifetimes, scopes, and resolver options. |
| TASK-003 | `TASK-003-container-token.md` | Implement typed dependency tokens used to register and resolve services safely. |
| TASK-004 | `TASK-004-container-provider.md` | Implement provider definitions for value, class, factory, and async factory registrations. |
| TASK-005 | `TASK-005-container-registry.md` | Implement the internal registry that stores service bindings without resolving them. |
| TASK-006 | `TASK-006-container-lifetime.md` | Implement singleton, transient, and scoped service lifetimes. |
| TASK-007 | `TASK-007-container-resolver.md` | Implement the resolver that creates service instances from registered providers. |
| TASK-008 | `TASK-008-container-scope.md` | Implement child scopes and scope isolation for request/runtime/plugin contexts. |
| TASK-009 | `TASK-009-container-graph.md` | Implement dependency graph tracking for resolution and diagnostics. |
| TASK-010 | `TASK-010-container-cycle-detection.md` | Detect circular dependencies and fail with actionable diagnostics. |
| TASK-011 | `TASK-011-container-async-resolution.md` | Support asynchronous factories and explicit async resolution APIs. |
| TASK-012 | `TASK-012-container-module.md` | Implement container modules for grouped registrations and composition. |
| TASK-013 | `TASK-013-container-config-integration.md` | Add optional integration points for atlas-config without introducing a hard runtime dependency if avoidable. |
| TASK-014 | `TASK-014-container-runtime-integration.md` | Add optional integration patterns for atlas-runtime lifecycle, events, and modules. |
| TASK-015 | `TASK-015-container-plugin-integration.md` | Add safe plugin-facing registration and resolution patterns for Atlas plugins. |
| TASK-016 | `TASK-016-container-diagnostics.md` | Implement diagnostics, error classes, debug snapshots, and registration inspection. |
| TASK-017 | `TASK-017-container-testing-utilities.md` | Add utilities that make container behavior easy to test and override. |
| TASK-018 | `TASK-018-container-public-api.md` | Finalize exports, README, examples, and public API hardening for atlas-container. |

## Recommended Implementation Batches

```txt
Batch 1: TASK-001 to TASK-004
Batch 2: TASK-005 to TASK-008
Batch 3: TASK-009 to TASK-012
Batch 4: TASK-013 to TASK-016
Batch 5: TASK-017 to TASK-018
```

## Non-Goals

- Do not implement HTTP routing or request handling.
- Do not implement database connection logic.
- Do not implement external provider integrations.
- Do not implement UI or application routes.
- Do not introduce decorator-only APIs or reflection requirements.
- Do not introduce a global mutable singleton container.

## Completion Criteria

- `atlas-container` has a stable public API.
- Registrations are type-safe and explicit.
- Value, class, factory, and async factory providers are supported.
- Singleton, transient, and scoped lifetimes are supported.
- Missing dependencies and circular dependencies produce actionable errors.
- Module composition and scoped containers are tested.
- Public exports are documented and tested.
