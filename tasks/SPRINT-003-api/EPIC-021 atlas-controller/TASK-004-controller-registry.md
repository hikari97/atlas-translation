---
id: TASK-004

title: Implement Controller Registry

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

# TASK-004 — Implement Controller Registry

## Summary

Implement `ControllerRegistry`.

ControllerRegistry provides the provider-independent registry responsible for registering, discovering, and resolving controller definitions within the Atlas ecosystem.

Rather than storing execution state, the registry maintains controller descriptors and serves as the authoritative catalog of controllers available to the application.

---

# Capability

After this task is complete, Atlas provides reusable controller registration and discovery infrastructure suitable for multiple transports and runtime providers.

---

# Goal

Provide unified controller registry.

---

# Business Value

Supports

- Controller registration
- Controller discovery
- Named controller lookup
- Controller descriptors
- Provider independence

without coupling Atlas to runtime-specific controller containers.

---

# Background

Controllers should be registered once during application startup.

The registry stores controller definitions while execution responsibilities remain delegated to ControllerResolver and ControllerExecutor.

---

# Scope

## Included

- Registry abstraction
- Controller registration
- Controller lookup
- Controller descriptors
- Registry metadata

## Excluded

- Route matching
- Controller execution
- Dependency Injection
- Middleware execution
- Networking
- UI

---

# Deliverables

```text
atlas-controller/

ControllerRegistry.ts

ControllerDescriptor.ts

ControllerIdentifier.ts

ControllerRegistryMetadata.ts

ControllerRegistryLifecycle.ts

index.ts
```

---

# Responsibilities

ControllerRegistry is responsible for

- registering controllers
- resolving controller descriptors
- exposing registry metadata
- managing registry lifecycle
- remaining provider independent

ControllerRegistry is NOT responsible for

- route matching
- controller execution
- dependency injection
- middleware execution
- networking
- UI

---

# Architecture

```text
Controller Registry

├── Descriptor
├── Identifier
├── Metadata
└── Lifecycle

        │
        ▼

Controller Resolver

        │
        ▼

Controller Executor
```

---

# Public API

```ts
interface ControllerRegistry {
  register(descriptor: ControllerDescriptor): void;

  unregister(id: string): void;

  has(id: string): boolean;

  resolve(id: string): ControllerDescriptor | undefined;

  entries(): readonly ControllerDescriptor[];
}
```

---

# Supported Registry Features

Registration

- Register
- Replace
- Remove

Lookup

- By Identifier
- By Name

Metadata

- Description
- Namespace
- Tags

Future

- Auto Discovery
- Plugin Registration
- Module Registration
- Lazy Registration

---

# Dependency

Depends On

- TASK-002 — Controller Interface

---

# Risk

High

ControllerRegistry becomes the standardized controller catalog across the Atlas ecosystem.

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

- [x] ControllerRegistry implemented.
- [x] Supports registration.
- [x] Supports lookup.
- [x] Supports metadata.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes a reusable controller registry capable of registering and resolving controller definitions independently from execution engines, runtime environments, and transport protocols.

---

# AI Constraints

Before implementation

- Do not implement route matching.
- Do not implement dependency injection.
- Do not implement networking.
- Focus only on ControllerRegistry abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-001-controller-core.md
- TASK-002-controller-interface.md
- TASK-003-controller-context.md

---

# Next Task

TASK-005-controller-resolver.md
