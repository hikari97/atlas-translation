---
id: TASK-003
title: Job List
status: Ready
priority: High
story_points: 5
sprint: SPRINT-005-frontend
epic: EPIC-057
area: ai-workflow-job-ui
owner: H.Makki
reviewer:
created_at: 2026-07-05
updated_at: 2026-07-05
---

# TASK-003 — Job List

## Summary

Implement AI job list with status, progress, and timestamps.

This task belongs to **EPIC-057-ai-workflow-job-ui** and must be implemented only inside the allowed frontend paths.

---

# Capability

After this task is complete, Atlas Studio frontend supports the **Job List** capability.

---

# Goal

Implement the smallest production-quality frontend increment needed for **Job List**.

The result must be reusable, accessible, type-safe, deterministic, and safe for later frontend tasks.

---

# Business Value

This task moves Atlas Studio closer to a usable professional frontend for manga, comic, and webtoon translation workflows.

---

# Background

SPRINT-005 focuses on frontend implementation. The frontend should be a thin application layer that consumes package APIs and backend/API boundaries instead of duplicating backend logic.

Frontend code must keep UI concerns separate from business logic, avoid hidden global state, and avoid direct coupling to unavailable backend implementations.

---

# Scope

## Included

- Implement the UI or frontend capability described by this task.
- Keep implementation inside the allowed frontend paths.
- Add or update frontend-local tests.
- Use reusable components and typed state/data boundaries.
- Include loading, empty, error, disabled, and accessibility states where relevant.

## Excluded

- Backend implementation.
- Database implementation.
- AI provider implementation.
- Real external service integration.
- Plugin runtime implementation.
- Cross-sprint package rewrites.
- Large unrelated refactors.
- Design changes outside the active task.

---

# Deliverables

```txt
apps/web/**
```

Only create files needed by this task. Do not create unused placeholders.

---

# Technical Requirements

- TypeScript strict compatible.
- Use Chakra UI-compatible composition for app UI where applicable.
- Use Konva.js only for canvas/editor rendering tasks that require canvas behavior.
- No `any`, implicit `any`, or unsafe broad casting.
- No direct backend/database/provider calls from UI components.
- No package-to-app imports.
- No hidden global mutable state.
- No runtime side effects during module import.
- Components must be accessible by default.
- Components must support loading, empty, error, and disabled states where applicable.
- Public/internal exports must be intentional and minimal.
- Tests should use deterministic data and avoid real network calls.

---

# Files Allowed

```txt
apps/web/**
```


---

# Files Forbidden

```txt
Any path not listed in Files Allowed
apps/api/**
apps/ai-worker/**
packages/*/**
plugins/**
docs/**
tasks/**
```

If `packages/atlas-ui/**` is listed in Files Allowed, that package is the only package exception.

Do not edit task files while implementing this task.

---

# Dependencies

- TASK-002
- EPIC-044-web-state-data-access
- EPIC-056-translation-workbench-ui

If a dependency is missing or incompatible, stop and report it instead of inventing an architecture.

---

# Acceptance Criteria

- [ ] `Job List` is implemented inside the allowed frontend paths.
- [ ] The implementation is accessible and keyboard-aware where relevant.
- [ ] The implementation uses typed state/data boundaries.
- [ ] No forbidden files are modified.
- [ ] No real backend, database, AI, or provider integration is introduced.
- [ ] Tests cover success cases and relevant edge/failure states.
- [ ] TypeScript validation passes or unavailable commands are reported.
- [ ] Existing public frontend APIs are not broken unless this task explicitly requires it.

---

# Testing

Run the most specific available commands first. Because the public repository may not yet have a root workspace package configuration, prefer package-local commands when available.

For `apps/web` tasks:

```bash
cd apps/web
pnpm test
pnpm typecheck
pnpm build
```

For `packages/atlas-ui` tasks:

```bash
cd packages/atlas-ui
pnpm test
pnpm typecheck
pnpm build
```

If the repository already has working package filters, these are also acceptable:

```bash
pnpm --filter web test
pnpm --filter web typecheck
pnpm --filter web build
pnpm --filter atlas-ui test
pnpm --filter atlas-ui typecheck
pnpm --filter atlas-ui build
```

If neither package-local scripts nor workspace filters exist yet, report the missing commands clearly instead of inventing replacements.

---

# Risks

- UI components calling backend logic directly.
- Mock data leaking into production paths.
- Inaccessible controls or missing keyboard behavior.
- Duplicating domain logic that belongs in packages.
- Creating circular frontend feature imports.
- Expanding scope into editor, API, backend, or AI work not required by this task.

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
- Do not redesign architecture.
- Do not modify backend packages or apps.
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

TASK-004-ai-job-detail.md
