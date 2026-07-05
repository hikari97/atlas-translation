---
id: TASK-002
title: Config Types
status: Completed
priority: High
story_points: 5
sprint: SPRINT-004-backend
epic: EPIC-027-atlas-config
package: atlas-config
owner: H.Makki
reviewer:
created_at: 2026-07-05
updated_at: 2026-07-05
---

# TASK-002 — Config Types

## Summary

Define the core type system for Atlas configuration, including config keys, config paths, config values, scopes, metadata, and typed result helpers.

---

## Goal

Define the core type system for Atlas configuration, including config keys, config paths, config values, scopes, metadata, and typed result helpers.

This task must keep `atlas-config` framework-independent, type-safe, provider-independent, and safe for future backend/runtime/plugin usage.

---

## Background

Atlas Studio needs one consistent configuration foundation for runtime behavior, plugins, backend services, AI provider settings, editor behavior, and future applications.

This package must separate configuration logic from application code. It should provide reusable primitives that other packages can consume through public APIs.

---

## Scope

### Included

- Type definitions.
- Readonly config shape.
- Config path utilities.
- Exported public types.

### Excluded

- UI implementation.
- App routes.
- Database integrations.
- Network loading.
- Filesystem loading unless explicitly required by this task.
- Provider-specific AI/OCR/translation integrations.
- Runtime business logic not required by this task.
- Unrelated refactors.

---

## Deliverables

- Type definitions.
- Readonly config shape.
- Config path utilities.
- Exported public types.

---

## Files Allowed

```txt
packages/atlas-config/**
```

---

## Files Forbidden

```txt
apps/**
plugins/**
```

---

## Acceptance Criteria

- The task goal is implemented according to scope.
- Public API is explicit and type-safe.
- Implementation is framework-independent.
- No application code is imported.
- No provider-specific behavior is introduced.
- Errors and diagnostics are deterministic and testable where applicable.
- Existing public APIs are not broken unless the task explicitly requires it.
- TypeScript strict mode passes.
- Tests are added or updated for the implemented behavior.

---

## Testing

Run the validation commands available in the repository, such as:

```bash
pnpm test
pnpm typecheck
pnpm build
```

If the repository uses package-specific commands, run the equivalent command for `atlas-config`.

The task is not complete until relevant tests pass.

---

## Definition of Done

- Code is implemented only within allowed files.
- Tests are added or updated.
- Public exports are updated if needed.
- Validation commands pass.
- No forbidden files are modified.
- Final report lists files changed, tests run, and remaining issues.

---

## AI Constraints

- Read this entire task before implementation.
- Do not skip ahead to later tasks.
- Do not expand the scope.
- Do not modify forbidden files.
- Do not implement UI, application routes, database integrations, or external provider integrations.
- Keep the package reusable and independent.
- Prefer small composable functions over hidden global state.
- Do not log raw secrets or secret-like values.
- Stop if validation fails and report the exact failure.
