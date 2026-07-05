---
id: TASK-0192

title: Implement WorkflowManager

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

# TASK-0192 — Implement WorkflowManager

## Summary

Implement `WorkflowManager`.

WorkflowManager coordinates WorkflowProviders and exposes a unified runtime for workflow discovery, execution, lifecycle management, and provider resolution.

WorkflowManager is provider independent.

---

# Capability

After this task is complete, Atlas Translation Platform can execute workflows through interchangeable workflow providers.

---

# Goal

Provide centralized workflow runtime management.

---

# Business Value

Supports

- Translation workflows
- Review workflows
- Publishing workflows
- AI workflows
- Automation workflows
- Future enterprise workflows

without changing Atlas Core.

---

# Background

Organizations may execute workflows using different workflow engines.

WorkflowManager coordinates providers while exposing a single runtime abstraction.

---

# Scope

## Included

- Provider registration
- Provider resolution
- Workflow execution
- Execution lifecycle
- Runtime coordination

## Excluded

- Workflow Designer
- Scheduling
- Persistence
- UI

---

# Deliverables

```text
atlas-translation/

WorkflowManager.ts

WorkflowRegistry.ts

WorkflowProviderResolver.ts

index.ts
```

---

# Responsibilities

WorkflowManager is responsible for

- registering providers
- resolving providers
- creating workflow executions
- coordinating execution lifecycle
- exposing workflow runtime

WorkflowManager is NOT responsible for

- workflow definition
- workflow persistence
- scheduling
- UI

---

# Architecture

```text
WorkflowExecution

↓

WorkflowManager

↓

WorkflowProviderResolver

↓

WorkflowProvider

↓

Workflow Engine
```

---

# Public API

```ts
interface WorkflowManager {
  register(provider: WorkflowProvider): void;

  execute(execution: WorkflowExecution): Promise<WorkflowResult>;
}
```

---

# Supported Features

- Provider registration
- Provider resolution
- Multiple workflow providers
- Workflow execution
- Runtime lifecycle

---

# Dependency

Depends On

- TASK-0103 — PluginManager
- TASK-0191 — WorkflowProvider

---

# Risk

High

WorkflowManager becomes the centralized runtime for every workflow executed by Atlas Translation Platform.

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

- [ ] WorkflowManager implemented.
- [ ] Supports provider registration.
- [ ] Provider independent.
- [ ] Coordinates workflow execution.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Translation Platform manages workflow execution through WorkflowManager using interchangeable WorkflowProviders.

---

# AI Constraints

Before implementation

- Do not implement scheduling.
- Do not implement persistence.
- Do not implement Workflow Designer.
- Focus only on workflow coordination.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0103-plugin-manager.md
- TASK-0191-workflow-provider.md

---

# Next Task

TASK-0193-workflow-pipeline.md
