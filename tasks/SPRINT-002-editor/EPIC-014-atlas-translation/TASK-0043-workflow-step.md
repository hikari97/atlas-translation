---
id: TASK-0043

title: Implement WorkflowStep

status: Completed

priority: Critical

story_points: 8

sprint: SPRINT-006-translation-workflow

epic: EPIC-014

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0043 — Implement WorkflowStep

## Summary

Implement `WorkflowStep`.

WorkflowStep represents a single executable step within a TranslationWorkflow.

Each WorkflowStep references one TranslationPipeline and defines its execution behavior.

WorkflowStep itself never executes the pipeline.

Execution is delegated to WorkflowExecutor.

---

# Capability

After this task is complete, Atlas Studio can compose workflows from reusable pipeline steps.

---

# Goal

Provide a reusable workflow building block.

---

# Business Value

Workflow steps can be:

- reordered
- reused
- enabled/disabled
- shared across workflow templates

without modifying TranslationPipeline.

---

# Background

A workflow consists of multiple steps.

Each step represents one logical operation.

Examples

Step 1

OCR Pipeline

↓

Step 2

Translation Pipeline

↓

Step 3

Quality Evaluation Pipeline

↓

Step 4

Export Pipeline

---

# Scope

## Included

- WorkflowStep contract
- Pipeline reference
- Step metadata
- Execution order

## Excluded

- Workflow execution
- Pipeline execution
- Scheduling
- Runtime

---

# Deliverables

```text
packages/
└── atlas-translation/
    └── src/
        ├── WorkflowStep.ts
        └── index.ts
```

---

# Responsibilities

WorkflowStep is responsible for:

- referencing a TranslationPipeline
- exposing execution metadata
- preserving execution order

WorkflowStep is NOT responsible for:

- executing pipelines
- scheduling
- provider execution
- runtime management

---

# Architecture

```text
TranslationWorkflow

↓

WorkflowStep

↓

TranslationPipeline
```

---

# Public API

```ts
interface WorkflowStep {
  readonly id: string;

  readonly name: string;

  readonly pipeline: TranslationPipeline;

  readonly enabled: boolean;
}
```

---

# Execution Order

Example

```text
1 OCR

↓

2 Translation

↓

3 Quality Evaluation

↓

4 Export
```

WorkflowExecutor determines how these steps are executed.

---

# Dependency

Depends On

- TASK-0008 — TranslationPipeline
- TASK-0042 — TranslationWorkflow

---

# Risk

Low

WorkflowStep is an immutable workflow definition.

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

- [ ] WorkflowStep implemented.
- [ ] References TranslationPipeline.
- [ ] Immutable.
- [ ] Serializable.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

TranslationWorkflow can be composed from reusable WorkflowStep definitions.

---

# AI Constraints

Before implementation:

- Do not execute TranslationPipeline.
- Do not implement WorkflowExecutor.
- Do not implement scheduling.
- Focus only on WorkflowStep definition.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0008-translation-pipeline.md
- TASK-0042-translation-workflow.md

---

# Next Task

TASK-0044-workflow-transition.md
