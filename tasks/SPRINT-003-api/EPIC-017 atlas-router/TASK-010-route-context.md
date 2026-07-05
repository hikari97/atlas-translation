---
id: TASK-010

title: Implement Route Context

status: Completed

priority: High

story_points: 21

sprint: SPRINT-003-api

epic: EPIC-017

package: atlas-router

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-010 — Implement Route Context

## Summary

Implement `RouteContext`.

RouteContext provides the provider-independent abstraction responsible for maintaining routing state during the route resolution process.

The context abstraction standardizes routing data, resolution state, metadata, lifecycle, and intermediate results while remaining independent from runtime environments, networking implementations, routing algorithms, and HTTP providers.

---

# Capability

After this task is complete, Atlas provides a standardized routing context shared across route matching, parameter extraction, constraint evaluation, and endpoint resolution.

---

# Goal

Provide unified routing context.

---

# Business Value

Supports

- Routing state management
- Shared routing data
- Decoupled routing components
- Provider independence
- Future routing extensions

without coupling routing components to HttpContext internals.

---

# Background

HttpContext represents the complete HTTP transaction.

RouteContext represents only the routing process.

Routing components exchange information through RouteContext instead of directly modifying HttpContext.

---

# Scope

## Included

- Route context abstraction
- Resolution state
- Routing metadata
- Lifecycle
- Shared routing storage

## Excluded

- Route matching
- Route resolution
- Middleware
- Controller execution
- Networking
- UI

---

# Deliverables

```text
atlas-router/

RouteContext.ts

RouteContextState.ts

RouteContextMetadata.ts

RouteContextLifecycle.ts

RouteContextStorage.ts

index.ts
```

---

# Responsibilities

RouteContext is responsible for

- maintaining routing state
- sharing routing data
- exposing routing metadata
- managing routing lifecycle
- remaining provider independent

RouteContext is NOT responsible for

- matching routes
- resolving endpoints
- middleware
- networking
- UI

---

# Architecture

```text
HttpContext

      │

      ▼

RouteContext

├── Match Results
├── Parameters
├── Constraints
├── Resolution
└── Metadata

      │

      ▼

Route Resolver
```

---

# Public API

```ts
interface RouteContext {
  readonly metadata: RouteContextMetadata;

  readonly lifecycle: RouteContextLifecycle;

  readonly state: RouteContextState;
}
```

---

# Supported Context Services

Context

- Match Storage
- Parameter Storage
- Constraint Storage
- Resolution Storage

Future

- Diagnostics
- Route Tracing
- Performance Metrics
- Plugin Context
- Cache Context

---

# Dependency

Depends On

- TASK-001 — Router Core
- TASK-009 — Route Resolver
- EPIC-016 — atlas-http

---

# Risk

High

RouteContext becomes the standardized routing context across the Atlas Router ecosystem.

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

- [x] RouteContext implemented.
- [x] Supports routing state.
- [x] Supports metadata.
- [x] Supports lifecycle.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable route context abstractions capable of sharing routing state independently from routing algorithms, runtime environments, and networking implementations.

---

# AI Constraints

Before implementation

- Do not implement route matching.
- Do not implement route resolution.
- Do not implement middleware.
- Do not implement networking.
- Focus only on RouteContext abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-001-router-core.md
- TASK-009-route-resolver.md
- EPIC-016 atlas-http

---

# Next Task

TASK-011-route-metadata.md
