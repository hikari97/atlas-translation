---
id: TASK-0117

title: Implement BatchExport

status: Ready

priority: High

story_points: 21

sprint: SPRINT-013-export-system

epic: EPIC-016

package: atlas-export

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0117 — Implement BatchExport

## Summary

Implement `BatchExport`.

BatchExport coordinates multiple export requests as a single export session.

Each export request remains independent while sharing common progress reporting, cancellation, and result aggregation.

BatchExport is provider independent.

---

# Capability

After this task is complete, Atlas Studio can execute multiple export requests through a unified batch export runtime.

---

# Goal

Provide reusable batch export.

---

# Business Value

Supports:

- Export selected pages
- Export multiple formats
- Batch PDF generation
- Batch image export
- Automated publishing
- Future cloud export

without changing ExportProviders.

---

# Background

Exporting many pages individually makes progress tracking, retry, and cancellation difficult.

BatchExport treats multiple export requests as one coordinated session.

---

# Scope

## Included

- Batch session
- Batch progress
- Batch cancellation model
- Result aggregation

## Excluded

- Rendering
- File writing
- Parallel scheduling
- Cloud export

---

# Deliverables

```text
packages/
└── atlas-export/
    └── src/
        ├── BatchExport.ts
        ├── BatchExportSession.ts
        ├── BatchExportResult.ts
        └── index.ts
```

---

# Responsibilities

BatchExport is responsible for:

- coordinating multiple export requests
- aggregating results
- exposing batch progress
- supporting cancellation

BatchExport is NOT responsible for:

- rendering
- encoding
- storage
- provider implementation

---

# Architecture

```text
ExportRequests[]

↓

BatchExport

↓

ExportPipeline

↓

ExportProvider

↓

BatchExportResult
```

---

# Public API

```ts
interface BatchExport {
  execute(requests: readonly ExportRequest[]): Promise<BatchExportResult>;
}
```

---

# Batch Features

Supports:

- Multiple requests
- Progress aggregation
- Cancellation
- Result aggregation
- Failure isolation

---

# Batch Lifecycle

```text
Created

↓

Running

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

- TASK-0112 — ExportManager
- TASK-0116 — ExportProgress

---

# Risk

Medium

BatchExport provides scalable export orchestration for large projects.

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

- [ ] BatchExport implemented.
- [ ] Supports multiple export requests.
- [ ] Aggregates progress.
- [ ] Aggregates results.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio executes multiple exports through a reusable BatchExport runtime.

---

# AI Constraints

Before implementation:

- Do not implement parallel execution.
- Do not implement rendering.
- Do not implement file writing.
- Focus only on batch orchestration.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0112-export-manager.md
- TASK-0116-export-progress.md

---

# Next Task

TASK-0118-export-cache.md
