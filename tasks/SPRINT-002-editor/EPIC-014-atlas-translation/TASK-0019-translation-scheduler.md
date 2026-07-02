---
id: TASK-0019

title: Implement TranslationScheduler

status: Ready

priority: Critical

story_points: 13

sprint: SPRINT-003-batch-translation

epic: EPIC-014

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0019 — Implement TranslationScheduler

## Summary

Implement `TranslationScheduler`.

TranslationScheduler is the runtime coordinator responsible for deciding which TranslationItem should be executed next.

TranslationScheduler does **not** execute TranslationItems directly.

Execution is delegated to TranslationWorker.

---

# Capability

After this task is complete, Atlas Studio can schedule and distribute TranslationItems across multiple workers while maintaining a predictable execution strategy.

---

# Goal

Provide a scheduling engine that coordinates translation execution independently from queue management and pipeline execution.

---

# Business Value

Users can:

- translate hundreds of images
- utilize multiple CPU cores
- pause execution
- resume execution
- retry failed items

without changing TranslationPipeline.

---

# Background

TranslationScheduler receives TranslationItems from TranslationQueue.

Based on scheduling strategy, it selects the next TranslationItem and dispatches it to an available TranslationWorker.

TranslationScheduler owns coordination.

It does not own execution.

---

# Scope

## Included

- Scheduling
- Dispatching
- Concurrency control
- Worker allocation
- Runtime coordination

## Excluded

- Queue implementation
- Pipeline execution
- OCR
- Translation
- Retry policy
- Provider selection

---

# Deliverables

```text
packages/
└── atlas-translation/
    └── src/
        ├── TranslationScheduler.ts
        └── index.ts
```

---

# Responsibilities

TranslationScheduler is responsible for:

- selecting the next TranslationItem
- dispatching work
- respecting concurrency limits
- monitoring worker availability
- coordinating execution

TranslationScheduler is NOT responsible for:

- executing TranslationPipeline
- managing TranslationProvider
- translating text
- storing TranslationItems
- implementing retry logic

---

# Architecture

```text
TranslationRuntime

↓

TranslationScheduler

├─────────────┐
│             │
▼             ▼

TranslationQueue

TranslationWorker

↓

PipelineExecutor
```

TranslationScheduler sits between Queue and Worker.

---

# Scheduling Flow

```text
TranslationQueue

↓

Select Next Item

↓

Find Available Worker

↓

Dispatch Item

↓

Worker Executes

↓

Worker Returns Result

↓

Scheduler Updates Runtime
```

---

# Scheduling Strategy

The scheduling strategy must be replaceable.

Examples:

- FIFO
- Priority
- Round Robin
- Provider Aware
- Estimated Cost
- Future Strategies

The Scheduler must not depend on a single scheduling algorithm.

---

# Public API

```ts
interface TranslationScheduler {
  schedule(): Promise<void>;
}
```

> **Catatan Arsitektur:** Ini adalah kontrak minimal. Implementasi akhir dapat berkembang (misalnya menerima `TranslationQueue`, `TranslationWorkerPool`, atau strategi penjadwalan) tanpa mengubah tanggung jawab utama Scheduler sebagai pengambil keputusan.

---

# Lifecycle

```text
Created

↓

Started

↓

Scheduling

↓

Waiting

↓

Completed

↓

Disposed
```

---

# Dependency

Depends On

- TASK-0018 — TranslationRuntime
- TASK-0020 — TranslationQueue
- TASK-0021 — TranslationWorker
- TASK-0015 — PipelineExecutor

---

# Risk

High

TranslationScheduler is responsible for coordinating the entire runtime execution.

Poor scheduling design may reduce throughput and scalability.

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

- [ ] TranslationScheduler contract implemented.
- [ ] Scheduler independent from Worker implementation.
- [ ] Scheduler independent from Queue implementation.
- [ ] Scheduler supports replaceable scheduling strategies.
- [ ] No TranslationPipeline execution logic.
- [ ] Provider independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

TranslationScheduler can coordinate TranslationItem execution across multiple workers without directly executing TranslationPipeline.

Scheduling logic is isolated from Queue, Worker, and Provider implementations.

---

# AI Constraints

Before implementation:

- Do not implement Queue.
- Do not implement Worker.
- Do not implement Pipeline execution.
- Do not implement Retry.
- Do not implement Provider selection.
- Focus only on scheduling coordination.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0018-translation-runtime.md

---

# Next Task

TASK-0020-translation-queue.md
