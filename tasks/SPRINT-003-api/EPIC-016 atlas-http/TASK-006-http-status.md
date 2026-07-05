---
id: TASK-006

title: Implement HTTP Status

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

# TASK-006 — Implement HTTP Status

## Summary

Implement `HttpStatus`.

HttpStatus provides the provider-independent abstraction responsible for representing HTTP response status codes and their semantic meaning.

The status abstraction standardizes status codes, reason phrases, categories, and metadata while remaining independent from runtime environments, networking implementations, and HTTP providers.

---

# Capability

After this task is complete, Atlas provides a reusable HTTP status abstraction shared across all HTTP responses.

---

# Goal

Provide unified HTTP status abstraction.

---

# Business Value

Supports

- Standardized status representation
- Consistent API behavior
- Protocol compliance
- Provider independence
- Future protocol evolution

without coupling Atlas to runtime-specific status implementations.

---

# Background

HTTP responses contain a status code and an associated semantic meaning.

Rather than exposing raw numeric values throughout the framework, Atlas models HTTP status as a reusable value object.

---

# Scope

## Included

- Status abstraction
- Status categories
- Reason phrases
- Status metadata
- Status lookup

## Excluded

- HTTP Response
- Exception handling
- Error pages
- Networking
- UI

---

# Deliverables

```text
atlas-http/

HttpStatus.ts

HttpStatusCategory.ts

HttpStatusMetadata.ts

HttpStatusRegistry.ts

HttpStatusLookup.ts

index.ts
```

---

# Responsibilities

HttpStatus is responsible for

- representing HTTP status codes
- exposing reason phrases
- exposing status categories
- exposing status metadata
- remaining provider independent

HttpStatus is NOT responsible for

- generating responses
- exception handling
- networking
- UI

---

# Architecture

```text
HTTP Status

├── Status Code
├── Reason Phrase
├── Category
├── Metadata
└── Registry

        │
        ▼

   HttpResponse

        │
        ▼

 Exception Layer
```

---

# Public API

```ts
interface HttpStatus {
  readonly code: number;

  readonly phrase: string;

  readonly category: HttpStatusCategory;

  readonly metadata: HttpStatusMetadata;
}
```

---

# Supported Status Categories

Informational

- 1xx

Success

- 2xx

Redirection

- 3xx

Client Error

- 4xx

Server Error

- 5xx

Future

- Custom Status Registry
- Experimental Status Codes

---

# Dependency

Depends On

- TASK-003 — HTTP Message

---

# Risk

Medium

HttpStatus becomes the standardized HTTP status abstraction across the Atlas HTTP ecosystem.

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

- [x] HttpStatus implemented.
- [x] Supports status categories.
- [x] Supports reason phrases.
- [x] Supports metadata.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable HTTP status abstractions capable of supporting all HTTP response implementations independently from runtime environments and networking providers.

---

# AI Constraints

Before implementation

- Do not implement HttpResponse.
- Do not implement exception handling.
- Do not implement networking.
- Do not implement provider-specific status objects.
- Focus only on HttpStatus abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-003-http-message.md

---

# Next Task

TASK-007-http-method.md
