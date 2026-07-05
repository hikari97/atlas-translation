---
id: TASK-016

title: Implement OpenAPI Document Builder

status: Ready

priority: High

story_points: 21

sprint: SPRINT-003-api

epic: EPIC-024

package: atlas-openapi

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-016 — Implement OpenAPI Document Builder

## Summary

Implement `OpenAPIDocumentBuilder`.

OpenAPIDocumentBuilder provides the provider-independent abstraction responsible for constructing complete OpenAPI documents through a fluent, composable, and extensible builder API.

The builder coordinates document assembly from multiple sources while remaining independent from serialization formats, HTTP frameworks, documentation generators, and API vendors.

---

# Capability

After this task is complete, Atlas API supports standardized OpenAPI document construction.

---

# Goal

Provide unified OpenAPI document builder abstraction.

---

# Business Value

Supports

- Fluent API construction
- Automatic document assembly
- Plugin contributions
- Incremental document building
- Provider independence

without coupling Atlas to any OpenAPI implementation.

---

# Background

An OpenAPI document is composed of many independent parts:

- Info
- Servers
- Paths
- Components
- Security
- Tags

Rather than manually constructing the entire document, Atlas provides a builder abstraction capable of assembling specifications from multiple packages.

---

# Scope

## Included

- Builder abstraction
- Fluent API
- Builder lifecycle
- Builder metadata
- Extension points

## Excluded

- Serialization
- Code generation
- Validation
- Documentation rendering
- UI

---

# Deliverables

```text
atlas-openapi/

OpenAPIDocumentBuilder.ts

OpenAPIDocumentBuilderContext.ts

OpenAPIDocumentBuilderMetadata.ts

OpenAPIDocumentBuilderLifecycle.ts

OpenAPIDocumentBuilderExtension.ts

index.ts
```

---

# Responsibilities

OpenAPIDocumentBuilder is responsible for

- assembling OpenAPI documents
- coordinating document construction
- exposing builder lifecycle
- exposing extension points
- remaining provider independent

OpenAPIDocumentBuilder is NOT responsible for

- serialization
- validation
- rendering
- code generation
- UI

---

# Architecture

```text
OpenAPI Document Builder

├── Builder Context
├── Builder Lifecycle
├── Builder Extensions
├── Builder Metadata
└── Fluent API
```

---

# Public API

```ts
interface OpenAPIDocumentBuilder {
  info(info: OpenAPIInfo): this;

  server(server: OpenAPIServer): this;

  path(path: OpenAPIPath): this;

  component(component: OpenAPIComponents): this;

  build(): OpenAPIDocument;
}
```

---

# Supported Builder Services

Builder

- Build Document
- Merge Documents
- Register Extensions
- Reset Builder

Composition

- Info
- Servers
- Paths
- Components
- Security
- Tags

Future

- Incremental Builder
- Plugin Builder
- Distributed Builder
- Async Builder

---

# Dependency

Depends On

- TASK-001 — OpenAPI Document
- TASK-003 — OpenAPI Info
- TASK-004 — OpenAPI Server
- TASK-005 — OpenAPI Path
- TASK-011 — OpenAPI Components

---

# Risk

Medium

OpenAPIDocumentBuilder becomes the standardized document construction abstraction across the Atlas API ecosystem.

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

- [ ] OpenAPIDocumentBuilder implemented.
- [ ] Supports fluent document construction.
- [ ] Supports builder extensions.
- [ ] Provider independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable document builder abstractions capable of assembling complete OpenAPI specifications independently from serialization libraries, documentation generators, and code generation tools.

---

# AI Constraints

Before implementation

- Do not implement serialization.
- Do not implement documentation rendering.
- Do not implement code generation.
- Do not implement validation.
- Focus only on OpenAPIDocumentBuilder abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-001-openapi-document.md
- TASK-011-openapi-components.md
- OpenAPI Specification 3.1

---

# Next Task

TASK-017-openapi-specification-generator.md
