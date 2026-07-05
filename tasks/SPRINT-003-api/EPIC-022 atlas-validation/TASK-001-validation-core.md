---
id: TASK-001

title: Implement Validation Core

status: Completed

priority: Critical

story_points: 21

sprint: SPRINT-003-api

epic: EPIC-022

package: atlas-validation

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-001 — Implement Validation Core

## Summary

Implement `ValidationCore`.

ValidationCore provides the provider-independent foundation responsible for coordinating validation infrastructure throughout the Atlas ecosystem.

Rather than validating input directly, ValidationCore defines the common abstractions, lifecycle, metadata, registry, and shared services required by every validation component while remaining independent from runtime environments, networking implementations, transport protocols, and web frameworks.

---

# Capability

After this task is complete, Atlas provides a unified validation foundation reusable across multiple transports and runtime providers.

---

# Goal

Provide unified validation foundation.

---

# Business Value

Supports

- Validation abstraction
- Shared validation services
- Validation lifecycle
- Provider independence
- Extensible validation architecture

without coupling Atlas Validation to runtime-specific implementations.

---

# Background

Validation is a cross-cutting concern shared by controllers, middleware, and future framework components.

ValidationCore establishes the common infrastructure required by every validation implementation.

---

# Scope

## Included

- Validation abstraction
- Validation context
- Validation lifecycle
- Validation metadata
- Validation registry

## Excluded

- Rule execution
- Schema validation
- Controller execution
- Middleware execution
- Dependency Injection
- Networking
- UI

---

# Deliverables

```text
atlas-validation/

ValidationCore.ts

ValidationContext.ts

ValidationLifecycle.ts

ValidationMetadata.ts

ValidationRegistry.ts

index.ts
```

---

# Responsibilities

ValidationCore is responsible for

- coordinating validation infrastructure
- exposing validation context
- exposing validation metadata
- managing lifecycle
- remaining provider independent

ValidationCore is NOT responsible for

- executing validation rules
- middleware execution
- controller execution
- dependency injection
- networking
- UI

---

# Architecture

```text
Validation Core

├── Context
├── Metadata
├── Lifecycle
├── Registry
└── Services

        │

        ▼

 Validation

        │

        ▼

Validation Provider
```

---

# Public API

```ts
interface ValidationCore {
  readonly context: ValidationContext;

  readonly lifecycle: ValidationLifecycle;

  readonly metadata: ValidationMetadata;
}
```

---

# Supported Validation Services

Foundation

- Context
- Metadata
- Lifecycle

Infrastructure

- Registry
- Shared Services

Future

- Resolver
- Executor
- Provider

---

# Dependency

Depends On

- EPIC-018 — atlas-request
- EPIC-021 — atlas-controller

---

# Risk

Critical

ValidationCore becomes the unified validation foundation across the Atlas ecosystem.

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

- [x] ValidationCore implemented.
- [x] Supports lifecycle.
- [x] Supports metadata.
- [x] Supports context.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable validation abstractions capable of supporting provider-independent validation infrastructure across multiple transports.

---

# AI Constraints

Before implementation

- Do not implement validation rules.
- Do not implement schema validation.
- Do not implement networking.
- Focus only on ValidationCore abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- EPIC-018 atlas-request
- EPIC-021 atlas-controller

---

# Next Task

TASK-002-validation-interface.md
