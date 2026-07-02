---
id: TASK-0127

title: Implement BatchImport

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

# TASK-0127 — Implement BatchImport

## Summary

Implement `BatchImport`.

BatchImport coordinates multiple import requests as a single import session.

Each import request remains independent while sharing common progress reporting, cancellation, and result aggregation.

BatchImport is provider independent.

---

# Capability

After this task is complete, Atlas Studio can execute multiple import requests through a unified batch import runtime.

---

# Goal

Provide reusable batch import.

---

# Business Value

Supports:

- Import multiple PDFs
- Import multiple CBZ files
- Import image folders
- Automated project creation
- Future cloud import

without changing ImportProviders.

---

# Background

Importing many files individually makes progress tracking, retry, cancellation, and conflict resolution difficult.

BatchImport treats multiple import requests as one coordinated session.

---

# Scope

## Included

- Batch session
- Batch progress
- Batch cancellation model
- Result aggregation

## Excluded

- Rendering
- File parsing
- Parallel scheduling
- Cloud import

---

# Deliverables

```text
packages/
└── atlas-import/
    └── src/
        ├── BatchImport.ts
        ├── BatchImportSession.ts
        ├── BatchImportResult.ts
        └── index.ts
```

---

# Responsibilities

BatchImport is responsible for:

- coordinating multiple import requests
- aggregating results
- exposing batch progress
- supporting cancellation

BatchImport is NOT responsible for:

- parsing
- rendering
- storage
- provider implementation

---

# Architecture

```text
ImportRequest[]

↓

BatchImport

↓

ImportPipeline

↓

ImportProvider

↓

BatchImportResult
```

---

# Public API

```ts
interface BatchImport {
  execute(requests: readonly ImportRequest[]): Promise<BatchImportResult>;
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

- TASK-0122 — ImportManager
- TASK-0126 — ImportProgress

---

# Risk

Medium

BatchImport provides scalable import orchestration for large projects.

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

- [ ] BatchImport implemented.
- [ ] Supports multiple import requests.
- [ ] Aggregates progress.
- [ ] Aggregates results.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio executes multiple imports through a reusable BatchImport runtime.

---

# AI Constraints

Before implementation:

- Do not implement parallel execution.
- Do not implement rendering.
- Do not implement parsing.
- Focus only on batch orchestration.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0122-import-manager.md
- TASK-0126-import-progress.md

---

# Next Task

TASK-0128-import-conflict-resolver.md
