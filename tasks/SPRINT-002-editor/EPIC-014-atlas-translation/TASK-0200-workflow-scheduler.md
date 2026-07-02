---
id: TASK-0200

title: Implement WorkflowScheduler

status: Ready

priority: Critical

story_points: 21

sprint: SPRINT-022-workflow-automation

epic: EPIC-017

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0200 — Implement WorkflowScheduler

## Summary

Implement `WorkflowScheduler`.

WorkflowScheduler provides a provider-independent abstraction for scheduling workflow executions based on time, events, manual requests, or runtime conditions.

It determines when workflow executions should be started while remaining independent from workflow execution itself.

---

# Capability

After this task is complete, Atlas Translation Platform can schedule workflow executions through reusable scheduling strategies.

---

# Goal

Provide centralized workflow scheduling.

---

# Business Value

Supports

- Scheduled workflows
- Event-driven workflows
- Manual workflows
- Webhook-triggered workflows
- AI-triggered workflows
- Future enterprise automation

without modifying WorkflowManager.

---

# Background

Workflow execution and workflow scheduling are different concerns.

WorkflowScheduler determines _when_ execution begins, while WorkflowManager determines _how_ execution occurs.

---

# Scope

## Included

- Schedule registration
- Trigger evaluation
- Trigger abstraction
- Schedule metadata
- Execution dispatch

## Excluded

- Workflow execution
- Persistence
- Distributed scheduling
- UI

---

# Deliverables

```text
atlas-translation/

WorkflowScheduler.ts

WorkflowSchedule.ts

WorkflowTrigger.ts

WorkflowTriggerType.ts

WorkflowScheduleMetadata.ts

index.ts
```

---

# Responsibilities

WorkflowScheduler is responsible for

- registering schedules
- evaluating triggers
- dispatching workflow executions
- exposing scheduling metadata

WorkflowScheduler is NOT responsible for

- executing workflows
- persistence
- workflow authoring
- UI

---

# Architecture

```text
WorkflowTrigger

↓

WorkflowScheduler

↓

WorkflowExecutionPlan

↓

WorkflowManager

↓

WorkflowProvider
```

---

# Public API

```ts
interface WorkflowScheduler {
  register(schedule: WorkflowSchedule): void;

  unregister(scheduleId: string): void;

  evaluate(): Promise<void>;
}
```

---

# Supported Trigger Types

Time

- Cron
- Interval
- Fixed Date

Events

- Plugin Event
- Workflow Event
- AI Event

Manual

- User Request
- API Request

Future

- Webhook
- File Change
- Database Event
- External Queue

---

# Dependency

Depends On

- TASK-0192 — WorkflowManager
- TASK-0199 — WorkflowDesigner

---

# Risk

High

WorkflowScheduler becomes the centralized trigger management layer for workflow automation.

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

- [ ] WorkflowScheduler implemented.
- [ ] Supports multiple trigger types.
- [ ] Provider independent.
- [ ] Immutable schedule definitions.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Translation Platform schedules workflow execution through a reusable WorkflowScheduler.

---

# AI Constraints

Before implementation

- Do not implement distributed scheduling.
- Do not implement persistence.
- Do not implement UI.
- Focus only on the WorkflowScheduler abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0192-workflow-manager.md
- TASK-0199-workflow-designer.md

---

# Next Task

TASK-0201-workflow-template.md
