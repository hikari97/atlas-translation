---
id: TASK-0128

title: Implement ImportConflictResolver

status: Completed

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

# TASK-0128 — Implement ImportConflictResolver

## Summary

Implement `ImportConflictResolver`.

ImportConflictResolver resolves conflicts encountered during import operations using configurable resolution strategies.

It is independent from ImportProviders and applies consistently across all supported import formats.

---

# Capability

After this task is complete, Atlas Studio can resolve import conflicts deterministically and consistently.

---

# Goal

Provide centralized conflict resolution.

---

# Business Value

Supports:

- Duplicate asset detection
- Duplicate page names
- Duplicate document identifiers
- Metadata conflicts
- Future collaborative import

without modifying ImportProviders.

---

# Background

Importing external content frequently introduces naming, identifier, and metadata conflicts.

ImportConflictResolver centralizes conflict handling instead of scattering it across providers.

---

# Scope

## Included

- Conflict detection model
- Resolution strategies
- Conflict result model
- Conflict metadata

## Excluded

- UI dialogs
- User interaction
- File parsing
- Storage

---

# Deliverables

```text
packages/
└── atlas-import/
    └── src/
        ├── ImportConflictResolver.ts
        ├── ImportConflict.ts
        ├── ConflictResolution.ts
        ├── ConflictStrategy.ts
        └── index.ts
```

---

# Responsibilities

ImportConflictResolver is responsible for:

- identifying conflicts
- applying resolution strategies
- producing deterministic results
- exposing conflict metadata

ImportConflictResolver is NOT responsible for:

- rendering dialogs
- asking users
- parsing files
- modifying ImportProviders

---

# Architecture

```text
ImportPipeline

↓

ImportConflictResolver

↓

EditorDocument
```

---

# Public API

```ts
interface ImportConflictResolver {
  resolve(conflict: ImportConflict): ConflictResolution;
}
```

---

# Supported Strategies

- Skip
- Rename
- Overwrite
- Merge
- Fail

---

# Conflict Types

- Duplicate Document ID
- Duplicate Page ID
- Duplicate Asset ID
- Duplicate File Name
- Metadata Conflict
- Unsupported Version

---

# Dependency

Depends On

- TASK-0123 — ImportPipeline
- TASK-0127 — BatchImport

---

# Risk

Medium

ImportConflictResolver provides deterministic conflict handling across all import operations.

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

- [ ] ImportConflictResolver implemented.
- [ ] Supports configurable strategies.
- [ ] Deterministic conflict resolution.
- [ ] Platform independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio resolves import conflicts through a centralized ImportConflictResolver.

---

# AI Constraints

Before implementation:

- Do not implement UI dialogs.
- Do not implement file parsing.
- Do not implement storage.
- Focus only on the conflict resolution model.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0123-import-pipeline.md
- TASK-0127-import-batch.md

---

# Next Task

TASK-0129-import-statistics.md
