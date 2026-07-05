---
id: TASK-012

title: Implement Response Builder

status: Completed

priority: Critical

story_points: 55

sprint: SPRINT-003-api

epic: EPIC-019

package: atlas-response

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-012 — Implement Response Builder

## Summary

Implement `ResponseBuilder`.

ResponseBuilder provides the primary fluent API responsible for constructing outbound application responses within the Atlas ecosystem.

Rather than exposing mutable HTTP response objects, ResponseBuilder incrementally builds a ResponseContext and finally produces an immutable HttpResponse.

The builder remains independent from runtime environments, serialization frameworks, networking implementations, and HTTP providers.

---

# Capability

After this task is complete, Atlas provides a fluent, expressive, provider-independent API for constructing application responses.

---

# Goal

Provide unified response builder.

---

# Business Value

Supports

- Fluent API
- Strong typing
- Immutable responses
- Readable controller code
- Provider independence

without coupling application code to HTTP runtime implementations.

---

# Background

Controllers should focus on business logic.

Response construction belongs to ResponseBuilder.

The builder coordinates response status, headers, cookies, body, attachments, cache policies, metadata, and lifecycle before producing an immutable HttpResponse.

---

# Scope

## Included

- Builder abstraction
- Fluent API
- Context mutation
- Response composition
- Immutable response creation

## Excluded

- Serialization
- Compression
- Streaming
- Networking
- UI

---

# Deliverables

```text
atlas-response/

ResponseBuilder.ts

ResponseBuilderFactory.ts

ResponseBuilderState.ts

ResponseBuilderContext.ts

ResponseBuilderResult.ts

index.ts
```

---

# Responsibilities

ResponseBuilder is responsible for

- building responses
- mutating ResponseContext
- composing response objects
- producing immutable HttpResponse
- remaining provider independent

ResponseBuilder is NOT responsible for

- serialization
- compression
- networking
- UI

---

# Architecture

```text
Controller

     │

     ▼

ResponseBuilder

     │

     ▼

ResponseContext

     │

     ▼

HttpResponse

     │

     ▼

Runtime Provider
```

---

# Public API

```ts
interface ResponseBuilder {
  status(code: number): this;

  header(name: string, value: string): this;

  cookie(cookie: ResponseCookie): this;

  cache(policy: ResponseCache): this;

  body(body: ResponseBody): this;

  attachment(attachment: ResponseAttachment): this;

  build(): HttpResponse;
}
```

---

# Semantic Builder API

Success

- ok()
- created()
- accepted()
- noContent()

Redirect

- redirect()

Client Error

- badRequest()
- unauthorized()
- forbidden()
- notFound()
- conflict()
- unprocessable()

Server Error

- internalServerError()
- serviceUnavailable()
- badGateway()

Body

- json()
- text()
- html()
- xml()

Attachment

- download()
- inline()

Infrastructure

- header()
- cookie()
- cache()

Future

- stream()
- sse()
- protobuf()
- file()

---

# Dependency

Depends On

- TASK-002 — HTTP Response
- TASK-003 — Response Body
- TASK-004 — Response Headers
- TASK-005 — Response Status
- TASK-006 — Response Cookies
- TASK-007 — Response Cache
- TASK-008 — Response Attachment
- TASK-009 — Response Context
- TASK-011 — Response Lifecycle

---

# Risk

Critical

ResponseBuilder becomes the primary response construction API across the Atlas ecosystem.

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

- [x] ResponseBuilder implemented.
- [x] Supports fluent API.
- [x] Produces immutable HttpResponse.
- [x] Supports ResponseContext.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes a reusable fluent response builder capable of constructing immutable application responses independently from runtime environments, networking implementations, and HTTP providers.

---

# AI Constraints

Before implementation

- Do not implement serialization.
- Do not implement compression.
- Do not implement networking.
- Focus only on ResponseBuilder abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-002-http-response.md
- TASK-009-response-context.md
- TASK-011-response-lifecycle.md

---

# Next Task

TASK-013-response-provider.md
