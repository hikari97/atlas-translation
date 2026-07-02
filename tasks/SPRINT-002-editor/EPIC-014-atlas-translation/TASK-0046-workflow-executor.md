---
id: TASK-0046

title: Implement WorkflowExecutor

status: Ready

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

# TASK-0046 — Implement WorkflowExecutor

## Summary

Implement `WorkflowExecutor`.

WorkflowExecutor is responsible for executing a TranslationWorkflow.

WorkflowExecutor evaluates transitions, executes WorkflowSteps, invokes PipelineExecutor, and manages workflow runtime.

WorkflowExecutor is the runtime counterpart of TranslationWorkflow.

---

# Capability

After this task is complete, Atlas Studio can execute complete translation workflows.

---

# Goal

Provide a runtime execution engine for TranslationWorkflow.

---

# Business Value

Supports:

- multi-step workflows
- reusable workflow templates
- conditional execution
- future parallel execution

without modifying TranslationPipeline.

---

# Background

TranslationWorkflow describes:

"What should happen."

WorkflowExecutor performs:

"Execute the workflow."

WorkflowExecutor coordinates WorkflowSteps.

Each WorkflowStep delegates execution to PipelineExecutor.

---

# Scope

## Included

- Workflow execution
- Step traversal
- Transition handling
- Pipeline invocation
- Workflow lifecycle

## Excluded

- Workflow definition
- Pipeline implementation
- Provider execution
- Scheduler implementation

---

# Deliverables

```text
packages/
└── atlas-translation/
    └── src/
        ├── WorkflowExecutor.ts
        └── index.ts
```

---

# Responsibilities

WorkflowExecutor is responsible for:

- executing WorkflowSteps
- evaluating WorkflowTransitions
- invoking PipelineExecutor
- maintaining workflow runtime state
- completing workflow execution

WorkflowExecutor is NOT responsible for:

- defining workflows
- implementing pipelines
- selecting providers
- editing workflow definitions

---

# Architecture

```text
TranslationWorkflow

↓

WorkflowExecutor

↓

WorkflowStep

↓

PipelineExecutor

↓

TranslationPipeline
```

---

# Execution Flow

```text
Load Workflow

↓

Find Start Step

↓

Execute Pipeline

↓

Evaluate Transition

↓

Move Next Step

↓

Repeat

↓

Workflow Completed
```

---

# Public API

```ts
interface WorkflowExecutor {
  execute(workflow: TranslationWorkflow): Promise<void>;
}
```

---

# Dependency

Depends On

- TASK-0015 — PipelineExecutor
- TASK-0042 — TranslationWorkflow
- TASK-0043 — WorkflowStep
- TASK-0044 — WorkflowTransition
- TASK-0045 — WorkflowCondition

---

# Risk

High

WorkflowExecutor coordinates the entire workflow runtime.

Incorrect execution may produce inconsistent workflow behavior.

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

- [ ] WorkflowExecutor implemented.
- [ ] Executes WorkflowSteps.
- [ ] Invokes PipelineExecutor.
- [ ] Traverses WorkflowTransitions.
- [ ] Provider independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio can execute TranslationWorkflow independently from workflow definitions.

---

# AI Constraints

Before implementation:

- Do not implement TranslationPipeline.
- Do not implement Provider execution.
- Do not implement parallel execution.
- Focus only on workflow execution.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0015-pipeline-executor.md
- TASK-0042-translation-workflow.md
- TASK-0045-workflow-condition.md

---

# Next Task

TASK-0047-workflow-template.md
