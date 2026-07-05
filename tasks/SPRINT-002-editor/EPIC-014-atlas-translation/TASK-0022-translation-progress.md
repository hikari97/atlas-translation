---
id: TASK-0022

title: Implement TranslationProgress

status: Completed

priority: Medium

story_points: 5

sprint: SPRINT-003-batch-translation

epic: EPIC-014

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0022 — Implement TranslationProgress

## Summary

Implement `TranslationProgress`.

TranslationProgress is an immutable runtime snapshot describing the current progress of a translation process.

It can represent progress at different levels of the Translation Engine, such as Session, Batch, Queue, Worker, Pipeline, or Stage.

---

# Capability

After this task is complete, Atlas Studio can consistently report translation progress across all runtime components.

---

# Goal

Provide a unified progress model that can be consumed by UI, diagnostics, and monitoring without depending on runtime implementation.

---

# Business Value

Users can:

- monitor translation progress
- estimate remaining work
- display progress bars
- inspect execution statistics

using a single progress contract.

---

# Background

Progress exists at multiple levels.

Examples:

```text
TranslationSession

↓

TranslationBatch

↓

TranslationQueue

↓

TranslationWorker

↓

TranslationPipeline

↓

PipelineStage
```

Each level may expose its own progress snapshot.

---

# Scope

## Included

- Progress contract
- Immutable progress snapshot
- Statistics
- Completion percentage

## Excluded

- Progress calculation
- UI rendering
- Event publishing
- Scheduler logic

---

# Deliverables

```text
packages/
└── atlas-translation/
    └── src/
        ├── TranslationProgress.ts
        └── index.ts
```

---

# Responsibilities

TranslationProgress is responsible for:

- reporting progress
- reporting completed work
- reporting remaining work
- exposing immutable statistics

TranslationProgress is NOT responsible for:

- calculating execution order
- scheduling
- executing pipelines
- updating UI

---

# Architecture

```text
TranslationRuntime

↓

TranslationProgress

↓

UI / Diagnostics
```

---

# Public API

```ts
interface TranslationProgress {
  readonly total: number;

  readonly completed: number;

  readonly running: number;

  readonly failed: number;

  readonly cancelled: number;

  readonly percentage: number;
}
```

> **Catatan Arsitektur:** `TranslationProgress` adalah snapshot. Nilainya dihitung oleh komponen runtime (Scheduler, Queue, Pipeline, dll.), bukan oleh objek ini sendiri.

---

# Dependency

Depends On

- TASK-0018 — TranslationRuntime
- TASK-0019 — TranslationScheduler
- TASK-0020 — TranslationQueue

---

# Risk

Low

Progress is a read-only runtime representation.

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

- [ ] TranslationProgress contract implemented.
- [ ] Immutable.
- [ ] Serializable.
- [ ] Provider independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Any runtime component can expose progress using the TranslationProgress contract.

---

# AI Constraints

Before implementation:

- Do not calculate progress.
- Do not implement UI.
- Do not publish events.
- Focus only on the progress contract.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0018-translation-runtime.md
- TASK-0019-translation-scheduler.md
- TASK-0020-translation-queue.md

---

# Next Task

TASK-0023-translation-pause-resume.md
