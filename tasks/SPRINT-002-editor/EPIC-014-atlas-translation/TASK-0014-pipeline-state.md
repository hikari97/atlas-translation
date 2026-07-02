---
id: TASK-0014

title: Implement PipelineState

status: Ready

priority: Medium

story_points: 5

sprint: SPRINT-002-pipeline

epic: EPIC-014

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0014 — Implement PipelineState

## Summary

Implement `PipelineState`, the immutable runtime state representing the current lifecycle of a Translation Pipeline execution.

PipelineState describes **what the Pipeline is currently doing**.

It never performs transitions.

State transitions are controlled exclusively by PipelineExecutor.

---

# Capability

After this task is complete, every Translation Pipeline execution exposes a consistent runtime state that can be observed by the Scheduler, Workflow, UI, and Diagnostics.

---

# Goal

Provide a provider-independent runtime state model for Translation Pipeline execution.

---

# Business Value

A unified state model allows Atlas Studio to:

- display pipeline status
- pause execution
- resume execution
- detect failures
- support recovery
- support diagnostics

without coupling to the Pipeline implementation.

---

# Background

Pipeline execution passes through several lifecycle stages.

Typical lifecycle:

```text
Created

↓

Ready

↓

Running

↓

Paused

↓

Completed
```

or

```text
Running

↓

Failed
```

or

```text
Running

↓

Cancelled
```

PipelineState only represents the current lifecycle.

It never executes transitions.

---

# Scope

## Included

- Pipeline lifecycle
- Immutable state
- Runtime state contract

## Excluded

- Pipeline execution
- Retry
- Recovery
- Scheduler
- Workflow
- Event publishing

---

# Deliverables

```text
packages/
└── atlas-translation/
    └── src/
        ├── PipelineState.ts
        └── index.ts
```

---

# Responsibilities

PipelineState is responsible for:

- representing current execution state
- remaining immutable
- exposing runtime status

PipelineState is NOT responsible for:

- executing transitions
- starting execution
- stopping execution
- retrying execution
- scheduling

---

# Architecture

```text
PipelineExecutor

↓

PipelineState

↓

PipelineSnapshot
```

PipelineExecutor owns state transitions.

PipelineState is a passive value object.

---

# Public API

```ts
type PipelineState =
  | 'created'
  | 'ready'
  | 'running'
  | 'paused'
  | 'completed'
  | 'failed'
  | 'cancelled';
```

> **Catatan Arsitektur:** Implementasi akhir dapat berupa string literal union, enum, atau value object mengikuti standar yang sudah digunakan di `atlas-types` atau `atlas-core`. Yang terpenting adalah `PipelineState` bersifat immutable dan tidak mengandung logika transisi.

---

# Lifecycle

```text
Created

↓

Ready

↓

Running

├──────► Paused ──────┐
│                     │
└──────── Resume ◄────┘

↓

Completed

or

Failed

or

Cancelled
```

Transition validation dilakukan oleh PipelineExecutor.

---

# Dependency

Depends On

- TASK-0008 — TranslationPipeline
- TASK-0013 — PipelineSnapshot

---

# Risk

Low

PipelineState hanya merupakan representasi status runtime.

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

- [ ] PipelineState implemented.
- [ ] Immutable.
- [ ] Provider independent.
- [ ] Serializable.
- [ ] Public export available.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

- Every Pipeline execution exposes exactly one PipelineState.
- State transitions are handled only by PipelineExecutor.
- PipelineState contains no execution logic.

---

# AI Constraints

Before implementation:

- Do not implement transition logic.
- Do not implement retry.
- Do not implement scheduler.
- Do not implement workflow.
- Focus only on runtime state representation.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0013-pipeline-snapshot.md

---

# Next Task

TASK-0015-pipeline-executor.md
