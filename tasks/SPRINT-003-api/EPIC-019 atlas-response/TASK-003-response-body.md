---
id: TASK-003

title: Implement Response Body

status: Completed

priority: Critical

story_points: 34

sprint: SPRINT-003-api

epic: EPIC-019

package: atlas-response

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-003 — Implement Response Body

## Summary

Implement `ResponseBody`.

ResponseBody provides the provider-independent abstraction responsible for representing outbound response content within the Atlas ecosystem.

The body abstraction standardizes response content, metadata, lifecycle, and content type representation while remaining independent from runtime environments, serialization libraries, networking implementations, and HTTP providers.

---

# Capability

After this task is complete, Atlas provides reusable response body abstractions capable of representing multiple response formats through a unified contract.

---

# Goal

Provide unified response body abstraction.

---

# Business Value

Supports

- JSON responses
- Plain text responses
- HTML responses
- XML responses
- Binary responses
- Streaming responses

without coupling Atlas to runtime-specific response body implementations.

---

# Background

Applications return many different kinds of response content.

Atlas represents response content through a provider-independent abstraction.

Serialization is intentionally excluded from this task.

---

# Scope

## Included

- Response body abstraction
- Body metadata
- Body lifecycle
- Body type abstraction
- Immutable content representation

## Excluded

- JSON serialization
- XML serialization
- Compression
- Streaming implementation
- Networking
- UI

---

# Deliverables

```text
atlas-response/

ResponseBody.ts

ResponseBodyType.ts

ResponseBodyMetadata.ts

ResponseBodyLifecycle.ts

ResponseBodyContent.ts

index.ts
```

---

# Responsibilities

ResponseBody is responsible for

- representing outbound content
- exposing body metadata
- exposing content type abstraction
- managing lifecycle
- remaining provider independent

ResponseBody is NOT responsible for

- serialization
- compression
- streaming implementation
- networking
- UI

---

# Architecture

```text
ResponseBody

├── Content
├── Body Type
├── Metadata
└── Lifecycle

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
interface ResponseBody {
  readonly type: ResponseBodyType;

  readonly metadata: ResponseBodyMetadata;

  readonly lifecycle: ResponseBodyLifecycle;

  isEmpty(): boolean;

  size(): number;
}
```

---

# Supported Body Types

Structured

- JSON
- XML

Text

- Plain Text
- HTML

Binary

- Binary
- File

Streaming

- Stream

Future

- Server Sent Events
- NDJSON
- Protocol Buffers
- CBOR

---

# Dependency

Depends On

- TASK-002 — HTTP Response

---

# Risk

Critical

ResponseBody becomes the standardized response body abstraction across the Atlas Response ecosystem.

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

- [x] ResponseBody implemented.
- [x] Supports multiple body types.
- [x] Supports metadata.
- [x] Supports lifecycle.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable response body abstractions capable of representing outbound response payloads independently from serialization libraries, runtime environments, and networking implementations.

---

# AI Constraints

Before implementation

- Do not implement JSON serialization.
- Do not implement XML serialization.
- Do not implement compression.
- Do not implement streaming.
- Do not implement networking.
- Focus only on ResponseBody abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-002-http-response.md

---

# Next Task

TASK-004-response-headers.md
