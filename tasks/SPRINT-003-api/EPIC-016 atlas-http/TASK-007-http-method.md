---
id: TASK-007

title: Implement HTTP Method

status: Completed

priority: High

story_points: 13

sprint: SPRINT-003-api

epic: EPIC-016

package: atlas-http

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-007 — Implement HTTP Method

## Summary

Implement `HttpMethod`.

HttpMethod provides the provider-independent abstraction responsible for representing standardized HTTP request methods within the Atlas ecosystem.

The HTTP method abstraction standardizes request semantics, metadata, capabilities, and extensibility while remaining independent from runtime environments, networking implementations, and HTTP providers.

---

# Capability

After this task is complete, Atlas provides a reusable HTTP method abstraction shared across routing, middleware, request processing, controllers, and future API components.

---

# Goal

Provide unified HTTP method abstraction.

---

# Business Value

Supports

- Standardized request methods
- Routing
- Controller dispatch
- Middleware filtering
- OpenAPI generation
- Provider independence

without coupling Atlas to runtime-specific method implementations.

---

# Background

HTTP methods define the semantic intent of requests.

Rather than exposing raw strings such as GET or POST throughout the framework, Atlas models methods as reusable value objects.

---

# Scope

## Included

- HTTP method abstraction
- Method registry
- Method metadata
- Method classification
- Method lookup

## Excluded

- Request handling
- Routing
- Middleware
- Networking
- UI

---

# Deliverables

```text
atlas-http/

HttpMethod.ts

HttpMethodRegistry.ts

HttpMethodMetadata.ts

HttpMethodCategory.ts

HttpMethodLookup.ts

index.ts
```

---

# Responsibilities

HttpMethod is responsible for

- representing HTTP methods
- exposing method metadata
- exposing method characteristics
- exposing method registry
- remaining provider independent

HttpMethod is NOT responsible for

- request execution
- routing
- middleware
- networking
- UI

---

# Architecture

```text
HTTP Method

├── Method
├── Registry
├── Metadata
├── Category
└── Lookup

        │
        ▼

 Http Request Line

        │
        ▼

     Http Request
```

---

# Public API

```ts
interface HttpMethod {
  readonly name: string;

  readonly metadata: HttpMethodMetadata;

  readonly category: HttpMethodCategory;
}
```

---

# Supported Methods

Standard

- GET
- POST
- PUT
- PATCH
- DELETE
- HEAD
- OPTIONS
- TRACE
- CONNECT

Categories

- Safe
- Unsafe
- Idempotent
- Cacheable

Future

- Custom Methods
- Extension Methods
- WebDAV Methods

---

# Dependency

Depends On

- TASK-005 — HTTP Request Line

---

# Risk

Medium

HttpMethod becomes the standardized HTTP method abstraction across the Atlas HTTP ecosystem.

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

- [x] HttpMethod implemented.
- [x] Supports standard HTTP methods.
- [x] Supports method categories.
- [x] Supports metadata.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable HTTP method abstractions capable of supporting routing and request processing independently from runtime environments and HTTP providers.

---

# AI Constraints

Before implementation

- Do not implement routing.
- Do not implement request dispatch.
- Do not implement networking.
- Do not implement provider-specific request methods.
- Focus only on HttpMethod abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-005-http-request-line.md

---

# Next Task

TASK-008-http-protocol.md
