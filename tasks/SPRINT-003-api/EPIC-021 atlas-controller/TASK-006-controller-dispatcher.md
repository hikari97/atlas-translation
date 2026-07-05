---
id: TASK-006

title: Implement Controller Dispatcher

status: Completed

priority: Critical

story_points: 34

sprint: SPRINT-003-api

epic: EPIC-021

package: atlas-controller

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-006 — Implement Controller Dispatcher

## Summary

Implement `ControllerDispatcher`.

ControllerDispatcher provides the provider-independent abstraction responsible for coordinating controller dispatch within the Atlas ecosystem.

Rather than executing controllers directly, the dispatcher prepares controller execution by resolving the appropriate controller, constructing the execution context, and delegating execution to ControllerExecutor.

---

# Capability

After this task is complete, Atlas provides reusable controller dispatch infrastructure shared across routers, middleware engines, and runtime providers.

---

# Goal

Provide unified controller dispatch abstraction.

---

# Business Value

Supports

- Controller dispatch
- Context preparation
- Execution delegation
- Runtime independence
- Extensible dispatch architecture

without coupling Atlas to runtime-specific dispatch mechanisms.

---

# Background

After routing has identified the target endpoint and middleware execution has completed, Atlas dispatches execution to the corresponding controller.

Dispatching is separated from execution to simplify orchestration and improve extensibility.

---

# Scope

## Included

- Controller dispatch
- Execution context preparation
- Controller resolution coordination
- Dispatch metadata
- Dispatch lifecycle

## Excluded

- Route matching
- Controller execution
- Middleware execution
- Dependency Injection
- Networking
- UI

---

# Deliverables

```text
atlas-controller/

ControllerDispatcher.ts

ControllerDispatch.ts

ControllerDispatchContext.ts

ControllerDispatcherMetadata.ts

ControllerDispatcherLifecycle.ts

index.ts
```

---

# Responsibilities

ControllerDispatcher is responsible for

- dispatching controller execution
- coordinating controller resolution
- preparing execution context
- exposing dispatch metadata
- remaining provider independent

ControllerDispatcher is NOT responsible for

- executing controllers
- middleware execution
- dependency injection
- networking
- UI

---

# Architecture

```text
Router

    │

    ▼

ControllerDispatcher

├── Resolution
├── Context
├── Metadata
└── Lifecycle

        │

        ▼

ControllerExecutor

        │

        ▼

ResponseBuilder
```

---

# Public API

```ts
interface ControllerDispatcher {
  dispatch(
    identifier: ControllerIdentifier,
    context: ControllerContext,
  ): Promise<void>;
}
```

---

# Supported Dispatch Features

Dispatch

- Context Preparation
- Controller Resolution
- Execution Delegation

Infrastructure

- Metadata
- Lifecycle

Future

- Conditional Dispatch
- Composite Dispatch
- Interceptors
- Retry Dispatch

---

# Dependency

Depends On

- TASK-003 — Controller Context
- TASK-005 — Controller Resolver

---

# Risk

Critical

ControllerDispatcher becomes the standardized dispatch abstraction across the Atlas ecosystem.

---

# Files Allowed

```text
atlas-controller/**
```

---

# Files Forbidden

```text
None
```

---

# Acceptance Criteria

- [x] ControllerDispatcher implemented.
- [x] Supports controller resolution.
- [x] Supports context preparation.
- [x] Supports dispatch lifecycle.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes a reusable controller dispatcher capable of coordinating controller execution independently from runtime environments and transport protocols.

---

# AI Constraints

Before implementation

- Do not implement controller execution.
- Do not implement middleware execution.
- Do not implement dependency injection.
- Do not implement networking.
- Focus only on ControllerDispatcher abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-003-controller-context.md
- TASK-005-controller-resolver.md

---

# Next Task

TASK-007-controller-executor.md
