---
id: TASK-007

title: Implement Request Cookies

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

# TASK-007 — Implement Request Cookies

## Summary

Implement `RequestCookies`.

RequestCookies provides the provider-independent abstraction responsible for exposing inbound HTTP cookies through the Atlas request model.

Rather than exposing raw HTTP Cookie headers, RequestCookies provides an immutable application-oriented cookie collection while remaining independent from runtime environments, networking implementations, HTTP providers, and cookie parsing libraries.

---

# Capability

After this task is complete, Atlas provides reusable cookie abstractions shared across authentication, sessions, middleware, controllers, and future request-processing components.

---

# Goal

Provide unified request cookie abstraction.

---

# Business Value

Supports

- Session cookies
- Authentication cookies
- Preference cookies
- Secure cookie access
- Provider independence

without coupling Atlas to runtime-specific cookie implementations.

---

# Background

Cookies are transmitted through the HTTP Cookie header.

Applications require convenient access to cookie values without depending on HTTP parsing logic.

Cookie parsing itself is intentionally excluded from this task.

---

# Scope

## Included

- Cookie abstraction
- Cookie collection
- Cookie metadata
- Cookie lifecycle
- Read-only cookie lookup

## Excluded

- Cookie parsing
- Cookie signing
- Cookie encryption
- Session management
- Authentication
- Networking
- UI

---

# Deliverables

```text
atlas-request/

RequestCookies.ts

RequestCookie.ts

RequestCookieCollection.ts

RequestCookieMetadata.ts

RequestCookieLifecycle.ts

index.ts
```

---

# Responsibilities

RequestCookies is responsible for

- representing inbound cookies
- exposing cookie lookup
- exposing immutable collections
- exposing metadata
- remaining provider independent

RequestCookies is NOT responsible for

- parsing cookies
- signing cookies
- encrypting cookies
- session management
- authentication
- networking
- UI

---

# Architecture

```text
HTTP Cookie Header

        │

        ▼

RequestCookies

├── Cookie Collection
├── Metadata
└── Lifecycle

        │

        ▼

Request Core

        │

        ▼

Controller
```

---

# Public API

```ts
interface RequestCookies {
  has(name: string): boolean;

  get(name: string): string | undefined;

  keys(): readonly string[];

  values(): readonly RequestCookie[];
}
```

---

# Supported Cookie Features

Lookup

- Single Cookie
- Enumeration

Collection

- Immutable View

Future

- Signed Cookies
- Encrypted Cookies
- Typed Cookies
- Lazy Cookies
- Cookie Policies

---

# Dependency

Depends On

- TASK-002 — HTTP Request

---

# Risk

High

RequestCookies becomes the standardized cookie abstraction across the Atlas Request ecosystem.

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

- [x] RequestCookies implemented.
- [x] Supports cookie lookup.
- [x] Supports immutable collection.
- [x] Supports metadata.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable request cookie abstractions capable of representing inbound cookies independently from runtime environments, cookie parsing libraries, and networking implementations.

---

# AI Constraints

Before implementation

- Do not implement cookie parsing.
- Do not implement cookie signing.
- Do not implement cookie encryption.
- Do not implement sessions.
- Do not implement authentication.
- Do not implement networking.
- Focus only on RequestCookies abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-002-http-request.md

---

# Next Task

TASK-008-request-files.md
