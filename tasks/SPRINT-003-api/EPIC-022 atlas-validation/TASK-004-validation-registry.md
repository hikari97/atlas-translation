---
id: TASK-004

title: Implement Validation Registry

status: Completed

priority: High

story_points: 21

sprint: SPRINT-003-api

epic: EPIC-022

package: atlas-validation

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-004 — Implement Validation Registry

## Summary

Implement `ValidationRegistry`.

ValidationRegistry provides the provider-independent registry responsible for registering, discovering, and resolving validation definitions throughout the Atlas ecosystem.

Rather than storing execution state, the registry maintains validator descriptors and serves as the authoritative catalog of validators available to the application.

---

# Capability

After this task is complete, Atlas provides reusable validator registration and discovery infrastructure suitable for multiple transports and runtime providers.

---

# Goal

Provide unified validation registry.

---

# Business Value

Supports

- Validator registration
- Validator discovery
- Named validator lookup
- Validator descriptors
- Provider independence

without coupling Atlas Validation to runtime-specific validation containers.

---

# Background

Validators should be registered once during application startup.

The registry stores validator definitions while execution responsibilities remain delegated to ValidationResolver and ValidationExecutor.

---

# Scope

## Included

- Registry abstraction
- Validator registration
- Validator lookup
- Validator descriptors
- Registry metadata

## Excluded

- Rule execution
- Validation execution
- Dependency Injection
- Controller execution
- Networking
- UI

---

# Deliverables

```text
atlas-validation/

ValidationRegistry.ts

ValidationDescriptor.ts

ValidationIdentifier.ts

ValidationRegistryMetadata.ts

ValidationRegistryLifecycle.ts

index.ts
```

---

# Responsibilities

ValidationRegistry is responsible for

- registering validators
- resolving validator descriptors
- exposing registry metadata
- managing registry lifecycle
- remaining provider independent

ValidationRegistry is NOT responsible for

- executing validators
- rule evaluation
- dependency injection
- networking
- UI

---

# Architecture

```text
Validation Registry

├── Descriptor
├── Identifier
├── Metadata
└── Lifecycle

        │
        ▼

Validation Resolver

        │
        ▼

Validation Executor
```

---

# Public API

```ts
interface ValidationRegistry {
  register(descriptor: ValidationDescriptor): void;

  unregister(id: string): void;

  has(id: string): boolean;

  resolve(id: string): ValidationDescriptor | undefined;

  entries(): readonly ValidationDescriptor[];
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

- TASK-002 — Validation Interface

---

# Risk

High

ValidationRegistry becomes the standardized validator catalog across the Atlas ecosystem.

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

- [x] ValidationRegistry implemented.
- [x] Supports registration.
- [x] Supports lookup.
- [x] Supports metadata.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes a reusable validation registry capable of registering and resolving validator definitions independently from execution engines, runtime environments, and transport protocols.

---

# AI Constraints

Before implementation

- Do not implement validation execution.
- Do not implement dependency injection.
- Do not implement networking.
- Focus only on ValidationRegistry abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-001-validation-core.md
- TASK-002-validation-interface.md
- TASK-003-validation-context.md

---

# Next Task

TASK-005-validation-resolver.md
