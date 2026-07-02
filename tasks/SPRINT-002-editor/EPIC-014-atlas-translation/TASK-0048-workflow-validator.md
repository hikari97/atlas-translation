---
id: TASK-0048

title: Implement WorkflowValidator

status: Ready

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

# TASK-0048 — Implement WorkflowValidator

## Summary

Implement `WorkflowValidator`.

WorkflowValidator validates TranslationWorkflow definitions before execution.

Validation ensures workflows are structurally correct and executable.

WorkflowValidator never executes workflows.

---

# Capability

After this task is complete, Atlas Studio can detect invalid workflow definitions before runtime.

---

# Goal

Prevent invalid workflow execution.

---

# Business Value

Users receive immediate feedback when creating workflows.

This reduces runtime failures and improves workflow reliability.

---

# Background

Workflow definitions may contain structural errors.

Examples:

- missing start step
- missing end step
- unreachable steps
- orphan transitions
- invalid references
- cyclic dependencies
- duplicate step identifiers

WorkflowValidator detects these problems before WorkflowExecutor starts.

---

# Scope

## Included

- Workflow validation
- Graph validation
- Transition validation
- Step validation
- Validation report

## Excluded

- Workflow execution
- Runtime
- Provider execution
- Workflow editing

---

# Deliverables

```text
packages/
└── atlas-translation/
    └── src/
        ├── WorkflowValidator.ts
        ├── WorkflowValidationResult.ts
        ├── WorkflowValidationIssue.ts
        └── index.ts
```

---

# Responsibilities

WorkflowValidator is responsible for:

- validating workflow structure
- validating transitions
- validating references
- reporting validation issues

WorkflowValidator is NOT responsible for:

- executing workflows
- modifying workflows
- fixing validation errors
- scheduling

---

# Architecture

```text
TranslationWorkflow

↓

WorkflowValidator

↓

WorkflowValidationResult
```

---

# Validation Rules

Minimum validation rules:

- Workflow contains at least one step.
- Exactly one Start Step.
- At least one End Step.
- No duplicate Step IDs.
- No duplicate Transition IDs.
- Every Transition references existing steps.
- Every Step is reachable.
- No orphan steps.
- No infinite cycle.
- Graph is executable.

---

# Public API

```ts
interface WorkflowValidator {
  validate(workflow: TranslationWorkflow): WorkflowValidationResult;
}
```

```ts
interface WorkflowValidationResult {
  readonly valid: boolean;

  readonly issues: readonly WorkflowValidationIssue[];
}
```

```ts
interface WorkflowValidationIssue {
  readonly code: string;

  readonly message: string;

  readonly severity: ValidationSeverity;
}
```

---

# Dependency

Depends On

- TASK-0042 — TranslationWorkflow
- TASK-0043 — WorkflowStep
- TASK-0044 — WorkflowTransition

---

# Risk

Medium

Invalid workflows may prevent execution.

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

- [ ] WorkflowValidator implemented.
- [ ] Detects structural errors.
- [ ] Reports validation issues.
- [ ] Does not modify workflow.
- [ ] Serializable validation result.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio validates workflow definitions before execution begins.

---

# AI Constraints

Before implementation:

- Do not execute workflows.
- Do not modify workflows.
- Do not implement WorkflowExecutor.
- Focus only on workflow validation.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0042-translation-workflow.md
- TASK-0043-workflow-step.md
- TASK-0044-workflow-transition.md

---

# Next Task

TASK-0049-workflow-events.md
