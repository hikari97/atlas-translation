---
id: TASK-010

title: Implement Authentication Builder

status: Completed

priority: Critical

story_points: 55

sprint: SPRINT-003-api

epic: EPIC-023

package: atlas-authentication

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-010 — Implement Authentication Builder

## Summary

Implement `AuthenticationBuilder`.

AuthenticationBuilder provides the primary fluent API responsible for configuring and constructing immutable authentication definitions within the Atlas ecosystem.

Rather than manually registering authentication strategies, credentials, and schemes, applications declare authentication through a fluent builder that produces immutable authentication definitions suitable for execution by the authentication engine.

---

# Capability

After this task is complete, Atlas provides a fluent authentication configuration API reusable across HTTP, GraphQL, RPC, WebSocket, CLI, Queue Workers, Event Processing, and future transports.

---

# Goal

Provide unified authentication builder.

---

# Business Value

Supports

- Fluent configuration
- Readable authentication registration
- Strategy composition
- Immutable authentication definitions
- Transport independence

without coupling applications to runtime-specific authentication frameworks.

---

# Background

Authentication configuration should be declarative.

AuthenticationBuilder coordinates authentication strategy registration and scheme configuration while remaining independent from execution, session persistence, token generation, controllers, middleware, and runtime providers.

---

# Scope

## Included

- Builder abstraction
- Fluent API
- Strategy registration
- Scheme configuration
- Conditional registration
- Immutable authentication definitions

## Excluded

- Authentication execution
- Credential verification
- Session persistence
- Token generation
- Authorization
- Dependency Injection
- Networking
- UI

---

# Deliverables

```text
atlas-authentication/

AuthenticationBuilder.ts

AuthenticationBuilderFactory.ts

AuthenticationBuilderState.ts

AuthenticationBuilderContext.ts

AuthenticationDefinition.ts

index.ts
```

---

# Responsibilities

AuthenticationBuilder is responsible for

- configuring authentication strategies
- configuring authentication schemes
- producing immutable AuthenticationDefinition collections
- remaining provider independent

AuthenticationBuilder is NOT responsible for

- authenticating identities
- verifying credentials
- generating tokens
- authorization
- dependency injection
- networking
- UI

---

# Architecture

```text
Application

      │

      ▼

AuthenticationBuilder

      │

      ▼

AuthenticationDefinition

      │

      ▼

AuthenticationRegistry

      │

      ▼

AuthenticationResolver
```

---

# Public API

```ts
interface AuthenticationBuilder {
  scheme(name: string): this;

  strategy(strategy: AuthenticationFactory): this;

  credential(credential: AuthenticationCredential): this;

  when(
    condition: boolean,
    configure: (builder: AuthenticationBuilder) => void,
  ): this;

  build(): readonly AuthenticationDefinition[];
}
```

---

# Supported Builder Features

Composition

- scheme()
- strategy()
- credential()
- build()

Conditional

- when()
- unless()

Organization

- Multiple Schemes
- Shared Configuration

Future

- Authentication Profiles
- Plugin Strategies
- Module Registration
- Dynamic Configuration

---

# Dependency

Depends On

- TASK-004 — Authentication Registry
- TASK-006 — Authentication Credential

---

# Risk

Critical

AuthenticationBuilder becomes the primary authentication configuration API across the Atlas ecosystem.

---

# Files Allowed

```text
atlas-authentication/**
```

---

# Files Forbidden

```text
None
```

---

# Acceptance Criteria

- [x] AuthenticationBuilder implemented.
- [x] Supports fluent API.
- [x] Supports strategy configuration.
- [x] Produces immutable AuthenticationDefinition.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes a reusable fluent authentication builder capable of constructing immutable authentication definitions independently from runtime environments and transport protocols.

---

# AI Constraints

Before implementation

- Do not implement authentication execution.
- Do not implement credential verification.
- Do not implement token generation.
- Do not implement authorization.
- Do not implement dependency injection.
- Do not implement networking.
- Focus only on AuthenticationBuilder abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-004-authentication-registry.md
- TASK-006-authentication-credential.md

---

# Next Task

TASK-011-authentication-provider.md
