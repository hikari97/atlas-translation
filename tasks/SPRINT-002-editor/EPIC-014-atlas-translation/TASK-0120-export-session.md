---
id: TASK-0120

title: Implement ExportSession

status: Completed

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

# TASK-0120 — Implement ExportSession

## Summary

Implement `ExportSession`.

ExportSession represents the complete runtime state of a single export operation.

It coordinates the ExportRequest, ExportPipeline, ExportProgress, ExportStatistics, and ExportResult throughout the export lifecycle.

ExportSession is provider independent.

---

# Capability

After this task is complete, Atlas Studio can manage export operations through reusable runtime sessions.

---

# Goal

Provide unified export runtime management.

---

# Business Value

Supports:

- Export cancellation
- Export resume
- Batch export
- Progress tracking
- Diagnostics
- Future background export

without coupling runtime state to ExportManager.

---

# Background

Export operations consist of multiple stages and runtime objects.

ExportSession groups them into one immutable runtime model.

---

# Scope

## Included

- Session contract
- Session lifecycle
- Runtime state
- Session metadata

## Excluded

- Rendering
- File writing
- Background workers
- Cloud export

---

# Deliverables

```text
packages/
└── atlas-export/
    └── src/
        ├── ExportSession.ts
        ├── ExportSessionState.ts
        ├── ExportSessionMetadata.ts
        └── index.ts
```

---

# Responsibilities

ExportSession is responsible for:

- tracking export lifecycle
- exposing runtime state
- exposing progress
- exposing statistics
- exposing final result

ExportSession is NOT responsible for:

- rendering
- encoding
- storage
- provider implementation

---

# Architecture

```text
ExportRequest

↓

ExportSession

↓

ExportPipeline

↓

ExportProvider

↓

ExportResult
```

---

# Public API

```ts
interface ExportSession {
  readonly id: string;

  readonly state: ExportSessionState;

  readonly request: ExportRequest;

  readonly progress: ExportProgress;

  readonly statistics: ExportStatistics;
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
- TASK-0119 — ExportStatistics

---

# Risk

Medium

ExportSession becomes the runtime container for all export operations.

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

- [ ] ExportSession implemented.
- [ ] Immutable runtime model.
- [ ] Tracks lifecycle state.
- [ ] Exposes progress and statistics.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio manages export operations through reusable ExportSession instances.

---

# AI Constraints

Before implementation:

- Do not implement background workers.
- Do not implement rendering.
- Do not implement file writing.
- Focus only on the ExportSession model.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0112-export-manager.md
- TASK-0116-export-progress.md
- TASK-0119-export-statistics.md

---

# Sprint Completion

After Sprint 13 is completed, Atlas Studio is capable of:

✓ Export providers

✓ Export manager

✓ Export pipeline

✓ Export options

✓ Export events

✓ Export progress

✓ Batch export

✓ Export cache

✓ Export statistics

✓ Export session

The Export System is now complete.

---

# Next Task

TASK-0121-import-provider.md
