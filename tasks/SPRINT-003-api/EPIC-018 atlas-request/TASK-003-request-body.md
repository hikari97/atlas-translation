---
id: TASK-003

title: Implement Request Body

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

# TASK-003 — Implement Request Body

## Summary

Implement `RequestBody`.

RequestBody provides the provider-independent abstraction responsible for representing the body of an inbound HTTP request within the Atlas ecosystem.

The body abstraction standardizes body representation, content metadata, lifecycle, and reading capabilities while remaining independent from runtime environments, networking implementations, serialization formats, and HTTP providers.

---

# Capability

After this task is complete, Atlas provides a reusable request body abstraction capable of supporting multiple content types without depending on specific runtime implementations.

---

# Goal

Provide unified request body abstraction.

---

# Business Value

Supports

- JSON requests
- Form requests
- Multipart requests
- Binary requests
- Streaming requests
- Provider independence

without coupling Atlas to runtime-specific request body implementations.

---

# Background

HTTP request bodies may contain different representations depending on the Content-Type.

Rather than exposing runtime-specific APIs, Atlas models request bodies through a reusable abstraction.

Parsing and serialization are intentionally excluded from this task.

---

# Scope

## Included

- Request body abstraction
- Body metadata
- Body lifecycle
- Body type abstraction
- Read-only body contract

## Excluded

- JSON parsing
- Multipart parsing
- Form parsing
- XML parsing
- Validation
- Networking
- UI

---

# Deliverables

```text
atlas-request/

RequestBody.ts

RequestBodyType.ts

RequestBodyMetadata.ts

RequestBodyLifecycle.ts

RequestBodyContent.ts

index.ts
```

---

# Responsibilities

RequestBody is responsible for

- representing request body content
- exposing body metadata
- exposing content type abstraction
- managing body lifecycle
- remaining provider independent

RequestBody is NOT responsible for

- JSON parsing
- Multipart parsing
- Validation
- File uploads
- Networking
- UI

---

# Architecture

```text
Request Body

├── Content
├── Body Type
├── Metadata
└── Lifecycle

        │
        ▼

 Http Request

        │
        ▼

 Request Core
```

---

# Public API

```ts
interface RequestBody {
  readonly type: RequestBodyType;

  readonly metadata: RequestBodyMetadata;

  readonly lifecycle: RequestBodyLifecycle;

  isEmpty(): boolean;

  size(): number;
}
```

---

# Supported Body Types

Structured

- JSON
- Form URL Encoded
- Multipart Form

Text

- Plain Text
- XML
- HTML

Binary

- Binary
- Octet Stream

Future

- Streaming
- NDJSON
- Protocol Buffers
- CBOR

---

# Dependency

Depends On

- TASK-002 — HTTP Request

---

# Risk

Critical

RequestBody becomes the standardized body abstraction across the Atlas Request ecosystem.

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

- [x] RequestBody implemented.
- [x] Supports multiple body types.
- [x] Supports metadata.
- [x] Supports lifecycle.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable request body abstractions capable of representing request payloads independently from serialization formats, runtime environments, and networking implementations.

---

# AI Constraints

Before implementation

- Do not implement JSON parsing.
- Do not implement multipart parsing.
- Do not implement form parsing.
- Do not implement XML parsing.
- Do not implement networking.
- Focus only on RequestBody abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-002-http-request.md

---

# Next Task

TASK-004-request-headers.md
