---
id: TASK-005

title: Implement OpenAPI Path

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

# TASK-005 — Implement OpenAPI Path

## Summary

Implement `OpenAPIPath`.

OpenAPIPath provides the provider-independent abstraction responsible for representing API resource paths within an OpenAPI specification.

The path abstraction standardizes API resources, operations, parameters, metadata, and extensions while remaining independent from HTTP frameworks, routing implementations, documentation generators, and API gateways.

---

# Capability

After this task is complete, Atlas API supports standardized API resource path abstractions.

---

# Goal

Provide unified OpenAPI path abstraction.

---

# Business Value

Supports

- API resources
- REST endpoint definitions
- Route documentation
- Code generation
- API discovery
- Provider independence

without coupling Atlas to routing implementations.

---

# Background

OpenAPI organizes APIs around resource paths.

Each path represents a logical API resource that exposes one or more operations.

Atlas treats a path as a first-class resource abstraction rather than simply a URL string.

---

# Scope

## Included

- Path abstraction
- Resource metadata
- Path parameters
- Operations
- Specification extensions

## Excluded

- Route matching
- HTTP routing
- Request handling
- Validation
- UI

---

# Deliverables

```text
packages/atlas-openapi/

OpenAPIPath.ts

OpenAPIPathMetadata.ts

OpenAPIPathParameter.ts

OpenAPIPathExtension.ts

OpenAPIPathLifecycle.ts

index.ts
```

---

# Responsibilities

OpenAPIPath is responsible for

- representing API resources
- exposing resource operations
- exposing path parameters
- exposing metadata
- remaining provider independent

OpenAPIPath is NOT responsible for

- HTTP routing
- request handling
- middleware execution
- validation
- UI

---

# Architecture

```text
OpenAPI Path

├── Resource
├── Operations
├── Parameters
├── Metadata
├── Extensions
└── Lifecycle
```

---

# Public API

```ts
interface OpenAPIPath {
  readonly path: string;

  readonly operations: readonly OpenAPIOperation[];

  readonly parameters: readonly OpenAPIParameter[];

  readonly metadata: OpenAPIPathMetadata;
}
```

---

# Supported Path Services

Resources

- Resource Path
- Resource Metadata
- Resource Extensions

Operations

- GET
- POST
- PUT
- PATCH
- DELETE
- HEAD
- OPTIONS
- TRACE

Future

- Nested Resources
- Resource Groups
- Versioned Resources
- Dynamic Resources

---

# Dependency

Depends On

- TASK-001 — OpenAPI Document
- TASK-004 — OpenAPI Server

---

# Risk

Critical

OpenAPIPath becomes the standardized API resource abstraction across the Atlas API ecosystem.

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

- [x] OpenAPIPath implemented.
- [x] Supports multiple operations.
- [x] Supports path parameters.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable OpenAPI path abstractions capable of representing API resources independently from routing frameworks, API gateways, and documentation generators.

---

# AI Constraints

Before implementation

- Do not implement HTTP routing.
- Do not implement request handling.
- Do not implement middleware.
- Do not implement validation.
- Focus only on OpenAPIPath abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-001-openapi-document.md
- TASK-004-openapi-server.md
- OpenAPI Specification 3.1

---

# Next Task

TASK-006-openapi-operation.md
