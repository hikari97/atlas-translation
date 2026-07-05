---
id: TASK-0001

title: Implement TranslationItem

status: Completed

priority: Critical

story_points: 8

sprint: SPRINT-001-foundation

epic: EPIC-014

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0001 — Implement TranslationItem

## Summary

Implement `TranslationItem`, the primary work unit processed by the Atlas Translation Engine.

A TranslationItem represents exactly one translation target and encapsulates all runtime information required throughout its lifecycle.

The Translation Engine operates exclusively on TranslationItem instances rather than directly on image files or provider-specific requests.

---

# Capability

After this task is complete, users can add one or more images into the Translation Engine as independent translation items that can later be scheduled, monitored, paused, resumed, retried, and opened in the Editor.

---

# Goal

Provide a stable, strongly typed abstraction that becomes the Aggregate Root for every translation operation.

---

# Business Value

Every feature implemented in subsequent sprints—including Batch Translation, Workflow, Scheduler, Progress Tracking, Translation Memory, Diagnostics, and Editor Integration—will operate on TranslationItem.

A consistent work unit simplifies orchestration and future extensibility.

---

# Background

Translation Engine must never process raw files directly.

Instead, every source is normalized into a TranslationItem.

Future translation sources may include:

- PNG
- JPG
- WEBP
- Clipboard
- PDF Page
- ZIP Entry
- Remote URL
- Future Sources

---

# Scope

## Included

- TranslationItem contract
- Identity
- Source reference
- Runtime state
- Progress reference
- Pipeline reference
- Result reference
- Metadata

---

## Excluded

- Pipeline execution
- Translation Provider
- OCR
- Scheduler
- Workflow
- Queue
- Retry

---

# Deliverables

```text
packages/
└── atlas-translation/
    └── src/
        ├── TranslationItem.ts
        └── index.ts
```

---

# Responsibilities

TranslationItem is responsible for:

- representing one translation target
- exposing immutable identity
- exposing current runtime state
- exposing pipeline reference
- exposing translation result reference
- exposing progress reference

TranslationItem is NOT responsible for:

- performing OCR
- translating text
- rendering
- scheduling
- workflow execution
- queue management

---

# Lifecycle

```text
Created

↓

Queued

↓

Running

↓

Paused

↓

Completed

↓

Failed

↓

Cancelled
```

Lifecycle implementation is outside the scope of this task.

---

# Public API

```ts
interface TranslationItem {
  readonly id: string;

  readonly source: TranslationSource;

  readonly state: TranslationItemState;

  readonly progress: TranslationProgress;

  readonly pipeline?: TranslationPipeline;

  readonly result?: TranslationResult;
}
```

---

# Design Principles

TranslationItem must be:

- immutable
- deterministic
- serializable
- provider independent
- UI independent
- framework independent

---

# Architecture

```text
TranslationBatch

↓

TranslationItem

↓

TranslationPipeline
```

TranslationItem is the center of the Translation Engine.

---

# Dependency

None.

This is the foundation task.

---

# Risk

Low.

The task defines only the public contract.

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
packages/atlas-selection/**
apps/**
```

---

# Acceptance Criteria

- [ ] TranslationItem interface implemented.
- [ ] TranslationItem is immutable.
- [ ] TranslationItem contains no provider-specific logic.
- [ ] TranslationItem compiles under TypeScript strict mode.
- [ ] Public export available.

---

# Definition of Done

This task is complete when:

- TranslationItem becomes the single work unit of the Translation Engine.
- Future Batch Translation can operate solely on TranslationItem.
- Future Workflow can reference TranslationItem.
- Future Scheduler can schedule TranslationItem.
- Public API is documented.

---

# AI Constraints

Before implementation:

- Do not implement Scheduler.
- Do not implement Pipeline.
- Do not implement Translation Provider.
- Do not implement OCR.
- Do not implement Workflow.
- Focus only on TranslationItem abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md

---

# Next Task

TASK-0002 — Implement TranslationRequest
