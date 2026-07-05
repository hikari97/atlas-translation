---
id: TASK-002

title: Implement HTTP Request

status: Completed

priority: Critical

story_points: 34

sprint: SPRINT-003-api

epic: EPIC-018

package: atlas-request

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-002 — Implement HTTP Request

## Summary

Implement `HttpRequest`.

HttpRequest provides the provider-independent aggregate responsible for representing an inbound HTTP request within the Atlas ecosystem.

The request aggregate composes the HTTP request line, headers, protocol, metadata, lifecycle, and context into a single immutable request abstraction while remaining independent from runtime environments, networking implementations, and HTTP providers.

---

# Capability

After this task is complete, Atlas provides a unified HTTP request model shared across routing, middleware, validation, controllers, and future request-processing components.

---

# Goal

Provide unified HTTP request abstraction.

---

# Business Value

Supports

- Standardized request model
- Provider independence
- Strong typing
- Shared request representation
- Future request extensions

without coupling Atlas to runtime-specific HTTP request implementations.

---

# Background

Atlas HTTP already defines individual protocol components.

HttpRequest becomes the aggregate root that combines those abstractions into a single request object consumed by higher-level components.

---

# Scope

## Included

- HTTP request aggregate
- Request composition
- Request metadata
- Request lifecycle
- Request identity

## Excluded

- Body parsing
- Query parsing
- Cookie parsing
- Session management
- Validation
- Networking
- UI

---

# Deliverables

```text
atlas-request/

HttpRequest.ts

HttpRequestIdentity.ts

HttpRequestMetadata.ts

HttpRequestLifecycle.ts

HttpRequestComposition.ts

index.ts
```

---

# Responsibilities

HttpRequest is responsible for

- representing inbound HTTP requests
- composing HTTP abstractions
- exposing request metadata
- exposing request lifecycle
- remaining provider independent

HttpRequest is NOT responsible for

- parsing body
- parsing query
- parsing cookies
- session management
- networking
- UI

---

# Architecture

```text
Http Request

├── Request Line
├── Headers
├── Protocol
├── Metadata
├── Lifecycle
└── Context

        │
        ▼

 Request Core
```

---

# Public API

```ts
interface HttpRequest {
  readonly line: HttpRequestLine;

  readonly headers: HttpHeaders;

  readonly protocol: HttpProtocol;

  readonly metadata: HttpRequestMetadata;

  readonly lifecycle: HttpRequestLifecycle;
}
```

---

# Supported Request Services

Request

- Request Line
- Headers
- Protocol

Infrastructure

- Metadata
- Lifecycle
- Identity

Future

- Body
- Query
- Cookies
- Session
- Uploaded Files

---

# Dependency

Depends On

- EPIC-016 — atlas-http
- TASK-001 — Request Core

---

# Risk

Critical

HttpRequest becomes the standardized HTTP request aggregate across the Atlas ecosystem.

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

- [x] HttpRequest implemented.
- [x] Composes HTTP abstractions.
- [x] Supports lifecycle.
- [x] Supports metadata.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes a reusable HTTP request aggregate capable of representing inbound requests independently from runtime environments, networking implementations, and HTTP providers.

---

# AI Constraints

Before implementation

- Do not implement body parsing.
- Do not implement query parsing.
- Do not implement cookies.
- Do not implement sessions.
- Do not implement validation.
- Do not implement networking.
- Focus only on HttpRequest aggregate.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- EPIC-016 atlas-http
- TASK-001-request-core.md

---

# Next Task

TASK-003-request-body.md
