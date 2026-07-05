---
id: TASK-0020

title: Implement TranslationQueue

status: Completed

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

# TASK-0020 — Implement TranslationQueue

## Summary

Implement `TranslationQueue`.

TranslationQueue is the runtime collection responsible for tracking TranslationItems that are waiting, executing, paused, completed, cancelled, or failed.

TranslationQueue stores runtime execution state.

It does not decide execution order.

Execution order is determined exclusively by TranslationScheduler.

---

# Capability

After this task is complete, the Translation Engine can manage hundreds of TranslationItems during execution without modifying the original TranslationBatch.

---

# Goal

Provide a runtime queue that tracks execution progress independently from the persistent domain model.

---

# Business Value

Users can:

- translate multiple images
- pause translation
- resume translation
- retry failed images
- inspect queue status

without changing the original TranslationSession.

---

# Background

TranslationBatch is immutable.

TranslationQueue is mutable.

TranslationQueue exists only while TranslationRuntime is active.

When TranslationRuntime is disposed, TranslationQueue is destroyed.

---

# Scope

## Included

- Queue lifecycle
- Runtime item tracking
- Runtime lookup
- Queue inspection

## Excluded

- Scheduling
- Priority
- Worker execution
- Retry policy
- Provider selection

---

# Deliverables

```text
packages/
└── atlas-translation/
    └── src/
        ├── TranslationQueue.ts
        └── index.ts
```

---

# Responsibilities

TranslationQueue is responsible for:

- storing runtime TranslationItems
- exposing queue state
- tracking item execution status
- tracking running items
- tracking completed items
- tracking failed items

TranslationQueue is NOT responsible for:

- selecting the next item
- balancing workers
- executing pipelines
- prioritizing execution

---

# Architecture

```text
TranslationRuntime

↓

TranslationScheduler

↓

TranslationQueue

↓

TranslationItem
```

---

# Queue Lifecycle

```text
Created

↓

Items Enqueued

↓

Running

↓

Completed

↓

Disposed
```

Queue lifecycle follows TranslationRuntime.

---

# Public API

```ts
interface TranslationQueue {
  readonly size: number;

  readonly pending: readonly TranslationItem[];

  readonly running: readonly TranslationItem[];

  readonly completed: readonly TranslationItem[];

  readonly failed: readonly TranslationItem[];
}
```

> **Catatan Arsitektur:** API ini hanya menggambarkan kontrak publik. Operasi seperti enqueue, dequeue, markRunning, markCompleted, dan markFailed akan ditentukan pada tahap implementasi sesuai standar `atlas-core`.

---

# Dependency

Depends On

- TASK-0001 — TranslationItem
- TASK-0018 — TranslationRuntime
- TASK-0019 — TranslationScheduler

---

# Risk

Medium

TranslationQueue becomes the runtime source of truth for TranslationItem execution status.

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

- [ ] TranslationQueue contract implemented.
- [ ] Queue separated from TranslationBatch.
- [ ] Queue contains runtime state only.
- [ ] No scheduling logic.
- [ ] No worker logic.
- [ ] Provider independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

TranslationQueue becomes the runtime representation of TranslationItem execution while TranslationBatch remains immutable.

---

# AI Constraints

Before implementation:

- Do not implement scheduling.
- Do not implement retry.
- Do not implement worker execution.
- Do not implement provider selection.
- Focus only on runtime queue representation.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0017-translation-batch.md
- TASK-0018-translation-runtime.md
- TASK-0019-translation-scheduler.md

---

# Next Task

TASK-0021-translation-worker.md
