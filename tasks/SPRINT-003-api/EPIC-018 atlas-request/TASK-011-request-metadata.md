---
id: TASK-011

title: Implement Request Metadata

status: Completed

priority: Medium

story_points: 13

sprint: SPRINT-003-api

epic: EPIC-018

package: atlas-request

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-011 — Implement Request Metadata

## Summary

Implement `RequestMetadata`.

RequestMetadata provides the provider-independent abstraction responsible for describing application-level metadata associated with a request.

The metadata abstraction standardizes request-scoped metadata, lookup, lifecycle, and extensibility while remaining independent from runtime environments, networking implementations, routing frameworks, and HTTP providers.

---

# Capability

After this task is complete, Atlas provides standardized request metadata reusable across controllers, middleware, validation, diagnostics, logging, tracing, and future application services.

---

# Goal

Provide unified request metadata abstraction.

---

# Business Value

Supports

- Request tracing
- Correlation
- Diagnostics
- Multi-tenancy
- Localization
- Provider independence

without coupling Atlas to framework-specific metadata implementations.

---

# Background

Applications frequently require metadata that does not belong to HTTP or routing.

Examples include

- Request ID
- Correlation ID
- Trace ID
- Tenant ID
- Locale
- Client Application

These values belong to the request domain.

---

# Scope

## Included

- Metadata abstraction
- Metadata collection
- Metadata registry
- Metadata lookup
- Metadata lifecycle

## Excluded

- Logging
- Tracing
- Authentication
- Networking
- UI

---

# Deliverables

```text
atlas-request/

RequestMetadata.ts

RequestMetadataEntry.ts

RequestMetadataCollection.ts

RequestMetadataRegistry.ts

RequestMetadataLifecycle.ts

index.ts
```

---

# Responsibilities

RequestMetadata is responsible for

- representing request metadata
- exposing metadata lookup
- managing metadata collections
- exposing lifecycle
- remaining provider independent

RequestMetadata is NOT responsible for

- logging
- tracing
- authentication
- networking
- UI

---

# Architecture

```text
Request Metadata

├── Registry
├── Collection
├── Entries
└── Lifecycle

        │
        ▼

 RequestContext

        │
        ▼

Controller

Middleware

Validation
```

---

# Public API

```ts
interface RequestMetadata {
  has(key: string): boolean;

  get<T>(key: string): T | undefined;

  set<T>(key: string, value: T): void;

  remove(key: string): void;

  entries(): readonly RequestMetadataEntry[];
}
```

---

# Supported Metadata

Identity

- Request ID
- Correlation ID
- Trace ID

Application

- Tenant ID
- Locale
- Timezone
- Client Application

Future

- Feature Flags
- Request Tags
- Diagnostics
- Custom Metadata

---

# Dependency

Depends On

- TASK-010 — Request Context
- EPIC-016 — HttpMetadata
- EPIC-017 — RouteMetadata

---

# Risk

Medium

RequestMetadata becomes the standardized metadata abstraction across the Atlas Request ecosystem.

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

- [x] RequestMetadata implemented.
- [x] Supports metadata lookup.
- [x] Supports metadata registry.
- [x] Supports lifecycle.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable request metadata abstractions capable of describing application requests independently from runtime environments, routing frameworks, and networking implementations.

---

# AI Constraints

Before implementation

- Do not implement logging.
- Do not implement tracing.
- Do not implement authentication.
- Do not implement networking.
- Focus only on RequestMetadata abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-010-request-context.md
- EPIC-016 atlas-http
- EPIC-017 atlas-router

---

# Next Task

TASK-012-request-lifecycle.md
