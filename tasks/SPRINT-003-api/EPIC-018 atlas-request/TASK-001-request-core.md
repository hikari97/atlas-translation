---
id: TASK-001

title: Implement Request Core

status: Completed

priority: Critical

story_points: 21

sprint: SPRINT-003-api

epic: EPIC-018

package: atlas-request

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-001 — Implement Request Core

## Summary

Implement `RequestCore`.

RequestCore provides the provider-independent foundation responsible for coordinating application-level request processing within the Atlas ecosystem.

The request core defines common abstractions, lifecycle, shared context, and services required by every request component while remaining independent from runtime environments, networking implementations, HTTP providers, and web frameworks.

---

# Capability

After this task is complete, Atlas provides a unified request foundation capable of supporting multiple runtime providers and request processing strategies.

---

# Goal

Provide unified request foundation.

---

# Business Value

Supports

- Application request processing
- Request lifecycle
- Shared request services
- Provider independence
- Extensible request infrastructure

without coupling Atlas to specific runtime implementations.

---

# Background

HttpRequest represents the HTTP protocol.

RequestCore represents the application-facing request abstraction.

Higher-level components such as controllers, middleware, validation, authentication, and model binding consume RequestCore instead of raw HTTP messages.

---

# Scope

## Included

- Request abstraction
- Request lifecycle
- Request context
- Request registry
- Request metadata

## Excluded

- Request body
- Query parameters
- Cookies
- Sessions
- Uploaded files
- Validation
- Networking
- UI

---

# Deliverables

```text
atlas-request/

RequestCore.ts

RequestContext.ts

RequestLifecycle.ts

RequestRegistry.ts

RequestMetadata.ts

index.ts
```

---

# Responsibilities

RequestCore is responsible for

- coordinating application request processing
- exposing request context
- managing request lifecycle
- exposing request services
- remaining provider independent

RequestCore is NOT responsible for

- parsing request body
- validation
- authentication
- session management
- networking
- UI

---

# Architecture

```text
Request Core

├── Request Context
├── Request Registry
├── Request Lifecycle
├── Request Metadata
└── Request Services

        │
        ▼

     Http Request

        │
        ▼

     Controller
```

---

# Public API

```ts
interface RequestCore {
  readonly context: RequestContext;

  readonly lifecycle: RequestLifecycle;

  readonly metadata: RequestMetadata;
}
```

---

# Supported Request Services

Core

- Request Context
- Request Metadata
- Request Lifecycle

Infrastructure

- Request Registry
- Request Services

Future

- Request Binding
- Validation
- Authentication
- Session
- Uploaded Files

---

# Dependency

Depends On

- EPIC-016 — atlas-http
- EPIC-017 — atlas-router

---

# Risk

Critical

RequestCore becomes the unified application request foundation across the Atlas ecosystem.

---

# Files Allowed

```text
atlas-request/**
```

---

# Files Forbidden

```text
None
```

---

# Acceptance Criteria

- [x] RequestCore implemented.
- [x] Supports request lifecycle.
- [x] Supports request context.
- [x] Supports request metadata.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable request abstractions capable of supporting application-level request processing independently from runtime environments and networking implementations.

---

# AI Constraints

Before implementation

- Do not implement request body parsing.
- Do not implement validation.
- Do not implement authentication.
- Do not implement sessions.
- Do not implement uploaded files.
- Do not implement networking.
- Focus only on RequestCore abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- EPIC-016 atlas-http
- EPIC-017 atlas-router

---

# Next Task

TASK-002-http-request.md
