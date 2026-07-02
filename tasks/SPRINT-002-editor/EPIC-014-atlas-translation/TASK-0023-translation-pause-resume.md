---
id: TASK-0023

title: Implement Translation Pause & Resume

status: Ready

priority: High

story_points: 8

sprint: SPRINT-003-batch-translation

epic: EPIC-014

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0023 — Implement Translation Pause & Resume

## Summary

Implement Pause and Resume support for TranslationRuntime.

Pause temporarily suspends scheduling of new TranslationItems.

Resume continues scheduling from the current runtime state.

Running TranslationWorkers are allowed to finish their current execution before the runtime enters the paused state.

---

# Capability

After this task is complete, users can pause and resume long-running translation sessions without losing progress.

---

# Goal

Provide a safe and predictable mechanism for temporarily suspending translation execution.

---

# Business Value

Users can:

- pause translation at any time
- resume later
- avoid restarting large translation jobs
- safely interrupt long-running operations

---

# Background

Pause does not terminate TranslationWorkers.

Workers already executing a TranslationItem are allowed to finish.

Scheduler stops dispatching new TranslationItems until Resume is requested.

---

# Scope

## Included

- Pause command
- Resume command
- Runtime state transition
- Scheduler coordination

## Excluded

- Cancellation
- Retry
- Recovery
- Worker interruption
- Pipeline interruption

---

# Deliverables

```text
packages/
└── atlas-translation/
    └── src/
        ├── TranslationPauseResume.ts
        └── index.ts
```

---

# Responsibilities

Pause & Resume is responsible for:

- suspending scheduling
- resuming scheduling
- preserving runtime state
- exposing pause status

Pause & Resume is NOT responsible for:

- cancelling workers
- restarting failed items
- recovering sessions
- pipeline execution

---

# Architecture

```text
User

↓

TranslationRuntime

↓

Pause Command

↓

TranslationScheduler

↓

Stop Dispatching
```

Resume performs the inverse operation.

---

# Execution Flow

```text
Running

↓

Pause Requested

↓

Scheduler Stops Dispatching

↓

Workers Finish Current Item

↓

Paused

↓

Resume Requested

↓

Scheduler Continues Dispatching
```

---

# Public API

```ts
interface TranslationRuntimeControl {
  pause(): Promise<void>;

  resume(): Promise<void>;

  readonly paused: boolean;
}
```

> **Catatan Arsitektur:** Pause hanya menghentikan penjadwalan pekerjaan baru. Pekerjaan yang sedang berjalan tidak dihentikan secara paksa.

---

# Dependency

Depends On

- TASK-0018 — TranslationRuntime
- TASK-0019 — TranslationScheduler
- TASK-0021 — TranslationWorker

---

# Risk

Medium

Incorrect pause handling may lead to inconsistent runtime state.

---

# Files Allowed

```text
packages/atlas-translation/src/**
```

---

# Files Forbidden

```text
packages/atlas-editor/**
packages/atlas-renderer/**
packages/atlas-plugin/**
apps/**
```

---

# Acceptance Criteria

- [ ] Pause command implemented.
- [ ] Resume command implemented.
- [ ] Running workers are not interrupted.
- [ ] Scheduler stops dispatching while paused.
- [ ] Runtime state preserved.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

TranslationRuntime can be paused and resumed without losing completed work or corrupting execution state.

---

# AI Constraints

Before implementation:

- Do not interrupt running workers.
- Do not cancel TranslationItems.
- Do not implement recovery.
- Focus only on pause and resume behavior.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0018-translation-runtime.md
- TASK-0019-translation-scheduler.md
- TASK-0021-translation-worker.md

---

# Next Task

TASK-0024-translation-recovery.md
