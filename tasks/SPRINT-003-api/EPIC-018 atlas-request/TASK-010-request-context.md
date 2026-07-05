---
id: TASK-010

title: Implement Request Context

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

# TASK-010 — Implement Request Context

## Summary

Implement `RequestContext`.

RequestContext provides the provider-independent abstraction responsible for maintaining application-level request state throughout the lifetime of a processed request.

The context abstraction aggregates request-related services and state into a unified access point while remaining independent from runtime environments, networking implementations, routing frameworks, and HTTP providers.

---

# Capability

After this task is complete, Atlas provides a unified request context shared across controllers, middleware, validation, authentication, and future request-processing components.

---

# Goal

Provide unified request context.

---

# Business Value

Supports

- Shared request state
- Cross-component communication
- Request-scoped services
- Dependency isolation
- Provider independence

without coupling application components to HTTP or routing internals.

---

# Background

Application components frequently require access to request-scoped information.

Instead of exposing multiple independent abstractions, Atlas aggregates request information through RequestContext.

RequestContext becomes the primary application-facing context.

---

# Scope

## Included

- Request context abstraction
- Context metadata
- Context lifecycle
- Shared request services
- Context storage

## Excluded

- Validation
- Authentication
- Middleware
- Dependency Injection
- Networking
- UI

---

# Deliverables

```text
atlas-request/

RequestContext.ts

RequestContextStorage.ts

RequestContextMetadata.ts

RequestContextLifecycle.ts

RequestContextState.ts

index.ts
```

---

# Responsibilities

RequestContext is responsible for

- maintaining request-scoped state
- exposing request services
- exposing metadata
- managing lifecycle
- remaining provider independent

RequestContext is NOT responsible for

- routing
- validation
- authentication
- dependency injection
- networking
- UI

---

# Architecture

```text
RequestContext

├── HttpRequest
├── RequestBody
├── RequestQuery
├── RequestParameters
├── RequestCookies
├── RequestFiles
├── RequestSession
├── Metadata
└── Lifecycle

        │
        ▼

Controller

Middleware

Validation
```

---

# Public API

```ts
interface RequestContext {
  readonly request: HttpRequest;

  readonly body: RequestBody;

  readonly query: RequestQuery;

  readonly parameters: RequestParameters;

  readonly cookies: RequestCookies;

  readonly files: RequestFiles;

  readonly session: RequestSession;

  readonly metadata: RequestContextMetadata;

  readonly lifecycle: RequestContextLifecycle;
}
```

---

# Supported Context Services

Context

- Request
- Body
- Query
- Parameters
- Cookies
- Files
- Session

Future

- Authentication
- Authorization
- Validation
- Localization
- Request Cache

---

# Dependency

Depends On

- TASK-002 — HTTP Request
- TASK-003 — Request Body
- TASK-005 — Request Query
- TASK-006 — Request Parameters
- TASK-007 — Request Cookies
- TASK-008 — Request Files
- TASK-009 — Request Session

---

# Risk

Critical

RequestContext becomes the standardized application request context across the Atlas ecosystem.

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

- [x] RequestContext implemented.
- [x] Aggregates request services.
- [x] Supports lifecycle.
- [x] Supports metadata.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable request context abstractions capable of sharing application-level request state independently from runtime environments, routing frameworks, and networking implementations.

---

# AI Constraints

Before implementation

- Do not implement dependency injection.
- Do not implement authentication.
- Do not implement validation.
- Do not implement middleware.
- Do not implement networking.
- Focus only on RequestContext abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-002-http-request.md
- TASK-003-request-body.md
- TASK-005-request-query.md
- TASK-006-request-parameters.md
- TASK-007-request-cookies.md
- TASK-008-request-files.md
- TASK-009-request-session.md

---

# Next Task

TASK-011-request-metadata.md
