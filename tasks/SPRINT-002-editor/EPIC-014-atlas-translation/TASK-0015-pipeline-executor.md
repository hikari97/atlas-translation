---
id: TASK-0015

title: Implement PipelineExecutor

status: Completed

priority: Critical

story_points: 13

sprint: SPRINT-002-pipeline

epic: EPIC-014

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0015 — Implement PipelineExecutor

## Summary

Implement PipelineExecutor.

PipelineExecutor is responsible for executing a Translation Pipeline.

PipelineExecutor is the runtime component of the Translation Engine.

It traverses the Pipeline graph, executes PipelineStage instances, updates PipelineContext, publishes events, and produces execution snapshots.

PipelineExecutor owns runtime behavior.

TranslationPipeline owns structure.

---

# Capability

After this task is complete, Atlas Studio can execute a complete Translation Pipeline for one TranslationItem.

---

# Goal

Separate Pipeline definition from Pipeline execution.

---

# Business Value

The same TranslationPipeline can be executed:

- multiple times
- by different schedulers
- for preview
- for production
- for testing

without modification.

---

# Background

TranslationPipeline is immutable.

PipelineExecutor is created for every execution.

---

# Scope

Included

- Pipeline execution
- Node traversal
- Context propagation
- Snapshot generation
- Event publishing
- State updates

Excluded

- Scheduler
- Queue
- Workflow
- Retry
- Batch Translation

---

# Deliverables

```text
packages/
└── atlas-translation/
    └── src/
        ├── PipelineExecutor.ts
        └── index.ts
```

---

# Responsibilities

PipelineExecutor is responsible for:

- executing PipelineNode
- invoking PipelineStage
- creating new PipelineContext
- publishing pipeline events
- updating PipelineState
- creating snapshots

PipelineExecutor is NOT responsible for:

- selecting providers
- scheduling work
- managing batches
- retry policy
- workflow orchestration

---

# Architecture

```text
TranslationItem

↓

PipelineExecutor

↓

PipelineNode

↓

PipelineStage

↓

PipelineContext

↓

PipelineSnapshot
```

---

# Execution Flow

```text
TranslationItem

↓

Create PipelineContext

↓

Load Root Node

↓

Execute Stage

↓

Create New Context

↓

Publish Event

↓

Create Snapshot

↓

Move To Next Node

↓

Completed
```

---

# Public API

```ts
interface PipelineExecutor {
  execute(
    item: TranslationItem,
    pipeline: TranslationPipeline,
  ): Promise<PipelineContext>;
}
```

PipelineExecutor returns the final immutable PipelineContext.

No PipelineResult object is produced.

---

# Dependency

Depends On

- TASK-0008 — TranslationPipeline
- TASK-0009 — PipelineStage
- TASK-0010 — PipelineContext
- TASK-0011 — PipelineNode
- TASK-0012 — PipelineEvents
- TASK-0013 — PipelineSnapshot
- TASK-0014 — PipelineState

---

# Risk

High

PipelineExecutor is the runtime core of the Translation Engine.

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
packages/atlas-history/**
apps/**
```

---

# Acceptance Criteria

- [ ] Executes PipelineNode sequentially.
- [ ] Produces immutable PipelineContext.
- [ ] Publishes Pipeline Events.
- [ ] Produces Pipeline Snapshots.
- [ ] Updates PipelineState.
- [ ] Provider independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

PipelineExecutor can execute a TranslationPipeline from the root node until completion without depending on UI, Scheduler, or Workflow.

---

# AI Constraints

Before implementation:

- Do not implement Scheduler.
- Do not implement Retry.
- Do not implement Batch Translation.
- Do not implement Workflow.
- Focus only on executing a single TranslationPipeline.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0008-translation-pipeline.md
- TASK-0009-pipeline-stage.md
- TASK-0010-pipeline-context.md
- TASK-0011-pipeline-node.md
- TASK-0012-pipeline-events.md
- TASK-0013-pipeline-snapshot.md
- TASK-0014-pipeline-state.md

---

# Sprint Completion

After TASK-0015 is completed, Atlas Studio is capable of:

✓ Executing one TranslationItem

✓ Running a configurable Translation Pipeline

✓ Publishing runtime events

✓ Producing immutable snapshots

✓ Supporting future graph-based pipelines

Sprint 2 is complete.

---

# Next Task

TASK-0016-translation-session.md
