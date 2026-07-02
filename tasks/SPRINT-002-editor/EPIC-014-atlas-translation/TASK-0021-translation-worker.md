---
id: TASK-0021

title: Implement TranslationWorker

status: Ready

priority: Critical

story_points: 8

sprint: SPRINT-003-batch-translation

epic: EPIC-014

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0021 — Implement TranslationWorker

## Summary

Implement `TranslationWorker`.

TranslationWorker is responsible for executing exactly one TranslationItem.

A TranslationWorker receives a TranslationItem, creates a PipelineExecutor, executes the TranslationPipeline, and returns the final PipelineContext.

TranslationWorker does not own scheduling decisions.

---

# Capability

After this task is complete, Atlas Studio can process TranslationItems independently, allowing multiple workers to execute translations in parallel.

---

# Goal

Provide an execution abstraction that isolates translation processing from scheduling.

---

# Business Value

The Translation Engine can scale from:

- one worker
- multiple local workers
- multiple processes
- remote workers
- distributed execution

without changing TranslationScheduler.

---

# Background

TranslationScheduler decides:

"What should run next?"

TranslationWorker decides:

"Execute this TranslationItem."

TranslationWorker owns execution only.

---

# Scope

## Included

- Worker contract
- TranslationItem execution
- PipelineExecutor lifecycle
- Runtime execution
- Result delivery

## Excluded

- Scheduling
- Queue management
- Retry
- Provider selection
- Workflow

---

# Deliverables

```text
packages/
└── atlas-translation/
    └── src/
        ├── TranslationWorker.ts
        └── index.ts
```

---

# Responsibilities

TranslationWorker is responsible for:

- receiving TranslationItem
- creating PipelineExecutor
- executing TranslationPipeline
- returning PipelineContext
- disposing runtime resources

TranslationWorker is NOT responsible for:

- scheduling
- queue management
- prioritization
- retry policy
- workflow

---

# Architecture

```text
TranslationScheduler

↓

TranslationWorker

↓

PipelineExecutor

↓

TranslationPipeline

↓

PipelineContext
```

Worker is the execution bridge between Scheduler and PipelineExecutor.

---

# Execution Flow

```text
Receive TranslationItem

↓

Create PipelineExecutor

↓

Execute TranslationPipeline

↓

Receive PipelineContext

↓

Dispose Executor

↓

Return Result
```

Each execution uses a fresh PipelineExecutor instance.

---

# Public API

```ts
interface TranslationWorker {
  execute(
    item: TranslationItem,
    pipeline: TranslationPipeline,
  ): Promise<PipelineContext>;
}
```

> **Catatan Arsitektur:** `PipelineExecutor` adalah detail implementasi internal. Kontrak publik Worker tidak mengekspos Executor kepada Scheduler.

---

# Lifecycle

```text
Idle

↓

Assigned

↓

Executing

↓

Completed

↓

Idle
```

atau

```text
Idle

↓

Assigned

↓

Executing

↓

Failed

↓

Idle
```

Worker selalu kembali ke keadaan **Idle** setelah pekerjaan selesai.

---

# Dependency

Depends On

- TASK-0001 — TranslationItem
- TASK-0008 — TranslationPipeline
- TASK-0015 — PipelineExecutor
- TASK-0019 — TranslationScheduler

---

# Risk

Medium

TranslationWorker becomes the execution abstraction for every TranslationItem.

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

- [ ] TranslationWorker contract implemented.
- [ ] Executes one TranslationItem only.
- [ ] Creates a new PipelineExecutor per execution.
- [ ] Does not contain scheduling logic.
- [ ] Does not manage Queue.
- [ ] Provider independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

TranslationWorker can execute a single TranslationItem and return the resulting PipelineContext without knowledge of Scheduler, Queue, or Workflow.

---

# AI Constraints

Before implementation:

- Do not implement Scheduler.
- Do not implement Queue.
- Do not implement Retry.
- Do not implement Workflow.
- Focus only on TranslationItem execution.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0008-translation-pipeline.md
- TASK-0015-pipeline-executor.md
- TASK-0019-translation-scheduler.md

---

# Next Task

TASK-0022-translation-progress.md
