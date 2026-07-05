---
id: TASK-001

title: Implement HTTP Core

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

# TASK-001 — Implement HTTP Core

## Summary

Implement `HttpCore`.

HttpCore provides the provider-independent foundation responsible for coordinating HTTP communication across the Atlas ecosystem.

The HTTP core defines the common abstractions, lifecycle, shared context, and service registry required by all HTTP capabilities while remaining independent from runtime environments, web frameworks, transport implementations, and HTTP providers.

---

# Capability

After this task is complete, Atlas provides a unified HTTP foundation capable of supporting multiple HTTP providers and server implementations.

---

# Goal

Provide unified HTTP foundation.

---

# Business Value

Supports

- HTTP foundation
- HTTP lifecycle
- HTTP service registry
- HTTP provider independence
- Extensible HTTP infrastructure
- Future server implementations

without coupling Atlas to a specific HTTP runtime or framework.

---

# Background

Atlas API requires a standardized HTTP foundation before introducing routing, middleware, request handling, response generation, or controller execution.

HttpCore establishes the common infrastructure shared across every HTTP component within the Atlas ecosystem.

---

# Scope

## Included

- HTTP abstraction
- HTTP lifecycle
- HTTP registry
- HTTP context
- HTTP metadata

## Excluded

- HTTP server
- HTTP client
- Request handling
- Response handling
- Routing
- Middleware
- Networking
- Web Framework
- UI

---

# Deliverables

```text
atlas-http/

HttpCore.ts

HttpContext.ts

HttpLifecycle.ts

HttpRegistry.ts

HttpMetadata.ts

index.ts
```

---

# Responsibilities

HttpCore is responsible for

- coordinating HTTP services
- exposing HTTP context
- managing HTTP lifecycle
- registering HTTP components
- remaining provider independent

HttpCore is NOT responsible for

- serving HTTP requests
- routing
- request parsing
- response generation
- networking
- framework integration
- UI

---

# Architecture

```text
HTTP Core

├── HTTP Registry
├── HTTP Context
├── HTTP Lifecycle
├── HTTP Metadata
└── HTTP Services

↓

HTTP Server

↓

Router

↓

Middleware

↓

Controller
```

---

# Public API

```ts
interface HttpCore {
  readonly registry: HttpRegistry;

  readonly context: HttpContext;

  readonly lifecycle: HttpLifecycle;
}
```

---

# Supported HTTP Services

Core

- HTTP Context
- HTTP Registry
- HTTP Lifecycle

Infrastructure

- Service Registration
- Metadata
- Shared Context

Future

- HTTP Server
- HTTP Client
- Router
- Middleware
- Request
- Response
- Controller

---

# Dependency

Depends On

- EPIC-005 — atlas-core

---

# Risk

Critical

HttpCore becomes the unified HTTP foundation across the Atlas API ecosystem.

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

- [x] HttpCore implemented.
- [x] Supports HTTP lifecycle.
- [x] Supports HTTP registry.
- [x] Supports HTTP context.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable HTTP abstractions capable of supporting future HTTP providers independently from runtime environments and web frameworks.

---

# AI Constraints

Before implementation

- Do not implement HTTP servers.
- Do not implement HTTP clients.
- Do not implement routing.
- Do not implement request parsing.
- Do not implement response generation.
- Do not implement networking.
- Do not implement Express, Fastify, Koa, Hono, Bun, Deno, or Node.js specific features.
- Focus only on HttpCore abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- EPIC-005 atlas-core

---

# Next Task

TASK-002-http-context.md
