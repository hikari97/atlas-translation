---
id: TASK-005

title: Implement Request Query

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

# TASK-005 — Implement Request Query

## Summary

Implement `RequestQuery`.

RequestQuery provides the provider-independent abstraction responsible for representing URL query parameters within the Atlas ecosystem.

The query abstraction standardizes query lookup, metadata, lifecycle, multi-value access, and future extensibility while remaining independent from runtime environments, networking implementations, parsing libraries, and HTTP providers.

---

# Capability

After this task is complete, Atlas provides reusable query parameter abstractions capable of supporting modern HTTP applications.

---

# Goal

Provide unified request query abstraction.

---

# Business Value

Supports

- Query lookup
- Filtering
- Pagination
- Sorting
- Search
- Provider independence

without coupling Atlas to runtime-specific URL implementations.

---

# Background

URL query parameters are widely used for searching, filtering, sorting, pagination, and feature flags.

Rather than exposing runtime-specific URL APIs, Atlas models query parameters through a reusable abstraction.

Query parsing is intentionally excluded from this task.

---

# Scope

## Included

- Query abstraction
- Query collection
- Query metadata
- Query lifecycle
- Typed lookup

## Excluded

- Query parsing
- Validation
- Type conversion
- Networking
- UI

---

# Deliverables

```text
atlas-request/

RequestQuery.ts

RequestQueryParameter.ts

RequestQueryCollection.ts

RequestQueryMetadata.ts

RequestQueryLifecycle.ts

index.ts
```

---

# Responsibilities

RequestQuery is responsible for

- representing query parameters
- exposing typed lookup
- exposing query metadata
- managing query lifecycle
- remaining provider independent

RequestQuery is NOT responsible for

- parsing query strings
- validation
- converting types
- networking
- UI

---

# Architecture

```text
Request Query

├── Parameters
├── Collection
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
interface RequestQuery {
  has(key: string): boolean;

  get(key: string): string | undefined;

  getAll(key: string): readonly string[];

  keys(): readonly string[];

  entries(): readonly RequestQueryParameter[];
}
```

---

# Supported Query Features

Lookup

- Single Value
- Multiple Values

Collection

- Enumeration
- Immutable View

Future

- Nested Query
- Array Query
- Lazy Query
- Typed Query
- Query Binding

---

# Dependency

Depends On

- TASK-002 — HTTP Request

---

# Risk

High

RequestQuery becomes the standardized query abstraction across the Atlas Request ecosystem.

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

- [x] RequestQuery implemented.
- [x] Supports single-value lookup.
- [x] Supports multi-value lookup.
- [x] Supports immutable enumeration.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable request query abstractions capable of representing URL query parameters independently from runtime environments, parsing libraries, and networking implementations.

---

# AI Constraints

Before implementation

- Do not implement query parsing.
- Do not implement validation.
- Do not implement type conversion.
- Do not implement networking.
- Focus only on RequestQuery abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-002-http-request.md

---

# Next Task

TASK-006-request-parameters.md
