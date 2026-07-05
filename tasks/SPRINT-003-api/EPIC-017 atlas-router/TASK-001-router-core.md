---
id: TASK-001

title: Implement Router Core

status: Completed

priority: Critical

story_points: 21

sprint: SPRINT-003-api

epic: EPIC-017

package: atlas-router

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-001 — Implement Router Core

## Summary

Implement `RouterCore`.

RouterCore provides the provider-independent foundation responsible for coordinating route resolution across the Atlas ecosystem.

The router core defines the common abstractions, lifecycle, shared context, and service registry required by all routing capabilities while remaining independent from runtime environments, HTTP providers, networking implementations, and routing algorithms.

---

# Capability

After this task is complete, Atlas provides a unified routing foundation capable of supporting multiple routing strategies and runtime providers.

---

# Goal

Provide unified router foundation.

---

# Business Value

Supports

- Route resolution foundation
- Router lifecycle
- Router registry
- Provider independence
- Extensible routing infrastructure
- Future routing strategies

without coupling Atlas to a specific runtime or routing implementation.

---

# Background

Atlas HTTP defines endpoints.

RouterCore is responsible for locating the correct endpoint for an incoming HTTP transaction.

Concrete routing algorithms are intentionally excluded from this task.

---

# Scope

## Included

- Router abstraction
- Router lifecycle
- Router registry
- Router context
- Router metadata

## Excluded

- Route matching
- Route parameters
- Route constraints
- Middleware
- Controller execution
- Networking
- UI

---

# Deliverables

```text
atlas-router/

RouterCore.ts

RouterContext.ts

RouterLifecycle.ts

RouterRegistry.ts

RouterMetadata.ts

index.ts
```

---

# Responsibilities

RouterCore is responsible for

- coordinating route resolution
- exposing router context
- managing router lifecycle
- registering router components
- remaining provider independent

RouterCore is NOT responsible for

- route matching
- request parsing
- controller execution
- middleware
- networking
- UI

---

# Architecture

```text
Router Core

├── Router Registry
├── Router Context
├── Router Lifecycle
├── Router Metadata
└── Router Services

        │
        ▼

 Route Resolver

        │
        ▼

 Endpoint
```

---

# Public API

```ts
interface RouterCore {
  readonly registry: RouterRegistry;

  readonly context: RouterContext;

  readonly lifecycle: RouterLifecycle;
}
```

---

# Supported Router Services

Core

- Router Context
- Router Registry
- Router Lifecycle

Infrastructure

- Route Registration
- Router Metadata

Future

- Route Matching
- Route Resolution
- Route Groups
- Route Constraints
- Route Providers

---

# Dependency

Depends On

- EPIC-016 — atlas-http
- TASK-014 — HTTP Endpoint

---

# Risk

Critical

RouterCore becomes the unified routing foundation across the Atlas API ecosystem.

---

# Files Allowed

```text
atlas-router/**
```

---

# Files Forbidden

```text
None
```

---

# Acceptance Criteria

- [x] RouterCore implemented.
- [x] Supports router lifecycle.
- [x] Supports router registry.
- [x] Supports router context.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable router abstractions capable of supporting multiple routing strategies independently from runtime environments and networking implementations.

---

# AI Constraints

Before implementation

- Do not implement route matching.
- Do not implement routing algorithms.
- Do not implement middleware.
- Do not implement controller execution.
- Do not implement networking.
- Do not implement runtime-specific routers.
- Focus only on RouterCore abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- EPIC-016 atlas-http
- TASK-014-http-endpoint.md

---

# Next Task

TASK-002-route.md
