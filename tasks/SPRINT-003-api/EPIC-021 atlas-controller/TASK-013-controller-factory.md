---
id: TASK-013

title: Implement Controller Factory

status: Completed

priority: High

story_points: 21

sprint: SPRINT-003-api

epic: EPIC-021

package: atlas-controller

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-013 — Implement Controller Factory

## Summary

Implement `ControllerFactory`.

ControllerFactory provides the provider-independent abstraction responsible for creating controller instances within the Atlas ecosystem.

Rather than constructing controllers directly inside the resolver or executor, the factory encapsulates controller instantiation while remaining independent from runtime environments, dependency injection frameworks, networking implementations, and transport protocols.

---

# Capability

After this task is complete, Atlas provides reusable controller factories capable of creating controller instances across multiple runtime environments.

---

# Goal

Provide unified controller factory abstraction.

---

# Business Value

Supports

- Lazy controller creation
- Factory abstraction
- Runtime independence
- Testability
- Future dependency injection support

without coupling Atlas controllers to runtime-specific construction mechanisms.

---

# Background

Controller instantiation should be separated from controller resolution.

This separation improves maintainability and enables future support for dependency injection, scoped controllers, plugins, and module systems.

---

# Scope

## Included

- Factory abstraction
- Controller creation
- Factory metadata
- Factory lifecycle

## Excluded

- Controller execution
- Controller dispatch
- Dependency Injection
- Networking
- UI

---

# Deliverables

```text
atlas-controller/

ControllerFactory.ts

ControllerFactoryMetadata.ts

ControllerFactoryLifecycle.ts

ControllerFactoryCapabilities.ts

index.ts
```

---

# Responsibilities

ControllerFactory is responsible for

- creating controller instances
- exposing factory metadata
- exposing lifecycle
- remaining provider independent

ControllerFactory is NOT responsible for

- controller execution
- controller dispatch
- route matching
- dependency injection
- networking
- UI

---

# Architecture

```text
ControllerResolver

        │

        ▼

ControllerFactory

├── Metadata
├── Lifecycle
└── Capabilities

        │

        ▼

Controller Instance

        │

        ▼

ControllerDispatcher
```

---

# Public API

```ts
interface ControllerFactory {
  create(): Controller;
}
```

---

# Supported Factory Features

Creation

- Controller Creation
- Lazy Creation

Infrastructure

- Metadata
- Lifecycle

Future

- Singleton Factory
- Scoped Factory
- Transient Factory
- Dependency Injection
- Plugin Factory

---

# Dependency

Depends On

- TASK-002 — Controller Interface
- TASK-005 — Controller Resolver

---

# Risk

High

ControllerFactory becomes the standardized controller creation abstraction across the Atlas ecosystem.

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

- [x] ControllerFactory implemented.
- [x] Supports controller creation.
- [x] Supports lifecycle.
- [x] Supports metadata.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable controller factories capable of creating controller instances independently from runtime environments, dependency injection frameworks, and transport protocols.

---

# AI Constraints

Before implementation

- Do not implement dependency injection.
- Do not implement networking.
- Focus only on ControllerFactory abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-002-controller-interface.md
- TASK-005-controller-resolver.md

---

# Next Task

END OF EPIC-021
