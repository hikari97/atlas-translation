---
id: TASK-005

title: Implement Validation Resolver

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

# TASK-005 — Implement Validation Resolver

## Summary

Implement `ValidationResolver`.

ValidationResolver provides the provider-independent abstraction responsible for resolving validation descriptors into executable validation instances.

Rather than constructing validators directly, the resolver translates validation descriptors registered within ValidationRegistry into runtime-ready validation instances while remaining independent from dependency injection frameworks, runtime environments, networking implementations, and transport protocols.

---

# Capability

After this task is complete, Atlas provides reusable validation resolution infrastructure shared across controllers, executors, and future runtime providers.

---

# Goal

Provide unified validation resolution abstraction.

---

# Business Value

Supports

- Lazy validator creation
- Named validator resolution
- Validation factories
- Extensible resolution
- Provider independence

without coupling Atlas Validation to dependency injection containers or runtime-specific validation factories.

---

# Background

Validation definitions should be resolved only when required.

Separating registration from resolution improves startup performance, extensibility, and future dependency injection support.

---

# Scope

## Included

- Validation resolution
- Descriptor lookup
- Factory invocation
- Resolution metadata
- Resolution lifecycle

## Excluded

- Validation execution
- Rule evaluation
- Dependency Injection
- Networking
- UI

---

# Deliverables

```text
atlas-validation/

ValidationResolver.ts

ValidationResolution.ts

ValidationFactory.ts

ValidationResolverMetadata.ts

ValidationResolverLifecycle.ts

index.ts
```

---

# Responsibilities

ValidationResolver is responsible for

- resolving validation descriptors
- invoking validation factories
- exposing resolution metadata
- managing resolver lifecycle
- remaining provider independent

ValidationResolver is NOT responsible for

- executing validation
- evaluating rules
- dependency injection
- networking
- UI

---

# Architecture

```text
ValidationRegistry

        │

        ▼

ValidationResolver

├── Descriptor Lookup
├── Factory Invocation
├── Metadata
└── Lifecycle

        │

        ▼

Validation Instance

        │

        ▼

ValidationExecutor
```

---

# Public API

```ts
interface ValidationResolver {
  resolve(identifier: ValidationIdentifier): Validation;

  canResolve(identifier: ValidationIdentifier): boolean;
}
```

---

# Supported Resolution Features

Resolution

- Named Validation
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

- TASK-002 — Validation Interface
- TASK-004 — Validation Registry

---

# Risk

Critical

ValidationResolver becomes the standardized validation resolution abstraction across the Atlas ecosystem.

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

- [x] ValidationResolver implemented.
- [x] Supports descriptor resolution.
- [x] Supports lazy validator creation.
- [x] Supports metadata.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes a reusable validation resolver capable of resolving validation instances independently from runtime environments, dependency injection frameworks, and transport protocols.

---

# AI Constraints

Before implementation

- Do not implement dependency injection.
- Do not implement plugin discovery.
- Do not implement networking.
- Focus only on ValidationResolver abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-002-validation-interface.md
- TASK-004-validation-registry.md

---

# Next Task

TASK-006-validation-rule.md
