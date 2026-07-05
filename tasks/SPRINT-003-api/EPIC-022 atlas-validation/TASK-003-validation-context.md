---
id: TASK-003

title: Implement Validation Context

status: Completed

priority: Critical

story_points: 34

sprint: SPRINT-003-api

epic: EPIC-022

package: atlas-validation

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-003 — Implement Validation Context

## Summary

Implement `ValidationContext`.

ValidationContext provides the provider-independent execution context shared by every validator within the Atlas ecosystem.

The context aggregates validation input, metadata, execution state, shared services, and future extensibility into a unified abstraction while remaining independent from runtime environments, transport protocols, networking implementations, and web frameworks.

---

# Capability

After this task is complete, Atlas provides a reusable validation execution context shared across every validation process.

---

# Goal

Provide unified validation execution context.

---

# Business Value

Supports

- Shared validation state
- Validator-scoped services
- Validation input access
- Metadata propagation
- Transport independence

without coupling validators to HTTP implementations.

---

# Background

Validators require access to application data without depending on runtime-specific request objects.

Rather than exposing HTTP requests directly, Atlas exposes ValidationContext.

---

# Scope

## Included

- Validation context
- Validation input
- Metadata
- Shared services
- Execution state

## Excluded

- Rule execution
- Schema validation
- Controller execution
- Dependency Injection
- Networking
- UI

---

# Deliverables

```text
atlas-validation/

ValidationContext.ts

ValidationContextState.ts

ValidationContextMetadata.ts

ValidationContextStorage.ts

ValidationContextServices.ts

index.ts
```

---

# Responsibilities

ValidationContext is responsible for

- exposing validation input
- exposing execution metadata
- exposing shared services
- maintaining validation-scoped state

ValidationContext is NOT responsible for

- executing validation rules
- controller execution
- dependency injection
- networking
- UI

---

# Architecture

```text
ValidationContext

├── Input
├── Metadata
├── Services
└── State

        │
        ▼

Validation

        │
        ▼

ValidationExecutor
```

---

# Public API

```ts
interface ValidationContext {
  readonly input: unknown;

  readonly metadata: ValidationContextMetadata;

  readonly services: ValidationContextServices;

  readonly state: ValidationContextState;
}
```

---

# Supported Context Services

Execution

- Validation Input

Infrastructure

- Metadata
- State
- Shared Services

Future

- Localization
- User Context
- Dependency Scope
- Telemetry
- Validation Cache

---

# Dependency

Depends On

- TASK-001 — Validation Core
- TASK-002 — Validation Interface

---

# Risk

Critical

ValidationContext becomes the standardized validation execution context across the Atlas ecosystem.

---

# Files Allowed

```text
atlas-validation/**
```

---

# Files Forbidden

```text
None
```

---

# Acceptance Criteria

- [x] ValidationContext implemented.
- [x] Supports validation input.
- [x] Supports metadata.
- [x] Supports shared services.
- [x] Supports execution state.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes a reusable validation execution context capable of supporting provider-independent validation across multiple transports.

---

# AI Constraints

Before implementation

- Do not implement validation rules.
- Do not implement schema parsing.
- Do not implement dependency injection.
- Do not implement networking.
- Focus only on ValidationContext abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-001-validation-core.md
- TASK-002-validation-interface.md

---

# Next Task

TASK-004-validation-registry.md
