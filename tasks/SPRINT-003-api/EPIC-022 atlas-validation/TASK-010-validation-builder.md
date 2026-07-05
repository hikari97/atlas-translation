---
id: TASK-010

title: Implement Validation Builder

status: Completed

priority: Critical

story_points: 55

sprint: SPRINT-003-api

epic: EPIC-022

package: atlas-validation

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-010 — Implement Validation Builder

## Summary

Implement `ValidationBuilder`.

ValidationBuilder provides the primary fluent API responsible for configuring and constructing immutable validation definitions within the Atlas ecosystem.

Rather than manually registering validators and validation rules, applications declare validation through a fluent builder that produces immutable validation definitions suitable for execution by the validation engine.

---

# Capability

After this task is complete, Atlas provides a fluent validation configuration API reusable across HTTP, GraphQL, RPC, WebSocket, CLI, Queue Workers, Event Processing, and future transports.

---

# Goal

Provide unified validation builder.

---

# Business Value

Supports

- Fluent configuration
- Readable validator registration
- Rule composition
- Immutable validation definitions
- Transport independence

without coupling applications to runtime-specific validation frameworks.

---

# Background

Validation configuration should be declarative.

ValidationBuilder coordinates validator registration and rule composition while remaining independent from execution, schema parsing, middleware, controllers, and runtime providers.

---

# Scope

## Included

- Builder abstraction
- Fluent API
- Validator registration
- Rule composition
- Conditional registration
- Immutable validation definitions

## Excluded

- Validation execution
- Rule evaluation
- Schema parsing
- Dependency Injection
- Networking
- UI

---

# Deliverables

```text
atlas-validation/

ValidationBuilder.ts

ValidationBuilderFactory.ts

ValidationBuilderState.ts

ValidationBuilderContext.ts

ValidationDefinition.ts

index.ts
```

---

# Responsibilities

ValidationBuilder is responsible for

- configuring validators
- composing validation rules
- producing immutable ValidationDefinition collections
- remaining provider independent

ValidationBuilder is NOT responsible for

- executing validation
- evaluating rules
- dependency injection
- networking
- UI

---

# Architecture

```text
Application

      │

      ▼

ValidationBuilder

      │

      ▼

ValidationDefinition

      │

      ▼

ValidationRegistry

      │

      ▼

ValidationResolver
```

---

# Public API

```ts
interface ValidationBuilder {
  validator(factory: ValidationFactory): this;

  rule(rule: ValidationRule): this;

  when(
    condition: boolean,
    configure: (builder: ValidationBuilder) => void,
  ): this;

  build(): readonly ValidationDefinition[];
}
```

---

# Supported Builder Features

Composition

- validator()
- rule()
- build()

Conditional

- when()
- unless()

Organization

- Rule Groups
- Shared Rules

Future

- Module Registration
- Plugin Validators
- Validation Profiles
- Rule Templates

---

# Dependency

Depends On

- TASK-004 — Validation Registry
- TASK-006 — Validation Rule

---

# Risk

Critical

ValidationBuilder becomes the primary validation configuration API across the Atlas ecosystem.

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

- [x] ValidationBuilder implemented.
- [x] Supports fluent API.
- [x] Supports rule composition.
- [x] Produces immutable ValidationDefinition.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes a reusable fluent validation builder capable of constructing immutable validation definitions independently from runtime environments and transport protocols.

---

# AI Constraints

Before implementation

- Do not implement validation execution.
- Do not implement schema parsing.
- Do not implement dependency injection.
- Do not implement networking.
- Focus only on ValidationBuilder abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-004-validation-registry.md
- TASK-006-validation-rule.md

---

# Next Task

TASK-011-validation-provider.md
