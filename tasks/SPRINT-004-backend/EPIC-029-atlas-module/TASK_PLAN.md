---
id: EPIC-029
title: atlas-module
status: Draft
priority: High
sprint: SPRINT-004-backend
package: atlas-module
owner: H.Makki
created_at: 2026-07-05
updated_at: 2026-07-05
---

# EPIC-029 — atlas-module

## Purpose

`atlas-module` provides the framework-independent module system for Atlas backend packages. It defines how Atlas packages declare modules, metadata, dependencies, lifecycle hooks, configuration needs, service registrations, runtime integration points, and plugin-facing extension contracts.

This package should sit above low-level runtime/config/container primitives while remaining reusable from backend API, workers, CLI tools, tests, and future desktop runtimes.

## Relationship to Previous Backend Epics

```txt
EPIC-026 atlas-runtime   -> lifecycle, runtime events, runtime execution model
EPIC-027 atlas-config    -> typed configuration, defaults, validation, resolution
EPIC-028 atlas-container -> dependency injection, providers, scopes, diagnostics
EPIC-029 atlas-module    -> module declaration, dependency graph, lifecycle orchestration
```

`atlas-module` may define optional integration surfaces for runtime, config, and container, but it must not become an app framework, HTTP server, database layer, or UI package.

## Design Principles

- Framework-independent TypeScript package.
- Explicit module definitions; no filesystem or network auto-discovery in core.
- Type-safe manifests, module IDs, dependencies, and lifecycle contracts.
- Deterministic load order using dependency graph ordering.
- Clear diagnostics for duplicate modules, missing dependencies, version conflicts, and cycles.
- No hidden global module registry.
- No decorators or reflection required.
- Optional integration points for config, container, runtime, and plugins.
- Tests for each module behavior before the package is used elsewhere.

## Proposed Package Path

```txt
packages/atlas-module/
```

## Task List

| Task | File | Goal |
|---|---|---|
| TASK-001 | `TASK-001-module-package-foundation.md` | Create the atlas-module package foundation and package-level scaffolding. |
| TASK-002 | `TASK-002-module-types.md` | Define core types for modules, manifests, capabilities, dependencies, lifecycle, and load options. |
| TASK-003 | `TASK-003-module-manifest.md` | Implement typed module manifests and manifest helper utilities. |
| TASK-004 | `TASK-004-module-definition.md` | Implement module definition APIs used by Atlas packages to declare modules explicitly. |
| TASK-005 | `TASK-005-module-metadata.md` | Implement normalized module metadata, identity, tags, compatibility, and version descriptors. |
| TASK-006 | `TASK-006-module-dependency.md` | Implement module dependency declarations, optional dependencies, and dependency constraints. |
| TASK-007 | `TASK-007-module-registry.md` | Implement the registry that stores module definitions and manifest metadata. |
| TASK-008 | `TASK-008-module-loader.md` | Implement deterministic module loading from explicit definitions without filesystem or network discovery. |
| TASK-009 | `TASK-009-module-graph.md` | Implement module dependency graph construction and topological ordering. |
| TASK-010 | `TASK-010-module-cycle-detection.md` | Detect circular module dependencies with actionable diagnostics. |
| TASK-011 | `TASK-011-module-lifecycle.md` | Implement lifecycle phases such as register, configure, start, stop, and dispose. |
| TASK-012 | `TASK-012-module-context.md` | Implement the module context passed to lifecycle hooks without coupling to apps or servers. |
| TASK-013 | `TASK-013-module-config-integration.md` | Add optional integration patterns for atlas-config based module configuration. |
| TASK-014 | `TASK-014-module-container-integration.md` | Add optional integration patterns for atlas-container registration and scoped resolution. |
| TASK-015 | `TASK-015-module-runtime-integration.md` | Add optional integration patterns for atlas-runtime lifecycle and runtime events. |
| TASK-016 | `TASK-016-module-plugin-bridge.md` | Add safe plugin-facing bridge patterns without coupling atlas-module to concrete plugin packages. |
| TASK-017 | `TASK-017-module-diagnostics-testing.md` | Implement diagnostics, inspection helpers, and test utilities for module systems. |
| TASK-018 | `TASK-018-module-public-api.md` | Finalize public exports, package README, examples, and API hardening for atlas-module. |

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
- Do not implement filesystem, network, or package-manager module discovery in the core package.
- Do not introduce decorator-only APIs or reflection requirements.
- Do not introduce a global mutable singleton module registry.

## Completion Criteria

- `atlas-module` has a stable public API.
- Modules can be defined with typed manifests and lifecycle hooks.
- Module dependencies can be declared, validated, sorted, and diagnosed.
- Duplicate modules, missing dependencies, version conflicts, and circular dependencies produce actionable errors.
- Config/container/runtime/plugin integration surfaces are explicit and optional.
- Tests cover module definition, registry, loader, graph, lifecycle, diagnostics, and public exports.
