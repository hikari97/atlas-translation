---
id: TASK-006

title: Implement OpenAPI Operation

status: Completed

priority: Critical

story_points: 21

sprint: SPRINT-003-api

epic: EPIC-024

package: atlas-openapi

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-05
---

# TASK-006 — Implement OpenAPI Operation

## Summary

Implement `OpenAPIOperation`.

OpenAPIOperation provides the provider-independent abstraction responsible for representing executable API operations within an OpenAPI resource.

The operation abstraction standardizes HTTP methods, operation metadata, request and response contracts, security requirements, callbacks, and specification extensions while remaining independent from routing frameworks, HTTP servers, documentation generators, and API gateways.

---

# Capability

After this task is complete, Atlas API supports standardized API operation abstractions.

---

# Goal

Provide unified OpenAPI operation abstraction.

---

# Business Value

Supports

- REST operations
- API documentation
- SDK generation
- API contracts
- API discovery
- Provider independence

without coupling Atlas to HTTP frameworks.

---

# Background

Each OpenAPI resource exposes one or more operations.

An operation describes an executable API action including inputs, outputs, security, metadata, and behavior.

Atlas treats operations as domain actions instead of simple HTTP methods.

---

# Scope

## Included

- Operation abstraction
- HTTP method abstraction
- Operation metadata
- Operation lifecycle
- Specification extensions

## Excluded

- HTTP routing
- Controller execution
- Middleware execution
- Request validation
- UI

---

# Deliverables

```text
packages/atlas-openapi/

OpenAPIOperation.ts

OpenAPIOperationMetadata.ts

OpenAPIOperationMethod.ts

OpenAPIOperationLifecycle.ts

OpenAPIOperationExtension.ts

index.ts
```

---

# Responsibilities

OpenAPIOperation is responsible for

- representing API operations
- exposing operation metadata
- exposing HTTP methods
- exposing specification extensions
- remaining provider independent

OpenAPIOperation is NOT responsible for

- routing
- controller execution
- middleware
- validation
- UI

---

# Architecture

```text
OpenAPI Operation

├── Method
├── Metadata
├── Parameters
├── Request Body
├── Responses
├── Security
├── Callbacks
└── Extensions
```

---

# Public API

```ts
interface OpenAPIOperation {
  readonly operationId: string;

  readonly method: OpenAPIOperationMethod;

  readonly metadata: OpenAPIOperationMetadata;
}
```

---

# Supported Operation Services

Operations

- GET
- POST
- PUT
- PATCH
- DELETE
- HEAD
- OPTIONS
- TRACE

Metadata

- Summary
- Description
- Deprecated
- Tags

Future

- Operation Groups
- Operation Profiles
- Batch Operations
- Async Operations

---

# Dependency

Depends On

- TASK-005 — OpenAPI Path

---

# Risk

Critical

OpenAPIOperation becomes the standardized API action abstraction across the Atlas API ecosystem.

---

# Files Allowed

```text
packages/atlas-openapi/**
```

---

# Files Forbidden

```text
None
```

---

# Acceptance Criteria

- [x] OpenAPIOperation implemented.
- [x] Supports HTTP methods.
- [x] Supports operation metadata.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable OpenAPI operation abstractions capable of representing executable API actions independently from routing frameworks, HTTP servers, and documentation tooling.

---

# AI Constraints

Before implementation

- Do not implement routing.
- Do not implement controllers.
- Do not implement middleware.
- Do not implement validation.
- Focus only on OpenAPIOperation abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-005-openapi-path.md
- OpenAPI Specification 3.1

---

# Next Task

TASK-007-openapi-parameter.md
