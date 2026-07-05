---
id: TASK-002

title: Implement OpenAPI Version

status: Completed

priority: Critical

story_points: 8

sprint: SPRINT-003-api

epic: EPIC-024

package: atlas-openapi

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-05
---

# TASK-002 — Implement OpenAPI Version

## Summary

Implement `OpenAPIVersion`.

OpenAPIVersion provides the provider-independent abstraction responsible for representing the OpenAPI Specification version supported by Atlas.

The version abstraction standardizes specification compatibility, feature negotiation, and capability detection while remaining independent from serialization formats, documentation generators, and API tooling.

---

# Capability

After this task is complete, Atlas API supports standardized OpenAPI specification version abstractions.

---

# Goal

Provide unified OpenAPI version abstraction.

---

# Business Value

Supports

- OpenAPI version compatibility
- Feature negotiation
- Specification validation
- Future specification evolution
- Provider independence

without coupling Atlas to a specific OpenAPI implementation.

---

# Background

Different OpenAPI versions provide different capabilities.

Atlas should represent specification versions through a unified abstraction instead of hardcoding version-specific behavior throughout the framework.

---

# Scope

## Included

- Version abstraction
- Version metadata
- Feature capabilities
- Compatibility abstraction

## Excluded

- Version validation
- Serialization
- Code generation
- Documentation rendering
- UI

---

# Deliverables

```text
packages/atlas-openapi/

OpenAPIVersion.ts

OpenAPIVersionMetadata.ts

OpenAPIVersionCapability.ts

OpenAPIVersionCompatibility.ts

index.ts
```

---

# Responsibilities

OpenAPIVersion is responsible for

- representing specification versions
- exposing version metadata
- exposing supported capabilities
- managing compatibility information
- remaining provider independent

OpenAPIVersion is NOT responsible for

- validating specifications
- serialization
- documentation rendering
- code generation
- UI

---

# Architecture

```text
OpenAPI Version

├── Metadata
├── Compatibility
├── Capability
└── Feature Set
```

---

# Public API

```ts
interface OpenAPIVersion {
  readonly version: string;

  readonly metadata: OpenAPIVersionMetadata;

  readonly compatibility: OpenAPIVersionCompatibility;

  readonly capabilities: readonly OpenAPIVersionCapability[];
}
```

---

# Supported Version Services

Version

- Version Identifier
- Metadata
- Compatibility

Capabilities

- Feature Detection
- Capability Discovery

Future

- OpenAPI 3.0
- OpenAPI 3.1
- OpenAPI 4.x
- Custom Specification Versions

---

# Dependency

Depends On

- TASK-001 — OpenAPI Document

---

# Risk

Low

OpenAPIVersion becomes the standardized abstraction for OpenAPI specification compatibility across the Atlas API ecosystem.

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

- [x] OpenAPIVersion implemented.
- [x] Supports specification compatibility.
- [x] Supports capability discovery.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable OpenAPI version abstractions capable of representing specification compatibility independently from tooling and serialization implementations.

---

# AI Constraints

Before implementation

- Do not implement specification validation.
- Do not implement serialization.
- Do not implement Swagger tooling.
- Do not implement documentation rendering.
- Focus only on OpenAPIVersion abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-001-openapi-document.md
- OpenAPI Specification 3.1

---

# Next Task

TASK-003-openapi-info.md
