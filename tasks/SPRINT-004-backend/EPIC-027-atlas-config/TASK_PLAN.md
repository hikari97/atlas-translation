# EPIC-027 — atlas-config TASK_PLAN

Status: Draft  
Sprint: SPRINT-004-backend  
Epic: EPIC-027-atlas-config  
Package: atlas-config  
Owner: H.Makki  
Created: 2026-07-05  
Updated: 2026-07-05

---

## Purpose

Build `atlas-config`, a framework-independent configuration package for Atlas Studio.

`atlas-config` is responsible for describing, validating, resolving, merging, redacting, and exposing configuration used by backend/runtime packages, plugins, and future applications.

This epic should not implement UI, app routes, database integrations, network loading, or provider-specific behavior.

---

## Why this epic exists

Atlas Studio is designed as a plugin-based, type-safe, framework-independent platform. Configuration must be handled consistently across runtime, plugins, backend services, AI providers, editor packages, and future applications.

This package provides a central config foundation while keeping applications and providers decoupled.

---

## Core principles

- Framework independent.
- Type safe.
- Provider independent.
- No direct dependency on apps.
- No direct filesystem or network loading in the foundation tasks.
- No unsafe secret logging.
- Deterministic merge and resolution behavior.
- Clear diagnostics instead of silent failure.
- Public API should be explicit and stable.

---

## Suggested package location

```txt
packages/atlas-config/
```

Suggested package structure:

```txt
packages/atlas-config/
  README.md
  package.json
  tsconfig.json
  src/
    index.ts
    types/
    schema/
    defaults/
    source/
    parser/
    validation/
    normalizer/
    resolver/
    merge/
    environment/
    redaction/
    watch/
    diagnostics/
  tests/
```

---

## Task sequence

| Task | File | Goal | Status |
|---|---|---|---|
| TASK-001 | `TASK-001-config-package-foundation.md` | Create the atlas-config package foundation, public entrypoint, package metadata, tsconfig, README, and initial tests scaffold. | Draft |
| TASK-002 | `TASK-002-config-types.md` | Define the core type system for Atlas configuration, including config keys, config paths, config values, scopes, metadata, and typed result helpers. | Draft |
| TASK-003 | `TASK-003-config-schema.md` | Implement a provider-independent schema model used to describe config fields, defaults, validation rules, documentation, and deprecation metadata. | Draft |
| TASK-004 | `TASK-004-config-defaults.md` | Implement default configuration support using schema defaults and explicit default providers without relying on process environment or filesystem APIs. | Draft |
| TASK-005 | `TASK-005-config-source.md` | Define config source abstractions for memory, object, static, and future external sources without implementing filesystem or network access yet. | Draft |
| TASK-006 | `TASK-006-config-parser.md` | Implement parsing utilities that convert raw objects into normalized config input while preserving errors, paths, and source metadata. | Draft |
| TASK-007 | `TASK-007-config-validator.md` | Implement schema-based validation for parsed configuration including required fields, type checks, enum checks, custom validators, and warnings. | Draft |
| TASK-008 | `TASK-008-config-normalizer.md` | Normalize validated config values into a stable internal representation with predictable key ordering and readonly output. | Draft |
| TASK-009 | `TASK-009-config-resolver.md` | Resolve configuration by combining schema, defaults, parsed input, validation, normalization, and diagnostics into one public resolver flow. | Draft |
| TASK-010 | `TASK-010-config-merge.md` | Implement deterministic merge behavior for multiple config layers such as base, workspace, project, runtime, and plugin-provided layers. | Draft |
| TASK-011 | `TASK-011-config-environment.md` | Implement environment-aware config overlays without directly reading process.env; environment data must be injected through an explicit adapter. | Draft |
| TASK-012 | `TASK-012-config-secrets-redaction.md` | Add safe handling for secret-like config values, including secret metadata, redaction helpers, safe serialization, and diagnostic redaction. | Draft |
| TASK-013 | `TASK-013-config-runtime-integration.md` | Add optional integration contracts between atlas-config and atlas-runtime without creating a hard circular dependency. | Draft |
| TASK-014 | `TASK-014-config-plugin-integration.md` | Define plugin configuration registration contracts so plugins can declare schemas, defaults, and safe config metadata. | Draft |
| TASK-015 | `TASK-015-config-watch.md` | Implement a framework-independent config change subscription model for in-memory/config-source updates without filesystem watchers. | Draft |
| TASK-016 | `TASK-016-config-diagnostics.md` | Improve diagnostics for config parsing, validation, merge, resolution, and redaction with structured error codes and readable messages. | Draft |
| TASK-017 | `TASK-017-config-tests.md` | Add comprehensive tests for the atlas-config public API, edge cases, invalid input, precedence rules, redaction, and integration boundaries. | Draft |
| TASK-018 | `TASK-018-config-public-api.md` | Finalize atlas-config exports, README examples, API documentation, and package-level acceptance before the epic is considered complete. | Draft |

---

## Implementation order

Implement tasks sequentially.

Do not implement a later task before the previous task has passed validation.

Recommended batches:

```txt
Batch 1: TASK-001 to TASK-004
Batch 2: TASK-005 to TASK-009
Batch 3: TASK-010 to TASK-014
Batch 4: TASK-015 to TASK-018
```

---

## Global files allowed

Task-specific files allowed always override this section.

Usually allowed:

```txt
packages/atlas-config/**
```

Conditionally allowed only when required by the active task:

```txt
package.json
pnpm-workspace.yaml
tsconfig.json
tsconfig.base.json
packages/README.md
packages/atlas-runtime/**
packages/atlas-plugin/**
packages/atlas-plugin-sdk/**
```

---

## Global files forbidden

Unless a specific task explicitly allows it:

```txt
apps/**
plugins/**
docs/**
tasks/**
```

---

## Global acceptance criteria

The epic is complete when:

- `atlas-config` exists as an independent package.
- Config types, schemas, defaults, sources, parser, validator, normalizer, resolver, merge, environment overlays, redaction, watch model, and diagnostics are implemented.
- Public API is exported from `packages/atlas-config/src/index.ts`.
- Package documentation explains usage and boundaries.
- Tests cover normal and failure cases.
- Secret-like values are redacted from diagnostics and debug output.
- There are no direct app imports.
- There are no circular dependencies.
- Typecheck, tests, and build pass.

---

## Codex instruction

Use this prompt when generating missing task files:

```txt
Read tasks/SPRINT-004-backend/EPIC-027-atlas-config/TASK_PLAN.md.

Generate the missing task markdown files for EPIC-027-atlas-config.
Use the plan as the source of truth.
Do not implement production code.
Only create or update task markdown files in EPIC-027-atlas-config.
Each task must include Goal, Scope, Deliverables, Files Allowed, Files Forbidden, Acceptance Criteria, Testing, Definition of Done, and AI Constraints.
Stop after task files are complete.
```

Use this prompt when implementing a task batch:

```txt
Read TASK_PLAN.md and each task file in the requested batch.

Implement the tasks sequentially.
Before each task, read the full task file.
Only modify files listed in Files Allowed for the active task.
Do not modify files listed in Files Forbidden.
Do not expand scope.
Add or update tests for each task.
Run validation after each task.
If validation fails, stop and report the exact failure.
```
