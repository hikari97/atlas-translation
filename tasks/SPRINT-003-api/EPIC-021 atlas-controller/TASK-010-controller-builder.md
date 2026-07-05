---
id: TASK-010

title: Implement Controller Builder

status: Completed

priority: Critical

story_points: 55

sprint: SPRINT-003-api

epic: EPIC-021

package: atlas-controller

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-010 — Implement Controller Builder

## Summary

Implement `ControllerBuilder`.

ControllerBuilder provides the primary fluent API responsible for configuring and constructing immutable controller definitions within the Atlas ecosystem.

Rather than manually registering controllers, applications declare controllers through a fluent builder that produces immutable controller collections suitable for execution by the controller engine.

---

# Capability

After this task is complete, Atlas provides a fluent controller configuration API reusable across HTTP, GraphQL, RPC, WebSocket, CLI, Queue Workers, and future transports.

---

# Goal

Provide unified controller builder.

---

# Business Value

Supports

- Fluent configuration
- Readable controller registration
- Immutable controller definitions
- Transport independence
- Strong typing

without coupling applications to runtime-specific controller registration mechanisms.

---

# Background

Controller registration should be declarative.

ControllerBuilder coordinates controller registration while remaining independent from routing, execution, middleware, validation, and runtime providers.

---

# Scope

## Included

- Builder abstraction
- Fluent API
- Controller grouping
- Conditional registration
- Immutable controller definitions

## Excluded

- Controller execution
- Route matching
- Middleware execution
- Dependency Injection
- Networking
- UI

---

# Deliverables

```text
atlas-controller/

ControllerBuilder.ts

ControllerBuilderFactory.ts

ControllerBuilderState.ts

ControllerBuilderContext.ts

ControllerDefinition.ts

index.ts
```

---

# Responsibilities

ControllerBuilder is responsible for

- configuring controllers
- grouping controllers
- composing controller definitions
- producing immutable ControllerDefinition collections
- remaining provider independent

ControllerBuilder is NOT responsible for

- executing controllers
- route matching
- middleware execution
- dependency injection
- networking
- UI

---

# Architecture

```text
Application

      │

      ▼

ControllerBuilder

      │

      ▼

ControllerDefinition

      │

      ▼

ControllerRegistry

      │

      ▼

ControllerResolver
```

---

# Public API

```ts
interface ControllerBuilder {
  add(controller: ControllerFactory): this;

  group(prefix: string, configure: (builder: ControllerBuilder) => void): this;

  when(
    condition: boolean,
    configure: (builder: ControllerBuilder) => void,
  ): this;

  build(): readonly ControllerDefinition[];
}
```

---

# Supported Builder Features

Composition

- add()
- group()
- build()

Conditional

- when()
- unless()

Organization

- Nested Groups
- Controller Prefix

Future

- Module Registration
- Plugin Controllers
- Version Groups
- Namespace Groups

---

# Dependency

Depends On

- TASK-004 — Controller Registry
- TASK-005 — Controller Resolver

---

# Risk

Critical

ControllerBuilder becomes the primary controller configuration API across the Atlas ecosystem.

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

- [x] ControllerBuilder implemented.
- [x] Supports fluent API.
- [x] Produces immutable controller definitions.
- [x] Supports grouping.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes a reusable fluent controller builder capable of constructing immutable controller definitions independently from runtime environments and transport protocols.

---

# AI Constraints

Before implementation

- Do not implement controller execution.
- Do not implement routing.
- Do not implement dependency injection.
- Do not implement networking.
- Focus only on ControllerBuilder abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-004-controller-registry.md
- TASK-005-controller-resolver.md

---

# Next Task

TASK-011-controller-provider.md
