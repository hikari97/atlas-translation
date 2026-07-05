---
id: TASK-0191

title: Implement WorkflowProvider

status: Completed

priority: Critical

story_points: 21

sprint: SPRINT-021-workflow-system

epic: EPIC-017

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0191 — Implement WorkflowProvider

## Summary

Implement `WorkflowProvider`.

WorkflowProvider defines the abstraction responsible for executing workflow definitions through interchangeable workflow engines.

Providers are platform independent and expose workflow execution capabilities without coupling Atlas Core to any specific workflow implementation.

---

# Capability

After this task is complete, Atlas Translation Platform can execute workflows through interchangeable WorkflowProviders.

---

# Goal

Provide standardized workflow execution.

---

# Business Value

Supports

- Translation workflow
- Review workflow
- Publishing workflow
- AI workflow
- Automation workflow
- Future business workflows

without changing Atlas Core.

---

# Background

Different environments may require different workflow engines.

Atlas Translation Platform communicates only through WorkflowProvider contracts.

---

# Scope

## Included

- Provider contract
- Workflow execution
- Workflow metadata
- Provider capability

## Excluded

- Workflow designer
- Workflow scheduling
- UI
- Workflow persistence

---

# Deliverables

```text
atlas-translation/

WorkflowProvider.ts

WorkflowMetadata.ts

WorkflowCapability.ts

WorkflowRequest.ts

WorkflowResult.ts

index.ts
```

---

# Responsibilities

WorkflowProvider is responsible for

- executing workflows
- exposing provider capabilities
- returning workflow results
- remaining provider independent

WorkflowProvider is NOT responsible for

- workflow design
- scheduling
- persistence
- UI

---

# Architecture

```text
Workflow Request

↓

WorkflowManager

↓

WorkflowProvider

↓

Workflow Engine
```

---

# Public API

```ts
interface WorkflowProvider {
  readonly metadata: WorkflowMetadata;

  execute(request: WorkflowRequest): Promise<WorkflowResult>;
}
```

---

# Supported Providers

Current

- Local Provider

Future

- Plugin Provider
- Remote Workflow Provider
- Distributed Workflow Provider

---

# Dependency

Depends On

- TASK-0103 — PluginManager

---

# Risk

High

WorkflowProvider becomes the abstraction layer for all workflow execution inside Atlas Translation Platform.

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

- [ ] WorkflowProvider implemented.
- [ ] Provider independent.
- [ ] Supports workflow execution.
- [ ] Immutable contracts.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Translation Platform executes workflows through interchangeable WorkflowProviders.

---

# AI Constraints

Before implementation

- Do not implement workflow persistence.
- Do not implement scheduling.
- Do not implement UI.
- Focus only on the WorkflowProvider abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md

---

# Next Task

TASK-0192-workflow-manager.md
