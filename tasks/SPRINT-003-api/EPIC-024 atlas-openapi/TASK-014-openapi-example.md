---
id: TASK-014

title: Implement OpenAPI Example

status: Ready

priority: Medium

story_points: 13

sprint: SPRINT-003-api

epic: EPIC-024

package: atlas-openapi

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-014 — Implement OpenAPI Example

## Summary

Implement `OpenAPIExample`.

OpenAPIExample provides the provider-independent abstraction responsible for representing reusable API examples throughout an OpenAPI specification.

The example abstraction standardizes request examples, response examples, parameter examples, media type examples, metadata, and specification extensions while remaining independent from documentation generators, testing frameworks, mock servers, and API vendors.

---

# Capability

After this task is complete, Atlas API supports standardized reusable API example abstractions.

---

# Goal

Provide unified OpenAPI example abstraction.

---

# Business Value

Supports

- Documentation examples
- SDK generation
- Client examples
- Mock servers
- API testing
- Provider independence

without coupling Atlas to documentation tooling or testing frameworks.

---

# Background

Examples improve API usability by demonstrating valid request and response payloads.

Examples may be attached to parameters, request bodies, responses, headers, or reusable components.

Atlas models examples as reusable resources that can be referenced across the specification.

---

# Scope

## Included

- Example abstraction
- Example metadata
- Example registry
- External examples
- Specification extensions

## Excluded

- Mock server implementation
- Test execution
- Serialization
- Documentation rendering
- UI

---

# Deliverables

```text
atlas-openapi/

OpenAPIExample.ts

OpenAPIExampleMetadata.ts

OpenAPIExampleRegistry.ts

OpenAPIExternalExample.ts

OpenAPIExampleExtension.ts

index.ts
```

---

# Responsibilities

OpenAPIExample is responsible for

- representing reusable API examples
- exposing example metadata
- exposing reusable references
- exposing external examples
- remaining provider independent

OpenAPIExample is NOT responsible for

- mock server execution
- API testing
- serialization
- documentation rendering
- UI

---

# Architecture

```text
OpenAPI Example

├── Name
├── Summary
├── Description
├── Value
├── External Value
├── Metadata
└── Extensions
```

---

# Public API

```ts
interface OpenAPIExample {
  readonly name: string;

  readonly summary?: string;

  readonly description?: string;

  readonly value?: unknown;

  readonly externalValue?: string;
}
```

---

# Supported Example Services

Examples

- Request Example
- Response Example
- Parameter Example
- Header Example
- Schema Example

Registry

- Register
- Lookup
- Replace
- Remove

Future

- Example Collections
- Example Templates
- Generated Examples
- AI-generated Examples

---

# Dependency

Depends On

- TASK-010 — OpenAPI Schema
- TASK-011 — OpenAPI Components

---

# Risk

Low

OpenAPIExample becomes the standardized reusable example abstraction across the Atlas API ecosystem.

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

- [ ] OpenAPIExample implemented.
- [ ] Supports reusable examples.
- [ ] Supports external examples.
- [ ] Provider independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable example abstractions capable of representing API examples independently from documentation generators, mock servers, testing frameworks, and serialization implementations.

---

# AI Constraints

Before implementation

- Do not implement mock servers.
- Do not implement API testing.
- Do not implement serialization.
- Do not implement documentation rendering.
- Focus only on OpenAPIExample abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-010-openapi-schema.md
- TASK-011-openapi-components.md
- OpenAPI Specification 3.1

---

# Next Task

TASK-015-openapi-specification-validator.md
