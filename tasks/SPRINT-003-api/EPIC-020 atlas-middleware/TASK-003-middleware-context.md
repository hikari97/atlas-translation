---
id: TASK-003

title: Implement Middleware Context

status: Completed

priority: Critical

story_points: 34

sprint: SPRINT-003-api

epic: EPIC-020

package: atlas-middleware

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-003 — Implement Middleware Context

## Summary

Implement `MiddlewareContext`.

MiddlewareContext provides the provider-independent execution context shared across all middleware within the Atlas ecosystem.

The context aggregates request, response, metadata, services, execution state, and future extensibility into a single transport-independent abstraction.

---

# Capability

After this task is complete, Atlas provides a reusable middleware execution context shared across every middleware in the execution pipeline.

---

# Goal

Provide unified middleware execution context.

---

# Business Value

Supports

- Shared execution state
- Cross-cutting concerns
- Context propagation
- Transport independence
- Strong typing

without coupling middleware to HTTP implementations.

---

# Background

Middleware requires access to request and response information while remaining transport independent.

Rather than exposing transport-specific objects, Atlas exposes MiddlewareContext.

MiddlewareContext becomes the only execution object visible to middleware implementations.

---

# Scope

## Included

- Middleware context
- Request access
- Response access
- Metadata
- Shared services
- Execution state

## Excluded

- Dependency Injection
- Networking
- Authentication
- Validation
- UI

---

# Deliverables

```text
atlas-middleware/

MiddlewareContext.ts

MiddlewareContextState.ts

MiddlewareContextMetadata.ts

MiddlewareContextStorage.ts

MiddlewareContextServices.ts

index.ts
```

---

# Responsibilities

MiddlewareContext is responsible for

- exposing RequestContext
- exposing ResponseContext
- exposing execution metadata
- exposing shared services
- maintaining request-scoped middleware state

MiddlewareContext is NOT responsible for

- networking
- authentication
- validation
- dependency injection
- UI

---

# Architecture

```text
MiddlewareContext

├── RequestContext
├── ResponseContext
├── Metadata
├── Services
└── State

        │
        ▼

Middleware

        │
        ▼

Pipeline
```

---

# Public API

```ts
interface MiddlewareContext {
  readonly request: RequestContext;

  readonly response: ResponseContext;

  readonly metadata: MiddlewareContextMetadata;

  readonly services: MiddlewareContextServices;

  readonly state: MiddlewareContextState;
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

- DI Scope
- User Context
- Localization
- Transactions
- Telemetry

---

# Dependency

Depends On

- EPIC-018 — atlas-request
- EPIC-019 — atlas-response
- TASK-001 — Middleware Core

---

# Risk

Critical

MiddlewareContext becomes the standardized execution context across the Atlas middleware ecosystem.

---

# Files Allowed

```text
atlas-middleware/**
```

---

# Files Forbidden

```text
None
```

---

# Acceptance Criteria

- [x] MiddlewareContext implemented.
- [x] Aggregates RequestContext.
- [x] Aggregates ResponseContext.
- [x] Supports execution metadata.
- [x] Supports shared services.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes a reusable middleware execution context capable of supporting provider-independent middleware execution across multiple transports.

---

# AI Constraints

Before implementation

- Do not implement dependency injection.
- Do not implement networking.
- Do not implement authentication.
- Do not implement validation.
- Focus only on MiddlewareContext abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-001-middleware-core.md
- EPIC-018 atlas-request
- EPIC-019 atlas-response

---

# Next Task

TASK-004-middleware-pipeline.md
