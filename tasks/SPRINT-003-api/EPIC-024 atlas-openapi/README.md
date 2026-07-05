# EPIC-024 — Atlas OpenAPI

## Overview

Atlas OpenAPI provides the provider-independent OpenAPI abstraction layer for the Atlas API ecosystem.

The package defines reusable domain models for describing HTTP APIs using the OpenAPI Specification while remaining independent from documentation platforms, serialization formats, SDK generators, API gateways, and third-party tooling.

Rather than exposing the OpenAPI specification directly, Atlas models OpenAPI as composable domain abstractions that can later be transformed into specification artifacts through generators and adapters.

---

# Goals

Atlas OpenAPI aims to provide:

- Provider-independent OpenAPI abstractions
- API contract modeling
- Reusable schema definitions
- Specification validation
- Specification generation
- Tool integration through adapters
- Extensible API documentation architecture

---

# Design Principles

Atlas OpenAPI follows the core architectural principles of the Atlas framework.

## Provider Independent

Atlas OpenAPI never depends directly on a specific documentation platform or OpenAPI tooling.

Examples include:

- Swagger UI
- Redoc
- Scalar
- Stoplight
- Postman
- Insomnia

External tools are integrated through adapters.

---

## Domain First

Atlas models API contracts as reusable domain objects before generating OpenAPI specifications.

Examples

- OpenAPIDocument
- OpenAPIPath
- OpenAPIOperation
- OpenAPISchema

---

## Modular

Each OpenAPI concept owns a dedicated abstraction.

Examples

- Schema
- Components
- Security
- Example
- Builder
- Generator

---

## Extensible

The architecture allows future OpenAPI versions and tooling integrations without modifying existing abstractions.

---

## Open for Extension

External documentation platforms and generators integrate through adapters.

---

# Features

Atlas OpenAPI provides:

- OpenAPI Document
- OpenAPI Version
- OpenAPI Info
- OpenAPI Server
- OpenAPI Path
- OpenAPI Operation
- OpenAPI Parameter
- OpenAPI Request Body
- OpenAPI Response
- OpenAPI Schema
- OpenAPI Components
- OpenAPI Security
- OpenAPI Tag
- OpenAPI Example
- OpenAPI Specification Validator
- OpenAPI Document Builder
- OpenAPI Specification Generator
- OpenAPI Tool Adapter

---

# Package Structure

```text
atlas-openapi/

README.md
ARCHITECTURE.md
IMPLEMENTATION_PLAN.md
TASK_INDEX.md

TASK-001
...
TASK-018
```

---

# Dependencies

Atlas OpenAPI depends on:

- atlas-types
- atlas-document
- atlas-http
- atlas-router
- atlas-request
- atlas-response
- atlas-controller
- atlas-validation
- atlas-authentication

---

# Architecture Overview

```text
OpenAPIDocument
        │
        ▼
OpenAPIInfo
        │
        ▼
OpenAPIServer
        │
        ▼
OpenAPIPath
        │
        ▼
OpenAPIOperation
        │
        ├── Parameter
        ├── Request Body
        ├── Response
        ├── Security
        ├── Tag
        └── Example
                │
                ▼
        OpenAPISchema
                │
                ▼
        OpenAPIComponents
                │
                ▼
OpenAPISpecificationValidator
                │
                ▼
OpenAPIDocumentBuilder
                │
                ▼
OpenAPISpecificationGenerator
                │
                ▼
OpenAPIToolAdapter
```

---

# Roadmap

This Epic consists of eighteen implementation tasks.

See:

- TASK_INDEX.md

---

# Future Extensions

Future integrations may include:

- OpenAPI 4.x
- AsyncAPI
- GraphQL Introspection
- gRPC Reflection
- JSON Schema 2020-12
- Custom Specification Providers

---

# Status

Current Status

Ready

Implementation Progress

0%

---

# License

See project root license.
