---
id: TASK-002

title: Implement HTTP Context

status: Completed

priority: Critical

story_points: 21

sprint: SPRINT-003-api

epic: EPIC-016

package: atlas-http

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-002 — Implement HTTP Context

## Summary

Implement `HttpContext`.

HttpContext provides the provider-independent abstraction responsible for representing the execution context of an HTTP transaction within the Atlas ecosystem.

The HTTP context acts as the shared execution environment for all HTTP components including routing, middleware, controllers, authentication, validation, and future HTTP extensions while remaining independent from runtime environments, networking implementations, and web frameworks.

---

# Capability

After this task is complete, Atlas provides a standardized HTTP execution context shared across the complete HTTP request lifecycle.

---

# Goal

Provide unified HTTP execution context.

---

# Business Value

Supports

- Shared execution state
- HTTP lifecycle
- Middleware communication
- Controller execution
- Provider independence
- Future HTTP extensions

without coupling execution state to specific web frameworks.

---

# Background

HttpCore establishes the HTTP foundation.

HttpContext represents the execution environment shared by every HTTP component during the lifetime of an HTTP transaction.

Every component operates against the same context abstraction.

---

# Scope

## Included

- HTTP context abstraction
- Context metadata
- Context lifecycle
- Context services
- Context storage

## Excluded

- HTTP Request
- HTTP Response
- Routing
- Middleware implementation
- Networking
- UI

---

# Deliverables

```text
atlas-http/

HttpContext.ts

HttpContextMetadata.ts

HttpContextLifecycle.ts

HttpContextStore.ts

HttpContextServices.ts

index.ts
```

---

# Responsibilities

HttpContext is responsible for

- exposing shared execution state
- managing context lifecycle
- exposing context metadata
- providing shared service access
- remaining provider independent

HttpContext is NOT responsible for

- routing
- request parsing
- response generation
- networking
- UI

---

# Architecture

```text
HTTP Context

├── Context Metadata
├── Context Store
├── Context Lifecycle
└── Context Services

↓

Router

↓

Middleware

↓

Controller

↓

Response
```

---

# Public API

```ts
interface HttpContext {
  readonly metadata: HttpContextMetadata;

  readonly lifecycle: HttpContextLifecycle;

  readonly services: HttpContextServices;

  readonly store: HttpContextStore;
}
```

---

# Supported Context Services

Context

- Shared State
- Metadata
- Context Store

Lifecycle

- Create
- Initialize
- Dispose

Infrastructure

- Service Access
- Context Lookup

Future

- Request
- Response
- Authentication
- Session
- Validation
- Logging

---

# Dependency

Depends On

- TASK-001 — HTTP Core

---

# Risk

Critical

HttpContext becomes the standardized execution context shared across the Atlas API ecosystem.

---

# Files Allowed

```text
atlas-http/**
```

---

# Files Forbidden

```text
None
```

---

# Acceptance Criteria

- [x] HttpContext implemented.
- [x] Supports shared execution state.
- [x] Supports lifecycle management.
- [x] Supports context services.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable HTTP execution context abstractions capable of coordinating all HTTP components independently from runtime environments and web frameworks.

---

# AI Constraints

Before implementation

- Do not implement Request.
- Do not implement Response.
- Do not implement routing.
- Do not implement networking.
- Do not implement framework-specific context objects.
- Focus only on HttpContext abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-001-http-core.md

---

# Next Task

TASK-003-http-message.md
