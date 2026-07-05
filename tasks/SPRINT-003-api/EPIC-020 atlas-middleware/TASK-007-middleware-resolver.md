---
id: TASK-007

title: Implement Middleware Resolver

status: Completed

priority: Critical

story_points: 34

sprint: SPRINT-003-api

epic: EPIC-020

package: atlas-middleware

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-007 — Implement Middleware Resolver

## Summary

Implement `MiddlewareResolver`.

MiddlewareResolver provides the provider-independent abstraction responsible for resolving middleware definitions into executable middleware instances.

Rather than constructing middleware directly, the resolver translates middleware descriptors registered within MiddlewareRegistry into runtime-ready middleware while remaining independent from dependency injection frameworks, runtime environments, networking implementations, and transport protocols.

---

# Capability

After this task is complete, Atlas provides reusable middleware resolution infrastructure shared across pipelines, executors, and future runtime providers.

---

# Goal

Provide unified middleware resolution abstraction.

---

# Business Value

Supports

- Lazy middleware creation
- Named middleware
- Middleware factories
- Extensible resolution
- Provider independence

without coupling Atlas to dependency injection containers or runtime-specific middleware factories.

---

# Background

Middleware definitions should be resolved only when required.

Separating registration from resolution improves extensibility, startup performance, and future dependency injection support.

---

# Scope

## Included

- Middleware resolution
- Descriptor lookup
- Factory invocation
- Resolution metadata
- Resolution lifecycle

## Excluded

- Dependency Injection
- Middleware execution
- Authentication
- Validation
- Networking
- UI

---

# Deliverables

```text
atlas-middleware/

MiddlewareResolver.ts

MiddlewareResolution.ts

MiddlewareFactory.ts

MiddlewareResolverMetadata.ts

MiddlewareResolverLifecycle.ts

index.ts
```

---

# Responsibilities

MiddlewareResolver is responsible for

- resolving middleware descriptors
- invoking middleware factories
- exposing resolution metadata
- managing resolver lifecycle
- remaining transport independent

MiddlewareResolver is NOT responsible for

- executing middleware
- dependency injection
- authentication
- validation
- networking
- UI

---

# Architecture

```text
MiddlewareRegistry

        │

        ▼

MiddlewareResolver

├── Descriptor Lookup
├── Factory Invocation
├── Metadata
└── Lifecycle

        │

        ▼

Middleware Instance

        │

        ▼

MiddlewarePipeline
```

---

# Public API

```ts
interface MiddlewareResolver {
  resolve(identifier: MiddlewareIdentifier): Middleware;

  canResolve(identifier: MiddlewareIdentifier): boolean;
}
```

---

# Supported Resolution Features

Resolution

- Named Middleware
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

- TASK-002 — Middleware Interface
- TASK-006 — Middleware Registry

---

# Risk

Critical

MiddlewareResolver becomes the standardized middleware resolution abstraction across the Atlas ecosystem.

---

# Files Allowed

```text
atlas-middleware/**
```

---

# Files Forbidden

```text
None
```

---

# Acceptance Criteria

- [x] MiddlewareResolver implemented.
- [x] Supports descriptor resolution.
- [x] Supports lazy middleware creation.
- [x] Supports metadata.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes a reusable middleware resolver capable of resolving middleware independently from runtime environments, dependency injection frameworks, and transport protocols.

---

# AI Constraints

Before implementation

- Do not implement dependency injection.
- Do not implement plugin discovery.
- Do not implement networking.
- Focus only on MiddlewareResolver abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-002-middleware-interface.md
- TASK-006-middleware-registry.md

---

# Next Task

TASK-008-middleware-executor.md
