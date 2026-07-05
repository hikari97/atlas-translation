---
id: TASK-0197

title: Implement WorkflowSession

status: Completed

priority: Critical

story_points: 21

sprint: SPRINT-021-workflow-system

epic: EPIC-017

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0197 — Implement WorkflowSession

## Summary

Implement `WorkflowSession`.

WorkflowSession represents the immutable runtime state of a single workflow execution.

It encapsulates execution progress, runtime context, node states, execution metadata, and workflow results while remaining provider independent.

---

# Capability

After this task is complete, Atlas Translation Platform can manage workflow execution through reusable runtime sessions.

---

# Goal

Provide unified workflow runtime management.

---

# Business Value

Supports

- Workflow execution
- Runtime monitoring
- Execution replay
- Diagnostics
- Audit
- Future distributed workflows

without coupling runtime state to WorkflowManager.

---

# Background

Every workflow execution has its own lifecycle.

WorkflowSession groups all runtime components into a single immutable execution model.

---

# Scope

## Included

- Session contract
- Session lifecycle
- Runtime metadata
- Progress
- Execution result

## Excluded

- Scheduling
- Workflow Designer
- Provider implementation
- UI

---

# Deliverables

```text
atlas-translation/

WorkflowSession.ts

WorkflowSessionState.ts

WorkflowSessionMetadata.ts

WorkflowSessionSnapshot.ts

index.ts
```

---

# Responsibilities

WorkflowSession is responsible for

- tracking workflow lifecycle
- exposing execution progress
- exposing runtime metadata
- exposing workflow results
- exposing execution state

WorkflowSession is NOT responsible for

- executing workflows
- workflow persistence
- provider implementation
- UI

---

# Architecture

```text
WorkflowExecutionPlan

↓

WorkflowSession

↓

WorkflowPipeline

↓

WorkflowProvider

↓

WorkflowResult
```

---

# Public API

```ts
interface WorkflowSession {
  readonly id: string;

  readonly metadata: WorkflowSessionMetadata;

  readonly snapshot: WorkflowSessionSnapshot;
}
```

---

# Session Lifecycle

```text
Created

↓

Preparing

↓

Running

↓

Waiting Approval

↓

Paused

↓

Resumed

↓

Completed

or

Cancelled

or

Failed
```

---

# Dependency

Depends On

- TASK-0193 — WorkflowPipeline
- TASK-0196 — WorkflowProgress

---

# Risk

High

WorkflowSession becomes the runtime container for every workflow execution inside Atlas Translation Platform.

---

# Files Allowed

```text
atlas-translation/**
```

---

# Files Forbidden

```text
None
```

---

# Acceptance Criteria

- [ ] WorkflowSession implemented.
- [ ] Immutable runtime model.
- [ ] Tracks workflow lifecycle.
- [ ] Exposes execution progress.
- [ ] Exposes execution result.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Translation Platform manages workflow execution through reusable WorkflowSession instances.

---

# AI Constraints

Before implementation

- Do not implement scheduling.
- Do not implement Workflow Designer.
- Do not implement provider-specific behavior.
- Focus only on the WorkflowSession abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0193-workflow-pipeline.md
- TASK-0196-workflow-progress.md

---

# Next Task

TASK-0198-workflow-statistics.md
