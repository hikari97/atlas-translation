---
id: TASK-005

title: Implement Controller Resolver

status: Completed

priority: Critical

story_points: 34

sprint: SPRINT-003-api

epic: EPIC-021

package: atlas-controller

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-005 — Implement Controller Resolver

## Summary

Implement `ControllerResolver`.

ControllerResolver provides the provider-independent abstraction responsible for resolving controller descriptors into executable controller instances.

Rather than constructing controllers directly, the resolver translates controller descriptors registered within ControllerRegistry into runtime-ready controller instances while remaining independent from dependency injection frameworks, runtime environments, networking implementations, and transport protocols.

---

# Capability

After this task is complete, Atlas provides reusable controller resolution infrastructure shared across routers, executors, and future runtime providers.

---

# Goal

Provide unified controller resolution abstraction.

---

# Business Value

Supports

- Lazy controller creation
- Named controller resolution
- Controller factories
- Extensible resolution
- Provider independence

without coupling Atlas to dependency injection containers or runtime-specific controller factories.

---

# Background

Controller definitions should be resolved only when required.

Separating registration from resolution improves startup performance, extensibility, and future dependency injection support.

---

# Scope

## Included

- Controller resolution
- Descriptor lookup
- Factory invocation
- Resolution metadata
- Resolution lifecycle

## Excluded

- Dependency Injection
- Controller execution
- Middleware execution
- Networking
- UI

---

# Deliverables

```text
atlas-controller/

ControllerResolver.ts

ControllerResolution.ts

ControllerFactory.ts

ControllerResolverMetadata.ts

ControllerResolverLifecycle.ts

index.ts
```

---

# Responsibilities

ControllerResolver is responsible for

- resolving controller descriptors
- invoking controller factories
- exposing resolution metadata
- managing resolver lifecycle
- remaining provider independent

ControllerResolver is NOT responsible for

- executing controllers
- dependency injection
- middleware execution
- networking
- UI

---

# Architecture

```text
ControllerRegistry

        │

        ▼

ControllerResolver

├── Descriptor Lookup
├── Factory Invocation
├── Metadata
└── Lifecycle

        │

        ▼

Controller Instance

        │

        ▼

ControllerExecutor
```

---

# Public API

```ts
interface ControllerResolver {
  resolve(identifier: ControllerIdentifier): Controller;

  canResolve(identifier: ControllerIdentifier): boolean;
}
```

---

# Supported Resolution Features

Resolution

- Named Controller
- Descriptor Resolution
- Lazy Resolution

Factories

- Factory Resolution
- Instance Resolution

Future

- Scoped Resolution
- Dependency Injection
- Plugin Resolution
- Auto Discovery

---

# Dependency

Depends On

- TASK-002 — Controller Interface
- TASK-004 — Controller Registry

---

# Risk

Critical

ControllerResolver becomes the standardized controller resolution abstraction across the Atlas ecosystem.

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

- [x] ControllerResolver implemented.
- [x] Supports descriptor resolution.
- [x] Supports lazy controller creation.
- [x] Supports metadata.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes a reusable controller resolver capable of resolving controller instances independently from runtime environments, dependency injection frameworks, and transport protocols.

---

# AI Constraints

Before implementation

- Do not implement dependency injection.
- Do not implement plugin discovery.
- Do not implement networking.
- Focus only on ControllerResolver abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-002-controller-interface.md
- TASK-004-controller-registry.md

---

# Next Task

TASK-006-controller-dispatcher.md
