---
id: TASK-001

title: Implement Controller Core

status: Completed

priority: Critical

story_points: 21

sprint: SPRINT-003-api

epic: EPIC-021

package: atlas-controller

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-001 — Implement Controller Core

## Summary

Implement `ControllerCore`.

ControllerCore provides the provider-independent foundation responsible for coordinating controller infrastructure throughout the Atlas ecosystem.

Rather than executing controllers directly, ControllerCore defines the common abstractions, lifecycle, metadata, registry, and shared services required by every controller while remaining independent from runtime environments, networking implementations, transport protocols, and web frameworks.

---

# Capability

After this task is complete, Atlas provides a unified controller foundation reusable across multiple transports and runtime providers.

---

# Goal

Provide unified controller foundation.

---

# Business Value

Supports

- Controller abstraction
- Shared controller services
- Controller lifecycle
- Provider independence
- Extensible controller architecture

without coupling Atlas to runtime-specific controller implementations.

---

# Background

Controllers represent application endpoints.

Atlas separates controller infrastructure from routing, middleware execution, request parsing, validation, and response generation.

ControllerCore establishes the common foundation shared by every controller implementation.

---

# Scope

## Included

- Controller abstraction
- Controller context
- Controller lifecycle
- Controller metadata
- Controller registry

## Excluded

- Route matching
- Middleware execution
- Validation
- Dependency Injection
- Response generation
- Networking
- UI

---

# Deliverables

```text
atlas-controller/

ControllerCore.ts

ControllerContext.ts

ControllerLifecycle.ts

ControllerMetadata.ts

ControllerRegistry.ts

index.ts
```

---

# Responsibilities

ControllerCore is responsible for

- coordinating controller infrastructure
- exposing controller context
- exposing controller metadata
- managing lifecycle
- remaining provider independent

ControllerCore is NOT responsible for

- routing
- middleware execution
- validation
- response generation
- dependency injection
- networking
- UI

---

# Architecture

```text
Controller Core

├── Context
├── Metadata
├── Lifecycle
├── Registry
└── Services

        │

        ▼

 Controller

        │

        ▼

Controller Provider
```

---

# Public API

```ts
interface ControllerCore {
  readonly context: ControllerContext;

  readonly lifecycle: ControllerLifecycle;

  readonly metadata: ControllerMetadata;
}
```

---

# Supported Controller Services

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

- EPIC-017 — atlas-router
- EPIC-018 — atlas-request
- EPIC-019 — atlas-response
- EPIC-020 — atlas-middleware

---

# Risk

Critical

ControllerCore becomes the unified controller foundation across the Atlas ecosystem.

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

- [x] ControllerCore implemented.
- [x] Supports lifecycle.
- [x] Supports metadata.
- [x] Supports context.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable controller abstractions capable of supporting provider-independent controller infrastructure across multiple transports.

---

# AI Constraints

Before implementation

- Do not implement routing.
- Do not implement middleware execution.
- Do not implement validation.
- Do not implement response generation.
- Do not implement dependency injection.
- Do not implement networking.
- Focus only on ControllerCore abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- EPIC-017 atlas-router
- EPIC-018 atlas-request
- EPIC-019 atlas-response
- EPIC-020 atlas-middleware

---

# Next Task

TASK-002-controller-interface.md
