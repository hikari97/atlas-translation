---
id: TASK-0025

title: Implement Translation Cancel

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

# TASK-0025 — Implement Translation Cancel

## Summary

Implement Translation Cancel.

Translation Cancel gracefully terminates an active TranslationRuntime.

Cancellation prevents new TranslationItems from being scheduled while allowing currently executing workers to complete safely.

Cancellation affects runtime only.

TranslationSession remains persistent.

---

# Capability

After this task is complete, users can safely stop a running translation session without corrupting completed work or losing project data.

---

# Goal

Provide a safe runtime termination mechanism.

---

# Business Value

Users can:

- stop long-running translations
- close Atlas Studio safely
- preserve completed work
- avoid inconsistent runtime state

---

# Background

Cancel is different from Pause.

Pause:

```text
Running

↓

Paused

↓

Resume
```

Cancel:

```text
Running

↓

Stopping

↓

Workers Finish

↓

Disposed
```

Cancelled runtimes cannot be resumed.

A new TranslationRuntime must be created.

---

# Scope

## Included

- Cancel command
- Graceful shutdown
- Scheduler shutdown
- Worker drain
- Runtime disposal

## Excluded

- Pause
- Resume
- Recovery
- Retry
- TranslationSession deletion

---

# Deliverables

```text
packages/
└── atlas-translation/
    └── src/
        ├── TranslationRuntimeControl.ts
        └── index.ts
```

> **Catatan Arsitektur:** `cancel()` menjadi bagian dari `TranslationRuntimeControl`, bersama `pause()` dan `resume()`, sehingga seluruh kontrol runtime berada dalam satu komponen.

---

# Responsibilities

Translation Cancel is responsible for:

- stopping new scheduling
- allowing active workers to finish
- disposing runtime resources
- updating runtime state

Translation Cancel is NOT responsible for:

- deleting TranslationSession
- deleting TranslationBatch
- retrying TranslationItems
- interrupting active PipelineExecutor

---

# Architecture

```text
User

↓

TranslationRuntimeControl

↓

TranslationScheduler

↓

Stop Dispatching

↓

Workers Finish

↓

Dispose Runtime
```

---

# Cancellation Flow

```text
Running

↓

Cancel Requested

↓

Scheduler Stops Dispatching

↓

Workers Complete Current Item

↓

Dispose Queue

↓

Dispose Runtime

↓

Cancelled
```

---

# Public API

```ts
interface TranslationRuntimeControl {
  pause(): Promise<void>;

  resume(): Promise<void>;

  cancel(): Promise<void>;
}
```

---

# Dependency

Depends On

- TASK-0018 — TranslationRuntime
- TASK-0019 — TranslationScheduler
- TASK-0021 — TranslationWorker
- TASK-0023 — Translation Pause & Resume

---

# Risk

Medium

Improper cancellation may leave runtime resources in an inconsistent state.

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

- [ ] Cancel command implemented.
- [ ] Scheduler stops dispatching new work.
- [ ] Active workers complete current TranslationItem.
- [ ] Runtime resources disposed safely.
- [ ] TranslationSession remains unchanged.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

TranslationRuntime can be terminated gracefully without affecting persistent TranslationSession data.

---

# AI Constraints

Before implementation:

- Do not interrupt PipelineExecutor.
- Do not delete TranslationSession.
- Do not implement Retry.
- Focus only on graceful runtime shutdown.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0018-translation-runtime.md
- TASK-0023-translation-pause-resume.md

---

# Sprint Completion

After Sprint 3 is completed, Atlas Studio is capable of:

✓ Managing TranslationSession

✓ Translating multiple images in one batch

✓ Scheduling TranslationItems across multiple workers

✓ Tracking runtime progress

✓ Pausing and resuming translation

✓ Recovering interrupted sessions

✓ Gracefully cancelling translation

The Translation Runtime Layer is now complete.

---

# Next Task

TASK-0026-provider-registry.md
