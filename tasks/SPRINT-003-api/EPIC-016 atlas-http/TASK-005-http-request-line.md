---
id: TASK-005

title: Implement HTTP Request Line

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

# TASK-005 — Implement HTTP Request Line

## Summary

Implement `HttpRequestLine`.

HttpRequestLine provides the provider-independent abstraction responsible for representing the request line defined by the HTTP protocol.

The request line encapsulates the request method, request target, and protocol version while remaining independent from networking implementations, HTTP servers, runtime environments, and HTTP providers.

---

# Capability

After this task is complete, Atlas provides a standardized HTTP request line abstraction shared across all HTTP request implementations.

---

# Goal

Provide unified HTTP request line abstraction.

---

# Business Value

Supports

- Standardized request model
- Protocol compliance
- Provider independence
- Future protocol evolution

without coupling Atlas to specific HTTP runtimes or server implementations.

---

# Background

According to the HTTP specification, every request begins with a request line consisting of:

- HTTP Method
- Request Target
- HTTP Version

This task extracts those concepts into a reusable abstraction that will later be used by HttpRequest.

---

# Scope

## Included

- Request line abstraction
- HTTP method
- Request target
- HTTP version
- Request line metadata

## Excluded

- HTTP Request
- Header parsing
- Body parsing
- Routing
- Networking
- UI

---

# Deliverables

```text
atlas-http/

HttpRequestLine.ts

HttpRequestTarget.ts

HttpRequestLineMetadata.ts

HttpRequestLineLifecycle.ts

index.ts
```

---

# Responsibilities

HttpRequestLine is responsible for

- representing request line information
- exposing request target
- exposing protocol version
- exposing request metadata
- remaining provider independent

HttpRequestLine is NOT responsible for

- request parsing
- routing
- networking
- request body
- UI

---

# Architecture

```text
HTTP Request Line

├── Method
├── Request Target
├── Protocol Version
└── Metadata

        │
        ▼

     HttpRequest
```

---

# Public API

```ts
interface HttpRequestLine {
  readonly method: HttpMethod;

  readonly target: HttpRequestTarget;

  readonly protocol: HttpProtocol;

  readonly metadata: HttpRequestLineMetadata;
}
```

---

# Supported Request Line Services

Request Line

- Method
- Target
- Protocol Version

Target

- Origin Form
- Absolute Form
- Authority Form
- Asterisk Form

Future

- HTTP/1.1
- HTTP/2
- HTTP/3

---

# Dependency

Depends On

- TASK-003 — HTTP Message
- TASK-004 — HTTP Headers

---

# Risk

Medium

HttpRequestLine becomes the standardized request line abstraction across the Atlas HTTP ecosystem.

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

- [x] HttpRequestLine implemented.
- [x] Supports HTTP methods.
- [x] Supports request targets.
- [x] Supports protocol versions.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable HTTP request line abstractions capable of supporting future HTTP request implementations independently from runtime environments and networking implementations.

---

# AI Constraints

Before implementation

- Do not implement HttpRequest.
- Do not implement routing.
- Do not implement parsing.
- Do not implement networking.
- Do not implement provider-specific request objects.
- Focus only on HttpRequestLine abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-003-http-message.md
- TASK-004-http-headers.md

---

# Next Task

TASK-006-http-status.md
