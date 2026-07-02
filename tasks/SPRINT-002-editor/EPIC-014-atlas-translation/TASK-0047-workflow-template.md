---
id: TASK-0047

title: Implement WorkflowTemplate

status: Ready

priority: Medium

story_points: 8

sprint: SPRINT-006-translation-workflow

epic: EPIC-014

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0047 — Implement WorkflowTemplate

## Summary

Implement `WorkflowTemplate`.

WorkflowTemplate represents a reusable blueprint for creating TranslationWorkflow instances.

Templates are immutable and may be shared across multiple projects.

WorkflowTemplate is never executed directly.

---

# Capability

After this task is complete, Atlas Studio can create TranslationWorkflow instances from reusable templates.

---

# Goal

Provide reusable workflow presets.

---

# Business Value

Users can:

- reuse workflow presets
- share workflows
- create standardized translation pipelines
- reduce project setup time

---

# Background

A TranslationWorkflow belongs to a project.

A WorkflowTemplate is reusable.

Example:

WorkflowTemplate

↓

Create Workflow

↓

TranslationWorkflow

↓

WorkflowExecutor

---

# Scope

## Included

- Template contract
- Template metadata
- Workflow blueprint
- Template serialization

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
        ├── WorkflowTemplate.ts
        └── index.ts
```

---

# Responsibilities

WorkflowTemplate is responsible for:

- describing reusable workflows
- storing template metadata
- creating TranslationWorkflow definitions

WorkflowTemplate is NOT responsible for:

- executing workflows
- scheduling
- provider selection
- runtime management

---

# Architecture

```text
WorkflowTemplate

↓

TranslationWorkflow

↓

WorkflowExecutor
```

---

# Template Examples

Examples:

- Basic Translation
- Manga Translation
- OCR + Translation
- OCR + Translation + Typesetting
- AI Translation Review

---

# Public API

```ts
interface WorkflowTemplate {
  readonly id: string;

  readonly name: string;

  readonly description?: string;

  readonly workflow: TranslationWorkflow;
}
```

---

# Dependency

Depends On

- TASK-0042 — TranslationWorkflow

---

# Risk

Low

WorkflowTemplate is an immutable workflow definition.

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

- [ ] WorkflowTemplate implemented.
- [ ] Immutable.
- [ ] Serializable.
- [ ] References TranslationWorkflow.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio can create TranslationWorkflow instances from reusable workflow templates.

---

# AI Constraints

Before implementation:

- Do not execute workflows.
- Do not implement WorkflowExecutor.
- Do not implement provider execution.
- Focus only on template definition.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0042-translation-workflow.md

---

# Next Task

TASK-0048-workflow-validator.md
