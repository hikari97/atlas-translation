---
id: TASK-010
title: Cancellation Model
status: Ready
priority: High
story_points: 5
sprint: SPRINT-006-ai-worker
epic: EPIC-063
area: ai-job-model
owner: H.Makki
reviewer:
created_at: 2026-07-05
updated_at: 2026-07-05
---

# TASK-010 — Cancellation Model

## Summary

Define cancellation request, cancellation token metadata, and cancellation result contracts.

This task belongs to **EPIC-063-ai-job-model** and must be implemented only inside the allowed AI worker paths.

---

# Capability

After this task is complete, Atlas Studio AI worker supports the **Cancellation Model** capability.

---

# Goal

Implement the smallest production-quality AI worker increment needed for **Cancellation Model**.

The result must be provider-neutral, deterministic, testable, safe for later AI tasks, and free from committed secrets.

---

# Business Value

This task moves Atlas Studio closer to automated manga, comic, and webtoon translation workflows by building reliable AI worker foundations.

---

# Background

SPRINT-006 focuses on the AI worker. The AI worker owns long-running AI operations such as OCR, bubble detection, translation, AI review, inpainting, rendering assistance, and normalized result generation.

The AI worker must not hardcode one provider. Provider-specific behavior must live behind replaceable adapter boundaries.

---

# Scope

## Included

- Implement the capability described by this task.
- Keep implementation inside the allowed AI worker paths.
- Add or update local tests.
- Use deterministic fake data/providers where needed.
- Include explicit error handling and safe serialization where relevant.
- Keep provider-specific code behind boundaries.

## Excluded

- Frontend UI implementation.
- Backend API route implementation outside the AI worker.
- Database schema implementation.
- Plugin marketplace implementation.
- Real production provider integration.
- Real secrets or credentials.
- Unbounded background processes started at import time.
- Large unrelated refactors.

---

# Deliverables

```txt
apps/ai-worker/**
packages/atlas-ai/**
```

Only create files needed by this task. Do not create unused placeholders.

---

# Technical Requirements

- Type-safe Python or TypeScript depending on the target folder convention.
- No real secrets in repository.
- No hardcoded single AI provider.
- No real network calls in tests.
- No provider SDK dependency unless the task explicitly requires a provider-neutral adapter boundary and repo conventions allow it.
- No runtime side effects during module import.
- Errors must be explicit and safely serializable.
- Tests must use deterministic fixtures and fake providers.
- Public/internal exports must be intentional and minimal.

---

# Files Allowed

```txt
apps/ai-worker/**
packages/atlas-ai/**
```


---

# Files Forbidden

```txt
Any path not listed in Files Allowed
apps/web/**
apps/api/**
packages/atlas-ui/**
plugins/**
docs/**
tasks/**
```

Do not edit task files while implementing this task.

---

# Dependencies

- TASK-009

If a dependency is missing or incompatible, stop and report it instead of inventing an architecture.

---

# Acceptance Criteria

- [ ] `Cancellation Model` is implemented inside the allowed AI worker paths.
- [ ] The implementation is provider-neutral.
- [ ] No real secrets, real credentials, or real provider calls are added.
- [ ] No forbidden files are modified.
- [ ] Tests cover success cases and relevant failure/edge cases.
- [ ] Validation commands pass or unavailable commands are reported.
- [ ] Existing public APIs are not broken unless this task explicitly requires it.

---

# Testing

Run the most specific available commands first.

For `apps/ai-worker`:

```bash
cd apps/ai-worker
pytest
python -m pytest
python -m mypy .
python -m ruff check .
```

For `packages/atlas-ai` if modified:

```bash
cd packages/atlas-ai
pnpm test
pnpm typecheck
pnpm build
```

If a command or package manager is unavailable, report it clearly instead of inventing a replacement.

---

# Risks

- Hardcoding one AI provider too early.
- Starting background workers during import.
- Adding real network calls to tests.
- Leaking provider secrets into config, logs, or fixtures.
- Mixing frontend/backend API concerns into the AI worker.
- Creating unstable result contracts that later frontend/backend features cannot consume.

---

# Definition of Done

- [ ] Implementation is complete.
- [ ] Tests are added or updated.
- [ ] Validation commands were run or reported as unavailable.
- [ ] No forbidden files were modified.
- [ ] Final report lists changed files, commands run, validation results, and unfinished items.

---

# AI Constraints

Before implementation:

- Read this entire task file.
- Implement only this task.
- Do not continue to the next task without explicit instruction.
- Do not broaden scope.
- Do not hardcode providers.
- Do not add real secrets.
- Do not modify frontend or backend app code.
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
- tasks/SPRINT-006-ai-worker/README.md

---

# Next Task

TASK-011-ai-job-priority-scheduling.md
