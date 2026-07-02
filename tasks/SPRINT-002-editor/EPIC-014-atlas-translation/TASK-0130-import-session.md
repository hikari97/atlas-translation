---
id: TASK-0130

title: Implement ImportSession

status: Ready

priority: High

story_points: 21

sprint: SPRINT-014-import-system

epic: EPIC-017

package: atlas-import

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0130 — Implement ImportSession

## Summary

Implement `ImportSession`.

ImportSession represents the complete runtime state of a single import operation.

It coordinates the ImportRequest, ImportPipeline, ImportProgress, ImportStatistics, ImportConflictResolver, and ImportResult throughout the import lifecycle.

ImportSession is provider independent.

---

# Capability

After this task is complete, Atlas Studio can manage import operations through reusable runtime sessions.

---

# Goal

Provide unified import runtime management.

---

# Business Value

Supports:

- Import cancellation
- Import resume
- Batch import
- Progress tracking
- Conflict tracking
- Diagnostics
- Future background import

without coupling runtime state to ImportManager.

---

# Background

Import operations consist of multiple stages and runtime objects.

ImportSession groups them into one reusable runtime model.

---

# Scope

## Included

- Session contract
- Session lifecycle
- Runtime state
- Session metadata

## Excluded

- Rendering
- File parsing
- Background workers
- Cloud import

---

# Deliverables

```text
packages/
└── atlas-import/
    └── src/
        ├── ImportSession.ts
        ├── ImportSessionState.ts
        ├── ImportSessionMetadata.ts
        └── index.ts
```

---

# Responsibilities

ImportSession is responsible for:

- tracking import lifecycle
- exposing runtime state
- exposing progress
- exposing statistics
- exposing conflict summary
- exposing final result

ImportSession is NOT responsible for:

- parsing
- rendering
- storage
- provider implementation

---

# Architecture

```text
ImportRequest

↓

ImportSession

↓

ImportPipeline

↓

ImportProvider

↓

EditorDocument
```

---

# Public API

```ts
interface ImportSession {
  readonly id: string;

  readonly state: ImportSessionState;

  readonly request: ImportRequest;

  readonly progress: ImportProgress;

  readonly statistics: ImportStatistics;

  readonly result?: ImportResult;
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

- TASK-0122 — ImportManager
- TASK-0126 — ImportProgress
- TASK-0128 — ImportConflictResolver
- TASK-0129 — ImportStatistics

---

# Risk

Medium

ImportSession becomes the runtime container for all import operations.

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

- [ ] ImportSession implemented.
- [ ] Immutable runtime model.
- [ ] Tracks lifecycle state.
- [ ] Exposes progress, statistics, and result.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio manages import operations through reusable ImportSession instances.

---

# AI Constraints

Before implementation:

- Do not implement background workers.
- Do not implement rendering.
- Do not implement file parsing.
- Focus only on the ImportSession model.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0122-import-manager.md
- TASK-0126-import-progress.md
- TASK-0128-import-conflict-resolver.md
- TASK-0129-import-statistics.md

---

# Sprint Completion

After Sprint 14 is completed, Atlas Studio is capable of:

✓ Import providers

✓ Import manager

✓ Import pipeline

✓ Import options

✓ Import events

✓ Import progress

✓ Batch import

✓ Import conflict resolution

✓ Import statistics

✓ Import session

The Import System is now complete.

---

# Next Task

TASK-0131-asset-provider.md
