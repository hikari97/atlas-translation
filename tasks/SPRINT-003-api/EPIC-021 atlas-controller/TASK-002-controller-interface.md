---
id: TASK-002

title: Implement Controller Interface

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

# TASK-002 — Implement Controller Interface

## Summary

Implement `Controller`.

Controller defines the provider-independent execution contract for application controllers within the Atlas ecosystem.

Rather than exposing HTTP-specific request and response objects, Controller operates exclusively on ControllerContext and returns an application result through a unified execution contract.

---

# Capability

After this task is complete, Atlas provides a reusable controller contract suitable for HTTP, GraphQL, RPC, WebSocket, CLI, Queue Workers, and future transports.

---

# Goal

Provide unified controller interface.

---

# Business Value

Supports

- Transport-independent controllers
- Strong typing
- Controller reusability
- Stable execution contract
- Provider independence

without coupling Atlas controllers to runtime-specific APIs.

---

# Background

Controllers represent application endpoints.

They should not depend on HTTP implementations, middleware engines, or runtime providers.

Atlas defines a unified controller contract reusable across all supported transports.

---

# Scope

## Included

- Controller interface
- Execution contract
- Controller metadata
- Generic return type
- Transport independence

## Excluded

- Route matching
- Middleware execution
- Validation
- Response generation
- Dependency Injection
- Networking
- UI

---

# Deliverables

```text
atlas-controller/

Controller.ts

ControllerContract.ts

ControllerCapabilities.ts

ControllerMetadata.ts

ControllerResult.ts

index.ts
```

---

# Responsibilities

Controller is responsible for

- processing ControllerContext
- returning application results
- exposing controller metadata
- remaining provider independent

Controller is NOT responsible for

- routing
- middleware execution
- validation
- response serialization
- dependency injection
- networking
- UI

---

# Architecture

```text
Controller

        │

        ▼

ControllerContext

        │

        ▼

ControllerResult

        │

        ▼

ResponseBuilder
```

---

# Public API

```ts
interface Controller<TResult = unknown> {
  execute(context: ControllerContext): Promise<TResult>;
}
```

---

# Supported Controller Types

Application

- REST Controller
- RPC Controller
- GraphQL Resolver
- WebSocket Handler

Infrastructure

- Health Controller
- Metrics Controller

Future

- CLI Controller
- Queue Controller
- Event Controller

---

# Dependency

Depends On

- TASK-001 — Controller Core
- EPIC-018 — atlas-request
- EPIC-019 — atlas-response

---

# Risk

Critical

Controller becomes the standardized execution contract across the Atlas ecosystem.

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

- [x] Controller interface implemented.
- [x] Supports ControllerContext.
- [x] Supports generic return type.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes a reusable controller contract capable of supporting provider-independent controller execution across multiple transports.

---

# AI Constraints

Before implementation

- Do not implement routing.
- Do not implement middleware execution.
- Do not implement response serialization.
- Do not implement dependency injection.
- Do not implement networking.
- Focus only on Controller interface.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-001-controller-core.md

---

# Next Task

TASK-003-controller-context.md
