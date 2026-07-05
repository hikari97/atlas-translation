---
id: TASK-003

title: Implement OpenAPI Info

status: Ready

priority: Critical

story_points: 13

sprint: SPRINT-003-api

epic: EPIC-024

package: atlas-openapi

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-003 — Implement OpenAPI Info

## Summary

Implement `OpenAPIInfo`.

OpenAPIInfo provides the provider-independent abstraction responsible for representing API identity and descriptive metadata within an OpenAPI specification.

The information object standardizes API metadata including title, description, version, contact information, licensing, and specification extensions while remaining independent from serialization formats, documentation generators, and API vendors.

---

# Capability

After this task is complete, Atlas API supports standardized API metadata abstractions.

---

# Goal

Provide unified OpenAPI information abstraction.

---

# Business Value

Supports

- API identity
- API documentation
- API discovery
- API ownership
- Documentation tooling
- Provider independence

without coupling Atlas to documentation generators.

---

# Background

Every OpenAPI document contains a single Info object.

The Info object describes the API itself rather than its implementation.

It acts as the primary identity of the specification and is consumed by documentation tools, SDK generators, API catalogs, and developer portals.

---

# Scope

## Included

- API information abstraction
- Contact information
- License information
- Version metadata
- Specification extensions

## Excluded

- Documentation rendering
- Validation
- Serialization
- Code generation
- UI

---

# Deliverables

```text
atlas-openapi/

OpenAPIInfo.ts

OpenAPIContact.ts

OpenAPILicense.ts

OpenAPIInfoMetadata.ts

OpenAPIInfoExtension.ts

index.ts
```

---

# Responsibilities

OpenAPIInfo is responsible for

- representing API identity
- exposing API metadata
- exposing contact information
- exposing license information
- remaining provider independent

OpenAPIInfo is NOT responsible for

- rendering documentation
- serialization
- validation
- code generation
- UI

---

# Architecture

```text
OpenAPI Info

├── Title
├── Summary
├── Description
├── Version
├── Contact
├── License
└── Extensions
```

---

# Public API

```ts
interface OpenAPIInfo {
  readonly title: string;

  readonly summary?: string;

  readonly description?: string;

  readonly version: string;

  readonly contact?: OpenAPIContact;

  readonly license?: OpenAPILicense;
}
```

---

# Supported Information Services

Identity

- API Title
- API Summary
- API Description
- API Version

Ownership

- Contact
- License

Metadata

- Extensions
- Vendor Extensions

Future

- Localization
- Documentation Branding
- Documentation Themes
- Multi-language Metadata

---

# Dependency

Depends On

- TASK-001 — OpenAPI Document
- TASK-002 — OpenAPI Version

---

# Risk

Low

OpenAPIInfo becomes the standardized API identity abstraction across the Atlas API ecosystem.

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

- [ ] OpenAPIInfo implemented.
- [ ] Supports API identity.
- [ ] Supports contact metadata.
- [ ] Supports licensing metadata.
- [ ] Provider independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable API information abstractions capable of representing API identity independently from documentation tooling and serialization formats.

---

# AI Constraints

Before implementation

- Do not implement rendering.
- Do not implement serialization.
- Do not implement validation.
- Do not implement code generation.
- Focus only on OpenAPIInfo abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-001-openapi-document.md
- TASK-002-openapi-version.md
- OpenAPI Specification 3.1

---

# Next Task

TASK-004-openapi-server.md
