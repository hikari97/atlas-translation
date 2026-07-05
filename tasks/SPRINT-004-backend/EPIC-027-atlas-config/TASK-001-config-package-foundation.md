---
id: TASK-001
title: Config Package Foundation
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

# TASK-001 — Config Package Foundation

## Summary

Create the atlas-config package foundation, public entrypoint, package metadata, tsconfig, README, and initial tests scaffold.

---

## Goal

Create the atlas-config package foundation, public entrypoint, package metadata, tsconfig, README, and initial tests scaffold.

This task must keep `atlas-config` framework-independent, type-safe, provider-independent, and safe for future backend/runtime/plugin usage.

---

## Background

Atlas Studio needs one consistent configuration foundation for runtime behavior, plugins, backend services, AI provider settings, editor behavior, and future applications.

This package must separate configuration logic from application code. It should provide reusable primitives that other packages can consume through public APIs.

---

## Scope

### Included

- Package folder and metadata.
- Source entrypoint.
- Test scaffold.
- README package contract.

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

- Package folder and metadata.
- Source entrypoint.
- Test scaffold.
- README package contract.

---

## Files Allowed

```txt
packages/atlas-config/**
package.json
pnpm-workspace.yaml
tsconfig.json
tsconfig.base.json
```

---

## Files Forbidden

```txt
apps/**
plugins/**
packages/atlas-runtime/**
packages/atlas-core/**
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
