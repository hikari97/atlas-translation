---
id: TASK-010

title: Implement OpenAPI Schema

status: Ready

priority: Critical

story_points: 34

sprint: SPRINT-003-api

epic: EPIC-024

package: atlas-openapi

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-010 — Implement OpenAPI Schema

## Summary

Implement `OpenAPISchema`.

OpenAPISchema provides the provider-independent abstraction responsible for representing reusable API data models within an OpenAPI specification.

The schema abstraction standardizes primitive types, complex object models, arrays, references, constraints, composition, and specification extensions while remaining independent from JSON Schema implementations, serialization libraries, validation frameworks, documentation generators, and API vendors.

---

# Capability

After this task is complete, Atlas API supports standardized reusable schema abstractions.

---

# Goal

Provide unified OpenAPI schema abstraction.

---

# Business Value

Supports

- Request models
- Response models
- Parameter models
- Code generation
- SDK generation
- Validation integration
- Provider independence

without coupling Atlas to JSON Schema implementations.

---

# Background

Schemas describe the structure of API data.

Every parameter, request body, response body, and reusable component ultimately references one or more schemas.

Atlas models schemas as reusable domain data models instead of serialization-specific definitions.

---

# Scope

## Included

- Schema abstraction
- Primitive schemas
- Object schemas
- Array schemas
- Reference schemas
- Composition
- Metadata
- Extensions

## Excluded

- Runtime validation
- Serialization
- Object mapping
- Documentation rendering
- UI

---

# Deliverables

```text
atlas-openapi/

OpenAPISchema.ts

OpenAPISchemaType.ts

OpenAPISchemaReference.ts

OpenAPISchemaComposition.ts

OpenAPISchemaMetadata.ts

OpenAPISchemaExtension.ts

index.ts
```

---

# Responsibilities

OpenAPISchema is responsible for

- representing reusable API models
- exposing schema composition
- exposing schema metadata
- exposing schema references
- remaining provider independent

OpenAPISchema is NOT responsible for

- validation
- serialization
- object mapping
- rendering
- UI

---

# Architecture

```text
OpenAPI Schema

├── Primitive Types
├── Object Types
├── Array Types
├── Reference
├── Composition
├── Constraints
├── Metadata
└── Extensions
```

---

# Public API

```ts
interface OpenAPISchema {
  readonly name?: string;

  readonly type: OpenAPISchemaType;

  readonly metadata: OpenAPISchemaMetadata;

  readonly reference?: OpenAPISchemaReference;
}
```

---

# Supported Schema Services

Schema Types

- String
- Number
- Integer
- Boolean
- Object
- Array
- Null

Composition

- allOf
- oneOf
- anyOf
- not

Reference

- Local Reference
- External Reference

Constraints

- Required
- Nullable
- Read Only
- Write Only
- Enum
- Default

Future

- Generic Schema
- Union Types
- Intersection Types
- Recursive Schema
- Custom Types

---

# Dependency

Depends On

- TASK-007 — OpenAPI Parameter
- TASK-008 — OpenAPI Request Body
- TASK-009 — OpenAPI Response

---

# Risk

Critical

OpenAPISchema becomes the standardized reusable data model abstraction across the Atlas API ecosystem.

---

# Files Allowed

```text
atlas-openapi/**
```

---

# Files Forbidden

```text
None
```

---

# Acceptance Criteria

- [ ] OpenAPISchema implemented.
- [ ] Supports primitive and complex schemas.
- [ ] Supports schema composition.
- [ ] Supports reusable references.
- [ ] Provider independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable schema abstractions capable of representing API data models independently from JSON Schema implementations, validation engines, serialization frameworks, and documentation tooling.

---

# AI Constraints

Before implementation

- Do not implement JSON Schema validation.
- Do not implement serialization.
- Do not implement object mapping.
- Do not implement rendering.
- Focus only on OpenAPISchema abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-007-openapi-parameter.md
- TASK-008-openapi-request-body.md
- TASK-009-openapi-response.md
- OpenAPI Specification 3.1

---

# Next Task

TASK-011-openapi-components.md
