---
id: TASK-004

title: Implement Request Headers

status: Completed

priority: High

story_points: 21

sprint: SPRINT-003-api

epic: EPIC-018

package: atlas-request

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-004 — Implement Request Headers

## Summary

Implement `RequestHeaders`.

RequestHeaders provides the provider-independent abstraction responsible for exposing application-oriented access to HTTP request headers.

Rather than replacing HttpHeaders, RequestHeaders acts as a specialized facade that simplifies common request header operations while remaining independent from runtime environments, networking implementations, and HTTP providers.

---

# Capability

After this task is complete, Atlas provides a reusable request header abstraction optimized for application development.

---

# Goal

Provide unified request header abstraction.

---

# Business Value

Supports

- Authorization access
- Content negotiation
- Header lookup
- Typed header access
- Provider independence

without coupling Atlas to runtime-specific header implementations.

---

# Background

HttpHeaders models generic HTTP headers.

Applications frequently need convenient access to well-known request headers.

RequestHeaders provides this higher-level abstraction.

---

# Scope

## Included

- Request header abstraction
- Typed header access
- Header metadata
- Header lookup
- Read-only header operations

## Excluded

- Header parsing
- Authentication
- Cookie parsing
- Networking
- UI

---

# Deliverables

```text
atlas-request/

RequestHeaders.ts

RequestHeader.ts

RequestHeaderCollection.ts

RequestHeaderMetadata.ts

RequestHeaderLifecycle.ts

index.ts
```

---

# Responsibilities

RequestHeaders is responsible for

- exposing request headers
- simplifying header lookup
- exposing typed accessors
- exposing metadata
- remaining provider independent

RequestHeaders is NOT responsible for

- parsing headers
- authentication
- cookies
- networking
- UI

---

# Architecture

```text
HttpHeaders

      │

      ▼

RequestHeaders

├── Authorization
├── Content-Type
├── Accept
├── Host
├── User-Agent
└── Metadata

      │

      ▼

Controller
```

---

# Public API

```ts
interface RequestHeaders {
  has(name: string): boolean;

  get(name: string): string | undefined;

  authorization(): string | undefined;

  contentType(): string | undefined;

  accept(): string | undefined;

  host(): string | undefined;

  userAgent(): string | undefined;
}
```

---

# Supported Headers

Security

- Authorization

Content

- Content-Type
- Content-Length
- Accept
- Accept-Encoding

Network

- Host
- Origin
- Referer

Client

- User-Agent
- Accept-Language

Future

- Custom Headers
- Typed Headers
- Header Policies

---

# Dependency

Depends On

- TASK-002 — HTTP Request
- EPIC-016 — HttpHeaders

---

# Risk

High

RequestHeaders becomes the standardized application-level header abstraction across the Atlas Request ecosystem.

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

- [x] RequestHeaders implemented.
- [x] Supports typed header access.
- [x] Supports metadata.
- [x] Supports read-only operations.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable request header abstractions capable of providing application-oriented access to HTTP request headers independently from runtime environments and HTTP providers.

---

# AI Constraints

Before implementation

- Do not implement authentication.
- Do not implement cookie parsing.
- Do not implement networking.
- Do not implement runtime-specific header objects.
- Focus only on RequestHeaders abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-002-http-request.md
- EPIC-016 atlas-http

---

# Next Task

TASK-005-request-query.md
