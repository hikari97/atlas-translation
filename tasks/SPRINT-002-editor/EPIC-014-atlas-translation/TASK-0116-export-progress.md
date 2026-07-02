---
id: TASK-0116

title: Implement ExportProgress

status: Ready

priority: Medium

story_points: 13

sprint: SPRINT-013-export-system

epic: EPIC-016

package: atlas-export

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0116 — Implement ExportProgress

## Summary

Implement `ExportProgress`.

ExportProgress represents the immutable progress state of an export operation.

It provides structured progress information for user interfaces, plugins, and diagnostics without exposing pipeline internals.

ExportProgress is platform independent.

---

# Capability

After this task is complete, Atlas Studio can report export progress consistently across all export providers.

---

# Goal

Provide standardized export progress reporting.

---

# Business Value

Supports:

- Progress bars
- Export dialogs
- Batch export monitoring
- Plugin notifications
- Diagnostics
- Future remote exports

without coupling consumers to ExportPipeline implementations.

---

# Background

Long-running export operations require user feedback.

ExportProgress provides a unified representation of progress regardless of export format.

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
- Rendering
- File storage

---

# Deliverables

```text
packages/
└── atlas-export/
    └── src/
        ├── ExportProgress.ts
        ├── ExportStageProgress.ts
        ├── ProgressSnapshot.ts
        └── index.ts
```

---

# Responsibilities

ExportProgress is responsible for:

- exposing export progress
- exposing active stage
- remaining immutable
- supporting progress monitoring

ExportProgress is NOT responsible for:

- rendering UI
- event dispatch
- file writing
- pipeline execution

---

# Architecture

```text
ExportPipeline

↓

ExportProgress

↓

UI

↓

Plugin
```

---

# Public API

```ts
interface ExportProgress {
  readonly exportId: string;

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
- Current page (batch export)

---

# Dependency

Depends On

- TASK-0113 — ExportPipeline
- TASK-0115 — ExportEvents

---

# Risk

Low

ExportProgress provides standardized progress reporting across all export operations.

---

# Files Allowed

```text
packages/atlas-export/src/**
```

---

# Files Forbidden

```text
packages/atlas-editor/**
packages/atlas-renderer/**
packages/atlas-input/**
packages/atlas-plugin/**
apps/**
```

---

# Acceptance Criteria

- [ ] ExportProgress implemented.
- [ ] Immutable.
- [ ] Serializable.
- [ ] Provider independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio reports export progress through a standardized ExportProgress model.

---

# AI Constraints

Before implementation:

- Do not implement progress UI.
- Do not implement event dispatch.
- Do not implement rendering.
- Focus only on the progress model.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0113-export-pipeline.md
- TASK-0115-export-events.md

---

# Next Task

TASK-0117-export-batch.md
