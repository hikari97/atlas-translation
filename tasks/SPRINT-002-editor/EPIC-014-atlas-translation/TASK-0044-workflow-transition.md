---
id: TASK-0044

title: Implement WorkflowTransition

status: Completed

priority: High

story_points: 8

sprint: SPRINT-006-translation-workflow

epic: EPIC-014

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0044 — Implement WorkflowTransition

## Summary

Implement `WorkflowTransition`.

WorkflowTransition defines how execution moves from one WorkflowStep to another.

A transition contains only workflow topology.

Execution decisions remain the responsibility of WorkflowExecutor.

---

# Capability

After this task is complete, Atlas Studio can describe workflow execution paths independently from runtime execution.

---

# Goal

Provide reusable workflow connectivity.

---

# Business Value

Workflow definitions become more flexible.

Examples:

- Sequential workflow
- Conditional workflow
- Branching workflow
- Parallel workflow (future)

without changing WorkflowStep.

---

# Background

Instead of assuming every workflow is linear:

OCR

↓

Translate

↓

Review

↓

Export

WorkflowTransition explicitly defines the relationship between steps.

---

# Scope

## Included

- Transition definition
- Source step
- Target step
- Transition metadata

## Excluded

- Runtime execution
- Conditions
- Scheduling
- Parallel execution

---

# Deliverables

```text
packages/
└── atlas-translation/
    └── src/
        ├── WorkflowTransition.ts
        └── index.ts
```

---

# Responsibilities

WorkflowTransition is responsible for:

- connecting WorkflowSteps
- defining workflow topology
- remaining immutable

WorkflowTransition is NOT responsible for:

- executing transitions
- evaluating conditions
- scheduling execution

---

# Architecture

```text
WorkflowStep

↓

WorkflowTransition

↓

WorkflowStep
```

---

# Example

```text
OCR
 │
 ▼
Translate
 │
 ▼
Review
 │
 ▼
Export
```

---

# Public API

```ts
interface WorkflowTransition {
  readonly id: string;

  readonly from: string;

  readonly to: string;
}
```

---

# Dependency

Depends On

- TASK-0043 — WorkflowStep

---

# Risk

Low

WorkflowTransition is an immutable workflow definition.

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

- [ ] WorkflowTransition implemented.
- [ ] Immutable.
- [ ] Serializable.
- [ ] Supports step-to-step transitions.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

TranslationWorkflow can explicitly describe execution flow using WorkflowTransition.

---

# AI Constraints

Before implementation:

- Do not execute transitions.
- Do not implement conditions.
- Do not implement WorkflowExecutor.
- Focus only on transition definition.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0042-translation-workflow.md
- TASK-0043-workflow-step.md

---

# Next Task

TASK-0045-workflow-condition.md
