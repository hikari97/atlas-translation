---
id: TASK-006

title: Implement Response Cookies

status: Completed

priority: High

story_points: 21

sprint: SPRINT-003-api

epic: EPIC-019

package: atlas-response

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-006 — Implement Response Cookies

## Summary

Implement `ResponseCookies`.

ResponseCookies provides the provider-independent abstraction responsible for constructing outbound HTTP cookies within the Atlas ecosystem.

Rather than exposing raw `Set-Cookie` headers, ResponseCookies provides a fluent API for defining cookies while remaining independent from runtime environments, networking implementations, cookie serialization libraries, and HTTP providers.

---

# Capability

After this task is complete, Atlas provides reusable response cookie abstractions shared across authentication, session management, controllers, middleware, and future response-processing components.

---

# Goal

Provide unified response cookie abstraction.

---

# Business Value

Supports

- Session cookies
- Authentication cookies
- Preference cookies
- Cookie deletion
- Secure cookies
- Provider independence

without coupling Atlas to runtime-specific cookie implementations.

---

# Background

Applications frequently need to generate cookies.

Cookie generation should not require manually constructing HTTP `Set-Cookie` headers.

Atlas exposes cookie construction through a dedicated abstraction.

Cookie serialization is intentionally excluded from this task.

---

# Scope

## Included

- Cookie abstraction
- Cookie collection
- Cookie metadata
- Cookie lifecycle
- Fluent cookie builder

## Excluded

- Cookie serialization
- Cookie encryption
- Cookie signing
- Session implementation
- Authentication
- Networking
- UI

---

# Deliverables

```text
atlas-response/

ResponseCookies.ts

ResponseCookie.ts

ResponseCookieCollection.ts

ResponseCookieMetadata.ts

ResponseCookieLifecycle.ts

index.ts
```

---

# Responsibilities

ResponseCookies is responsible for

- representing outbound cookies
- exposing fluent cookie operations
- exposing cookie metadata
- managing cookie lifecycle
- remaining provider independent

ResponseCookies is NOT responsible for

- cookie serialization
- cookie encryption
- cookie signing
- session management
- authentication
- networking
- UI

---

# Architecture

```text
ResponseCookies

├── Cookie Collection
├── Cookie Metadata
├── Lifecycle
└── Fluent API

        │
        ▼

HttpResponse

        │
        ▼

ResponseBuilder
```

---

# Public API

```ts
interface ResponseCookies {
  add(cookie: ResponseCookie): this;

  remove(name: string): this;

  clear(): this;

  has(name: string): boolean;

  get(name: string): ResponseCookie | undefined;

  values(): readonly ResponseCookie[];
}
```

---

# Supported Cookie Features

Attributes

- Name
- Value
- Domain
- Path
- Max-Age
- Expires

Security

- HttpOnly
- Secure
- SameSite

Operations

- Add
- Replace
- Delete

Future

- Signed Cookies
- Encrypted Cookies
- Cookie Policies
- Cookie Templates

---

# Dependency

Depends On

- TASK-002 — HTTP Response

---

# Risk

High

ResponseCookies becomes the standardized outbound cookie abstraction across the Atlas Response ecosystem.

---

# Files Allowed

```text
atlas-response/**
```

---

# Files Forbidden

```text
None
```

---

# Acceptance Criteria

- [x] ResponseCookies implemented.
- [x] Supports fluent cookie operations.
- [x] Supports immutable enumeration.
- [x] Supports metadata.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable response cookie abstractions capable of constructing outbound cookies independently from runtime environments, cookie serialization libraries, and HTTP providers.

---

# AI Constraints

Before implementation

- Do not implement cookie serialization.
- Do not implement cookie encryption.
- Do not implement cookie signing.
- Do not implement authentication.
- Do not implement networking.
- Focus only on ResponseCookies abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-002-http-response.md

---

# Next Task

TASK-007-response-cache.md
