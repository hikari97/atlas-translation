---
id: TASK-0126

title: Implement ImportProgress

status: Completed

priority: Medium

story_points: 13

sprint: SPRINT-014-import-system

epic: EPIC-017

package: atlas-import

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0126 — Implement ImportProgress

## Summary

Implement `ImportProgress`.

ImportProgress represents the immutable progress state of an import operation.

It provides structured progress information for user interfaces, plugins, diagnostics, and automation systems without exposing pipeline internals.

ImportProgress is platform independent.

---

# Capability

After this task is complete, Atlas Studio can report import progress consistently across all import providers.

---

# Goal

Provide standardized import progress reporting.

---

# Business Value

Supports:

- Progress bars
- Import dialogs
- Batch import monitoring
- Plugin notifications
- Diagnostics
- Future cloud import

without coupling consumers to ImportPipeline implementations.

---

# Background

Long-running import operations require user feedback.

ImportProgress provides a unified representation of progress regardless of import format.

---

# Scope

## Included

- Progress model
- Stage progress
- Overall progress
- Progress metadata

## Excluded

- Progress UI
- Event dispatch
- Parsing implementation
- Rendering

---

# Deliverables

```text
packages/
└── atlas-import/
    └── src/
        ├── ImportProgress.ts
        ├── ImportStageProgress.ts
        ├── ProgressSnapshot.ts
        └── index.ts
```

---

# Responsibilities

ImportProgress is responsible for:

- exposing import progress
- exposing active stage
- remaining immutable
- supporting progress monitoring

ImportProgress is NOT responsible for:

- rendering UI
- event dispatch
- parsing
- pipeline execution

---

# Architecture

```text
ImportPipeline

↓

ImportProgress

↓

UI

↓

Plugin
```

---

# Public API

```ts
interface ImportProgress {
  readonly importId: string;

  readonly percentage: number;

  readonly currentStage: string;

  readonly completedStages: number;

  readonly totalStages: number;
}
```

---

# Suggested Progress Data

- Overall percentage
- Current stage
- Completed stages
- Total stages
- Estimated remaining work (optional)
- Current page (batch import)

---

# Dependency

Depends On

- TASK-0123 — ImportPipeline
- TASK-0125 — ImportEvents

---

# Risk

Low

ImportProgress provides standardized progress reporting across all import operations.

---

# Files Allowed

```text
packages/atlas-import/src/**
```

---

# Files Forbidden

```text
packages/atlas-editor/**
packages/atlas-renderer/**
packages/atlas-input/**
packages/atlas-plugin/**
packages/atlas-export/**
apps/**
```

---

# Acceptance Criteria

- [ ] ImportProgress implemented.
- [ ] Immutable.
- [ ] Serializable.
- [ ] Provider independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio reports import progress through a standardized ImportProgress model.

---

# AI Constraints

Before implementation:

- Do not implement progress UI.
- Do not implement event dispatch.
- Do not implement parsing.
- Focus only on the progress model.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0123-import-pipeline.md
- TASK-0125-import-events.md

---

# Next Task

TASK-0127-import-batch.md
