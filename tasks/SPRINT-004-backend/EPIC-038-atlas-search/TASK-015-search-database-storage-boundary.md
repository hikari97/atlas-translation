---
id: TASK-015
title: Database Storage Boundary
status: Completed
priority: High
story_points: 5
sprint: SPRINT-004-backend
epic: EPIC-038
package: atlas-search
owner: H.Makki
reviewer:
created_at: 2026-07-05
updated_at: 2026-07-05
---

# TASK-015 — Database Storage Boundary

## Summary

Expose optional boundaries to atlas-database and atlas-storage public APIs.

This task belongs to **EPIC-038-atlas-search** and must be implemented only inside `atlas-search`.

---

# Capability

After this task is complete, Atlas supports the `Database Storage Boundary` capability for `atlas-search`.

---

# Goal

Implement the smallest production-quality increment needed for **Database Storage Boundary**.

The result must be reusable, framework-independent, type-safe, deterministic, and safe for later tasks.

---

# Business Value

This task supports the backend foundation of Atlas Studio by keeping infrastructure behavior inside reusable packages instead of application routes or UI code.

---

# Background

Atlas Studio uses reusable packages as the foundation of the platform. Applications should orchestrate packages, while packages own business and infrastructure logic.

`atlas-search` is part of SPRINT-004-backend and must follow package boundaries, public API rules, and task scope.

---

# Scope

## Included

- Implement the capability described by this task.
- Keep code inside `packages/atlas-search`.
- Add or update package-local tests.
- Export public API only when required by this task or later tasks.
- Use explicit errors and deterministic behavior.

## Excluded

- UI implementation.
- Application route implementation.
- Express server startup.
- Real external service providers.
- Hosted vendor SDK integrations.
- Cross-package private imports.
- Unrelated package refactors.
- Hidden global mutable state.

---

# Deliverables

```txt
packages/atlas-search/src/**
packages/atlas-search/tests/**
packages/atlas-search/package.json
packages/atlas-search/tsconfig.json
```

Only create files needed by this task. Do not create unused placeholders.

---

# Technical Requirements

- TypeScript strict compatible.
- No `any`, implicit `any`, or unsafe broad casting.
- No circular package dependencies.
- No package-to-app imports.
- No provider-specific behavior in core abstractions.
- No runtime side effects during import.
- Public APIs must be exported from the package entrypoint.
- Internal implementation files must not be required by consumers.
- Errors must fail explicitly with useful messages.

---

# Files Allowed

```txt
packages/atlas-search/**
```



---

# Files Forbidden

```txt
Any path outside packages/atlas-search/**
apps/**
plugins/**
docs/**
tasks/**
```

Do not edit task files while implementing this task.

---

# Dependencies

- TASK-014
- EPIC-030-atlas-database
- EPIC-033-atlas-storage
- EPIC-027-atlas-config

If a dependency is missing or incompatible, stop and report it instead of inventing an architecture.

---

# Acceptance Criteria

- [x] `Database Storage Boundary` is implemented inside `packages/atlas-search`.
- [x] The implementation is framework-independent.
- [x] The implementation is provider-independent unless this task explicitly defines a provider-neutral adapter.
- [x] Public exports are intentional and minimal.
- [x] Package-local tests cover success cases and relevant edge/failure cases.
- [x] No forbidden files are modified.
- [x] TypeScript validation passes or unavailable commands are reported.
- [x] Existing public APIs are not broken unless the task explicitly requires it.

---

# Testing

Run the most specific available commands first:

```bash
pnpm --filter atlas-search test
pnpm --filter atlas-search typecheck
pnpm --filter atlas-search build
```

If package filters are unavailable, run the closest root commands:

```bash
pnpm test
pnpm typecheck
pnpm build
```

If a command does not exist, report it clearly.

---

# Risks

- Scope creep into application code.
- Coupling to a concrete provider too early.
- Creating circular dependencies between backend packages.
- Exporting unstable internals as public API.
- Adding root workspace changes without explicit need.

---

# Definition of Done

- [x] Implementation is complete.
- [x] Tests are added or updated.
- [x] Validation commands were run or reported as unavailable.
- [x] No forbidden files were modified.
- [x] Final report lists changed files, commands run, validation results, and unfinished items.

---

# AI Constraints

Before implementation:

- Read this entire task file.
- Implement only this task.
- Do not continue to the next task without explicit instruction.
- Do not broaden scope.
- Do not redesign architecture.
- Do not modify unrelated packages.
- Do not add external dependencies unless unavoidable and already consistent with repo conventions.
- Stop and report when requirements conflict with the current repository.

---

# References

- README.MD
- AGENTS.md
- CONSTITUTION.md
- DO_NOT_BREAK.md
- tasks/README.md
- tasks/templates/TASK_TEMPLATE.md

---

# Next Task

TASK-016-search-config-integration.md
