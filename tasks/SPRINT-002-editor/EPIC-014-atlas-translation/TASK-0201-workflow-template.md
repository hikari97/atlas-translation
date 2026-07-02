---
id: TASK-0201

title: Implement WorkflowTemplate

status: Ready

priority: High

story_points: 21

sprint: SPRINT-022-workflow-automation

epic: EPIC-017

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0201 — Implement WorkflowTemplate

## Summary

Implement `WorkflowTemplate`.

WorkflowTemplate defines reusable workflow blueprints that can be instantiated into executable WorkflowDefinitions using runtime parameters.

Templates remain independent from workflow execution.

---

# Capability

After this task is complete, Atlas Translation Platform can generate reusable workflow definitions from templates.

---

# Goal

Provide reusable workflow blueprints.

---

# Business Value

Supports

- Translation templates
- OCR templates
- AI templates
- Publishing templates
- Company workflow standards
- Future workflow marketplace

without modifying WorkflowDesigner.

---

# Background

Many workflows differ only by configuration.

WorkflowTemplate avoids duplicated workflow definitions by separating reusable structure from runtime parameters.

---

# Scope

## Included

- Template definition
- Template parameters
- Template instantiation
- Template validation
- Metadata

## Excluded

- Execution
- Scheduling
- Marketplace
- UI

---

# Deliverables

```text
atlas-translation/

WorkflowTemplate.ts

WorkflowTemplateParameter.ts

WorkflowTemplateMetadata.ts

WorkflowTemplateEngine.ts

index.ts
```

---

# Responsibilities

WorkflowTemplate is responsible for

- defining reusable workflow templates
- exposing template parameters
- validating template inputs
- instantiating WorkflowDefinitions

WorkflowTemplate is NOT responsible for

- execution
- scheduling
- rendering
- UI

---

# Architecture

```text
WorkflowTemplate

↓

Parameters

↓

WorkflowTemplateEngine

↓

WorkflowDefinition

↓

WorkflowManager
```

---

# Public API

```ts
interface WorkflowTemplateEngine {
  instantiate(
    template: WorkflowTemplate,
    parameters: WorkflowTemplateParameters,
  ): WorkflowDefinition;
}
```

---

# Supported Features

Template

- Variables
- Default Values
- Required Parameters
- Metadata

Instantiation

- Parameter Validation
- Variable Resolution
- Workflow Generation

Future

- Nested Templates
- Template Composition
- Template Versioning

---

# Dependency

Depends On

- TASK-0199 — WorkflowDesigner
- TASK-0200 — WorkflowScheduler

---

# Risk

Medium

WorkflowTemplate becomes the reusable blueprint system for workflow automation.

---

# Files Allowed

```text
atlas-translation/**
```

---

# Files Forbidden

```text
None
```

---

# Acceptance Criteria

- [ ] WorkflowTemplate implemented.
- [ ] Supports parameterized templates.
- [ ] Supports WorkflowDefinition generation.
- [ ] Immutable.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Translation Platform creates reusable workflow definitions from WorkflowTemplates.

---

# AI Constraints

Before implementation

- Do not implement marketplace.
- Do not implement UI.
- Do not implement persistence.
- Focus only on WorkflowTemplate abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0199-workflow-designer.md
- TASK-0200-workflow-scheduler.md

---

# Next Task

TASK-0202-workflow-marketplace.md
