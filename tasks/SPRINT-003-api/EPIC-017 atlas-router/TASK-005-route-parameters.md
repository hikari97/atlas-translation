---
id: TASK-005

title: Implement Route Parameters

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

# TASK-005 — Implement Route Parameters

## Summary

Implement `RouteParameters`.

RouteParameters provides the provider-independent abstraction responsible for representing values extracted from matched routes within the Atlas ecosystem.

The route parameter abstraction standardizes parameter extraction, metadata, typing, validation contracts, and lifecycle while remaining independent from routing algorithms, runtime environments, networking implementations, and HTTP providers.

---

# Capability

After this task is complete, Atlas provides standardized route parameter abstractions reusable across routing, controllers, validation, and future HTTP components.

---

# Goal

Provide unified route parameter abstraction.

---

# Business Value

Supports

- Dynamic routing
- Parameter extraction
- Strong typing
- Controller binding
- Validation foundation
- Provider independence

without coupling Atlas to framework-specific routing implementations.

---

# Background

Dynamic routes produce parameters.

Examples

/users/{id}

/posts/{category}/{slug}

The parameter abstraction represents extracted values independently from routing algorithms.

---

# Scope

## Included

- Parameter abstraction
- Parameter collection
- Parameter metadata
- Parameter lifecycle
- Typed parameter access

## Excluded

- Route matching
- Route constraints
- Validation
- Controller binding
- Networking
- UI

---

# Deliverables

```text
atlas-router/

RouteParameters.ts

RouteParameter.ts

RouteParameterCollection.ts

RouteParameterMetadata.ts

RouteParameterLifecycle.ts

index.ts
```

---

# Responsibilities

RouteParameters is responsible for

- representing extracted route parameters
- exposing parameter metadata
- managing parameter lifecycle
- exposing typed lookup
- remaining provider independent

RouteParameters is NOT responsible for

- matching routes
- validating values
- binding controllers
- networking
- UI

---

# Architecture

```text
Route Matcher

        │

        ▼

Route Match Result

        │

        ▼

Route Parameters

        │

        ▼

Controller

        │

        ▼

Validation
```

---

# Public API

```ts
interface RouteParameters {
  has(name: string): boolean;

  get<T>(name: string): T | undefined;

  keys(): readonly string[];

  values(): readonly RouteParameter[];
}
```

---

# Supported Parameter Services

Parameters

- Lookup
- Enumeration
- Typed Access

Collection

- Immutable View
- Metadata
- Iteration

Future

- Typed Parameters
- Lazy Parameters
- Parameter Conversion
- Parameter Binding

---

# Dependency

Depends On

- TASK-004 — Route Matcher

---

# Risk

High

RouteParameters becomes the standardized parameter abstraction across the Atlas Router ecosystem.

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

- [x] RouteParameters implemented.
- [x] Supports typed lookup.
- [x] Supports immutable collection.
- [x] Supports metadata.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable route parameter abstractions capable of representing extracted routing values independently from routing algorithms, runtime environments, and networking implementations.

---

# AI Constraints

Before implementation

- Do not implement validation.
- Do not implement controller binding.
- Do not implement routing algorithms.
- Do not implement networking.
- Focus only on RouteParameters abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-004-route-matcher.md

---

# Next Task

TASK-006-route-constraints.md
