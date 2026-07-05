---
id: TASK-003

title: Implement Controller Context

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

# TASK-003 — Implement Controller Context

## Summary

Implement `ControllerContext`.

ControllerContext provides the provider-independent execution context shared by every controller within the Atlas ecosystem.

The context aggregates request information, response construction, controller metadata, execution state, shared services, and future extensibility into a unified abstraction while remaining independent from runtime environments, transport protocols, networking implementations, and web frameworks.

---

# Capability

After this task is complete, Atlas provides a reusable controller execution context shared across every controller execution.

---

# Goal

Provide unified controller execution context.

---

# Business Value

Supports

- Shared execution state
- Controller-scoped services
- Request access
- Response composition
- Transport independence

without coupling controllers to HTTP implementations.

---

# Background

Controllers require access to application request and response abstractions without depending on transport-specific implementations.

Rather than exposing runtime objects directly, Atlas exposes ControllerContext.

---

# Scope

## Included

- Controller context
- Request access
- Response access
- Metadata
- Shared services
- Execution state

## Excluded

- Routing
- Middleware execution
- Validation
- Dependency Injection
- Networking
- UI

---

# Deliverables

```text
atlas-controller/

ControllerContext.ts

ControllerContextState.ts

ControllerContextMetadata.ts

ControllerContextStorage.ts

ControllerContextServices.ts

index.ts
```

---

# Responsibilities

ControllerContext is responsible for

- exposing RequestContext
- exposing ResponseContext
- exposing execution metadata
- exposing shared services
- maintaining controller-scoped state

ControllerContext is NOT responsible for

- routing
- middleware execution
- validation
- dependency injection
- networking
- UI

---

# Architecture

```text
ControllerContext

├── RequestContext
├── ResponseContext
├── Metadata
├── Services
└── State

        │
        ▼

Controller

        │
        ▼

Controller Executor
```

---

# Public API

```ts
interface ControllerContext {
  readonly request: RequestContext;

  readonly response: ResponseContext;

  readonly metadata: ControllerContextMetadata;

  readonly services: ControllerContextServices;

  readonly state: ControllerContextState;
}
```

---

# Supported Context Services

Execution

- Request
- Response

Infrastructure

- Metadata
- State
- Shared Services

Future

- User Context
- Localization
- Transaction Scope
- Telemetry
- Dependency Scope

---

# Dependency

Depends On

- EPIC-018 — atlas-request
- EPIC-019 — atlas-response
- TASK-001 — Controller Core

---

# Risk

Critical

ControllerContext becomes the standardized execution context across the Atlas controller ecosystem.

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

- [x] ControllerContext implemented.
- [x] Aggregates RequestContext.
- [x] Aggregates ResponseContext.
- [x] Supports execution metadata.
- [x] Supports shared services.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes a reusable controller execution context capable of supporting provider-independent controller execution across multiple transports.

---

# AI Constraints

Before implementation

- Do not implement routing.
- Do not implement middleware execution.
- Do not implement validation.
- Do not implement dependency injection.
- Do not implement networking.
- Focus only on ControllerContext abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-001-controller-core.md
- TASK-002-controller-interface.md
- EPIC-018 atlas-request
- EPIC-019 atlas-response

---

# Next Task

TASK-004-controller-registry.md
