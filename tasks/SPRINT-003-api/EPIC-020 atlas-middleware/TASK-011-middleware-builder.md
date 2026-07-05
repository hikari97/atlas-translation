---
id: TASK-011

title: Implement Middleware Builder

status: Completed

priority: Critical

story_points: 55

sprint: SPRINT-003-api

epic: EPIC-020

package: atlas-middleware

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-011 — Implement Middleware Builder

## Summary

Implement `MiddlewareBuilder`.

MiddlewareBuilder provides the primary fluent API responsible for constructing immutable middleware pipelines within the Atlas ecosystem.

Rather than manually creating pipelines, middleware chains, or execution graphs, applications configure middleware declaratively through MiddlewareBuilder.

The builder produces immutable MiddlewarePipeline instances suitable for execution by MiddlewareExecutor.

---

# Capability

After this task is complete, Atlas provides a fluent middleware configuration API reusable across HTTP, GraphQL, RPC, CLI, Queue Workers, and future transports.

---

# Goal

Provide unified middleware builder.

---

# Business Value

Supports

- Fluent configuration
- Readable middleware definition
- Immutable pipeline creation
- Transport independence
- Strong typing

without coupling applications to runtime-specific middleware implementations.

---

# Background

Middleware configuration should be declarative.

MiddlewareBuilder coordinates middleware registration into execution pipelines while remaining independent from execution.

---

# Scope

## Included

- Builder abstraction
- Fluent API
- Middleware grouping
- Conditional middleware
- Immutable pipeline creation

## Excluded

- Middleware execution
- Dependency Injection
- Networking
- UI

---

# Deliverables

```text
atlas-middleware/

MiddlewareBuilder.ts

MiddlewareBuilderFactory.ts

MiddlewareBuilderState.ts

MiddlewareBuilderContext.ts

MiddlewareBuilderResult.ts

index.ts
```

---

# Responsibilities

MiddlewareBuilder is responsible for

- configuring middleware
- grouping middleware
- composing execution pipelines
- producing immutable MiddlewarePipeline
- remaining transport independent

MiddlewareBuilder is NOT responsible for

- executing middleware
- dependency injection
- networking
- UI

---

# Architecture

```text
Application

      │

      ▼

MiddlewareBuilder

      │

      ▼

MiddlewarePipeline

      │

      ▼

MiddlewareExecutor
```

---

# Public API

```ts
interface MiddlewareBuilder {
  use(middleware: Middleware): this;

  group(configure: (builder: MiddlewareBuilder) => void): this;

  when(
    condition: boolean,
    configure: (builder: MiddlewareBuilder) => void,
  ): this;

  build(): MiddlewarePipeline;
}
```

---

# Supported Builder Features

Composition

- use()
- group()
- build()

Conditional

- when()
- unless()

Organization

- Nested Groups
- Named Groups

Future

- Parallel Groups
- Branch Groups
- Plugin Groups
- Transport-specific Groups

---

# Dependency

Depends On

- TASK-004 — Middleware Pipeline
- TASK-006 — Middleware Registry
- TASK-007 — Middleware Resolver

---

# Risk

Critical

MiddlewareBuilder becomes the primary middleware configuration API across the Atlas ecosystem.

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

- [x] MiddlewareBuilder implemented.
- [x] Supports fluent API.
- [x] Produces immutable MiddlewarePipeline.
- [x] Supports grouping.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes a reusable fluent middleware builder capable of constructing immutable middleware pipelines independently from runtime environments and transport protocols.

---

# AI Constraints

Before implementation

- Do not implement middleware execution.
- Do not implement dependency injection.
- Do not implement networking.
- Focus only on MiddlewareBuilder abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-004-middleware-pipeline.md
- TASK-006-middleware-registry.md
- TASK-007-middleware-resolver.md

---

# Next Task

TASK-012-middleware-provider.md
