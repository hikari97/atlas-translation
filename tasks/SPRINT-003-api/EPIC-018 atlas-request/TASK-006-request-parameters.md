---
id: TASK-006

title: Implement Request Parameters

status: Completed

priority: High

story_points: 21

sprint: SPRINT-003-api

epic: EPIC-018

package: atlas-request

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-006 — Implement Request Parameters

## Summary

Implement `RequestParameters`.

RequestParameters provides the provider-independent abstraction responsible for exposing route parameters through the application request model.

Rather than exposing RouteParameters directly, RequestParameters acts as an application-facing facade that simplifies access to resolved route parameters while remaining independent from routing implementations, runtime environments, networking implementations, and HTTP providers.

---

# Capability

After this task is complete, Atlas provides reusable request parameter abstractions shared across controllers, middleware, validation, and future request-processing components.

---

# Goal

Provide unified request parameter abstraction.

---

# Business Value

Supports

- Route parameter access
- Controller simplicity
- Validation integration
- Model binding foundation
- Provider independence

without coupling Atlas applications to routing implementations.

---

# Background

RouteParameters belongs to atlas-router.

Applications should not depend directly on routing abstractions.

RequestParameters exposes routing results through RequestCore.

---

# Scope

## Included

- Parameter abstraction
- Parameter collection
- Parameter metadata
- Parameter lifecycle
- Typed lookup

## Excluded

- Route matching
- Parameter extraction
- Validation
- Type conversion
- Networking
- UI

---

# Deliverables

```text
atlas-request/

RequestParameters.ts

RequestParameter.ts

RequestParameterCollection.ts

RequestParameterMetadata.ts

RequestParameterLifecycle.ts

index.ts
```

---

# Responsibilities

RequestParameters is responsible for

- exposing route parameters
- exposing typed lookup
- exposing parameter metadata
- managing parameter lifecycle
- remaining provider independent

RequestParameters is NOT responsible for

- extracting route parameters
- matching routes
- validation
- converting types
- networking
- UI

---

# Architecture

```text
RouteParameters

        │

        ▼

RequestParameters

├── Parameter Collection
├── Metadata
└── Lifecycle

        │

        ▼

Request Core

        │

        ▼

Controller
```

---

# Public API

```ts
interface RequestParameters {
  has(key: string): boolean;

  get(key: string): string | undefined;

  getAll(key: string): readonly string[];

  keys(): readonly string[];

  entries(): readonly RequestParameter[];
}
```

---

# Supported Parameter Features

Lookup

- Single Value
- Multiple Values

Collection

- Immutable View
- Enumeration

Future

- Typed Parameters
- Lazy Parameters
- Model Binding
- Parameter Conversion

---

# Dependency

Depends On

- EPIC-017 — atlas-router
- TASK-005-route-parameters.md
- TASK-001-request-core.md

---

# Risk

High

RequestParameters becomes the standardized application-level parameter abstraction across the Atlas Request ecosystem.

---

# Files Allowed

```text
atlas-request/**
```

---

# Files Forbidden

```text
None
```

---

# Acceptance Criteria

- [x] RequestParameters implemented.
- [x] Supports parameter lookup.
- [x] Supports immutable enumeration.
- [x] Supports metadata.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable request parameter abstractions capable of providing application-oriented access to resolved route parameters independently from routing implementations and runtime environments.

---

# AI Constraints

Before implementation

- Do not implement route matching.
- Do not implement parameter extraction.
- Do not implement validation.
- Do not implement type conversion.
- Do not implement networking.
- Focus only on RequestParameters abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- EPIC-017 atlas-router
- TASK-005-route-parameters.md
- TASK-001-request-core.md

---

# Next Task

TASK-007-request-cookies.md
