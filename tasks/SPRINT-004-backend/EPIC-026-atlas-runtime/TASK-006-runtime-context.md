---
id: TASK-006

title: Implement Runtime Context

status: Ready

priority: Critical

story_points: 21

sprint: SPRINT-004-backend

epic: EPIC-026

package: atlas-runtime

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-006 — Implement Runtime Context

## Summary

Implement `RuntimeContext`.

RuntimeContext provides the provider-independent abstraction responsible for representing the execution context of an Atlas runtime.

The context abstraction standardizes access to runtime state, environment, configuration, lifecycle, metadata, runtime services, and extension data while remaining independent from dependency injection frameworks, operating systems, and hosting environments.

---

# Capability

After this task is complete, Atlas supports standardized runtime execution context abstractions.

---

# Goal

Provide reusable runtime execution context.

---

# Business Value

Supports

- Shared runtime information
- Context propagation
- Runtime coordination
- Cross-package communication
- Provider independence

without coupling Atlas packages to a specific runtime implementation.

---

# Background

Every backend component requires access to runtime information.

Instead of exposing multiple runtime objects individually, Atlas exposes a single RuntimeContext representing the current runtime execution environment.

This becomes the shared object passed throughout the backend ecosystem.

---

# Scope

## Included

- Runtime execution context
- Runtime metadata
- Shared runtime objects
- Context attributes
- Extension points

## Excluded

- Dependency injection
- Service resolution
- Process management
- Networking
- Business logic

---

# Deliverables

```text
atlas-runtime/

RuntimeContext.ts

RuntimeContextMetadata.ts

RuntimeContextAttributes.ts

RuntimeContextExtension.ts

RuntimeContextLifecycle.ts

index.ts
```

---

# Responsibilities

RuntimeContext is responsible for

- exposing runtime information
- exposing shared runtime objects
- propagating runtime metadata
- exposing context attributes
- remaining provider independent

RuntimeContext is NOT responsible for

- dependency injection
- service resolution
- networking
- module loading
- business logic

---

# Architecture

```text
Runtime Context

├── Environment
├── Configuration
├── Lifecycle
├── State
├── Metadata
├── Attributes
└── Extensions
```

---

# Public API

```ts
interface RuntimeContext {
  readonly environment: RuntimeEnvironment;

  readonly configuration: RuntimeConfiguration;

  readonly lifecycle: RuntimeLifecycle;

  readonly state: RuntimeState;

  readonly metadata: RuntimeContextMetadata;

  readonly attributes: ReadonlyMap<string, unknown>;
}
```

---

# Supported Context Services

Runtime

- Environment
- Configuration
- Lifecycle
- State

Metadata

- Runtime Metadata
- Runtime Attributes
- Runtime Properties

Future

- Distributed Context
- Runtime Snapshot
- Activity Context
- OpenTelemetry Context

---

# Dependency

Depends On

- TASK-002 — Runtime Environment
- TASK-003 — Runtime Configuration
- TASK-004 — Runtime Lifecycle
- TASK-005 — Runtime State

---

# Risk

Critical

RuntimeContext becomes the standardized execution context across the Atlas backend ecosystem.

---

# Files Allowed

```text
atlas-runtime/**
```

---

# Files Forbidden

```text
None
```

---

# Acceptance Criteria

- [ ] RuntimeContext implemented.
- [ ] Supports runtime metadata.
- [ ] Supports context attributes.
- [ ] Supports shared runtime objects.
- [ ] Provider independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable runtime execution contexts capable of sharing runtime information independently from dependency injection frameworks, operating systems, and hosting environments.

---

# AI Constraints

Before implementation

- Do not implement dependency injection.
- Do not implement service resolution.
- Do not implement networking.
- Do not implement business logic.
- Focus only on RuntimeContext abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-005-runtime-state.md

---

# Next Task

TASK-007-runtime-service.md
