---
id: TASK-0042

title: Implement TranslationWorkflow

status: Completed

priority: Critical

story_points: 13

sprint: SPRINT-006-translation-workflow

epic: EPIC-014

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0042 — Implement TranslationWorkflow

## Summary

Implement `TranslationWorkflow`.

TranslationWorkflow defines the complete translation process by organizing multiple workflow steps into a reusable execution plan.

A workflow does not execute translation directly.

Execution is delegated to WorkflowExecutor.

---

# Capability

After this task is complete, Atlas Studio can describe complete translation processes independently from runtime execution.

---

# Goal

Provide a reusable workflow definition.

---

# Business Value

Translation workflows become reusable, configurable and shareable.

Examples:

- Basic Translation
- Manga Translation
- Novel Translation
- OCR + Translation
- OCR + Translation + Typesetting

---

# Background

A TranslationPipeline executes one translation process.

A TranslationWorkflow coordinates multiple workflow steps.

Workflow describes **what** should happen.

WorkflowExecutor decides **when** it happens.

---

# Scope

## Included

- Workflow definition
- Workflow metadata
- Ordered workflow steps
- Workflow serialization

## Excluded

- Workflow execution
- Scheduling
- Provider execution
- Runtime

---

# Deliverables

```text
packages/
└── atlas-translation/
    └── src/
        ├── TranslationWorkflow.ts
        ├── WorkflowMetadata.ts
        └── index.ts
```

---

# Responsibilities

TranslationWorkflow is responsible for:

- defining workflow
- exposing workflow steps
- preserving execution order
- remaining immutable

TranslationWorkflow is NOT responsible for:

- executing workflow
- scheduling
- calling providers
- updating runtime

---

# Architecture

```text
TranslationWorkflow

↓

WorkflowStep

↓

WorkflowExecutor
```

---

# Example Workflow

```text
OCR

↓

Text Cleanup

↓

Translation

↓

Quality Evaluation

↓

Review

↓

Approval

↓

Export
```

---

# Public API

```ts
interface TranslationWorkflow {
  readonly id: string;

  readonly name: string;

  readonly description?: string;

  readonly steps: readonly WorkflowStep[];
}
```

---

# Dependency

Depends On

- TASK-0008 — TranslationPipeline
- TASK-0043 — WorkflowStep

---

# Risk

Medium

Workflow becomes the primary orchestration model for translation.

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
packages/atlas-plugin/**
apps/**
```

---

# Acceptance Criteria

- [ ] TranslationWorkflow implemented.
- [ ] Immutable.
- [ ] Serializable.
- [ ] Supports ordered WorkflowSteps.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio can describe complete translation workflows independently from execution.

---

# AI Constraints

Before implementation:

- Do not implement execution.
- Do not implement scheduling.
- Do not implement providers.
- Focus only on workflow definition.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md

---

# Next Task

TASK-0043-workflow-step.md
