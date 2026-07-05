# Atlas OpenAPI Architecture

## Overview

Atlas OpenAPI provides the provider-independent architecture for describing HTTP APIs within the Atlas ecosystem.

Rather than exposing the OpenAPI Specification directly, Atlas models OpenAPI concepts as reusable domain abstractions that can be composed, validated, generated, and integrated with external tooling.

The package intentionally separates domain modeling from specification generation, serialization, documentation rendering, and vendor-specific integrations.

---

# Design Principles

Atlas OpenAPI follows the architectural principles shared across the Atlas framework.

## Domain First

Atlas represents API specifications as domain models.

The OpenAPI specification is generated from these models rather than being manipulated directly.

---

## Provider Independent

Atlas OpenAPI never depends directly on:

- Swagger
- Redoc
- Scalar
- Stoplight
- Postman
- Insomnia

External tooling is integrated through adapters.

---

## Separation of Concerns

Each abstraction owns exactly one responsibility.

Examples

- Document represents the specification.
- Schema represents API data models.
- Components manage reusable definitions.
- Builder assembles documents.
- Generator produces specification artifacts.
- Tool Adapter integrates external tooling.

---

## Composable

OpenAPI documents are built from reusable components.

Every abstraction can evolve independently.

---

## Extensible

New OpenAPI versions and external tools can be supported without modifying the core architecture.

---

# Architecture

```text
                    Atlas API

                        │

                        ▼

               OpenAPI Document

                        │

        ┌───────────────┼────────────────┐

        ▼               ▼                ▼

      Info           Servers        Components

                        │

                        ▼

                    Resources

                        │

                        ▼

                     Operations

        ┌───────────┬────────────┬────────────┐

        ▼           ▼            ▼            ▼

 Parameters   Request Body   Responses   Security

        │

        ▼

      Schema

        │

        ▼

Specification Validator

        │

        ▼

Document Builder

        │

        ▼

Specification Generator

        │

        ▼

Tool Adapter

        │

 ┌──────┼──────────┬──────────┬──────────┐

 ▼      ▼          ▼          ▼

Swagger Redoc   Scalar   Custom Tool
```

---

# Architectural Layers

## Domain Layer

Defines reusable OpenAPI domain models.

Components

- OpenAPIDocument
- OpenAPIInfo
- OpenAPIServer
- OpenAPIPath
- OpenAPIOperation

---

## Contract Layer

Defines reusable API contracts.

Components

- OpenAPIParameter
- OpenAPIRequestBody
- OpenAPIResponse
- OpenAPISchema

---

## Registry Layer

Defines reusable specification registries.

Components

- OpenAPIComponents
- OpenAPIExample
- OpenAPITag

---

## Validation Layer

Ensures specification correctness.

Components

- OpenAPISpecificationValidator

---

## Composition Layer

Builds complete OpenAPI specifications.

Components

- OpenAPIDocumentBuilder

---

## Generation Layer

Transforms domain models into specification artifacts.

Components

- OpenAPISpecificationGenerator

---

## Integration Layer

Connects Atlas OpenAPI to external tooling.

Components

- OpenAPIToolAdapter

---

# Domain Model

```text
OpenAPIDocument

├── Info

├── Servers

├── Paths

│     └── Operations

│            ├── Parameters

│            ├── Request Body

│            ├── Responses

│            ├── Security

│            └── Tags

├── Components

├── Examples

└── Extensions
```

---

# Component Relationships

```text
OpenAPIDocument

        │

        ▼

OpenAPIPath

        │

        ▼

OpenAPIOperation

        │

        ├── Parameter

        ├── RequestBody

        ├── Response

        ├── Security

        └── Tag

                │

                ▼

           OpenAPISchema
```

---

# Build Flow

```text
Atlas Packages

├── Router

├── Controller

├── Validation

├── Authentication

└── Middleware

        │

        ▼

OpenAPIDocumentBuilder

        │

        ▼

OpenAPIDocument

        │

        ▼

Specification Generator

        │

        ▼

OpenAPI Specification

        │

        ▼

Tool Adapter
```

---

# Dependency Graph

```text
OpenAPIDocument

↓

Info

↓

Server

↓

Path

↓

Operation

↓

Parameter
RequestBody
Response
Security
Tag
Example

↓

Schema

↓

Components

↓

Validator

↓

Builder

↓

Generator

↓

Tool Adapter
```

---

# Integration Points

Atlas OpenAPI integrates with:

## atlas-router

Provides route metadata.

---

## atlas-controller

Provides operation metadata.

---

## atlas-validation

Provides reusable validation models.

---

## atlas-authentication

Provides security definitions.

---

## atlas-http

Provides HTTP method abstractions.

---

## atlas-request

Provides request metadata.

---

## atlas-response

Provides response metadata.

---

# Extension Points

Future extensions include:

- AsyncAPI
- OpenAPI 4.x
- GraphQL
- gRPC
- JSON Schema 2020-12
- Multi-document Specifications

---

# Future Tool Adapters

Future adapters may include:

- Swagger UI
- Redoc
- Scalar
- Stoplight
- Postman
- Insomnia
- Custom Documentation Platforms

---

# Design Decisions

Atlas OpenAPI intentionally separates:

- Domain Models from Specifications
- Builder from Generator
- Generator from Tool Adapter
- Specification Validation from Runtime Validation
- Components from Runtime Objects
- Schema from Serialization

Each abstraction owns a single responsibility.

---

# Non Goals

Atlas OpenAPI does not implement:

- HTTP servers
- Routing
- Request handling
- Response writing
- JSON serialization
- YAML serialization
- Documentation rendering
- SDK generation
- API gateways

These concerns belong to other packages or adapters.

---

# References

- README.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
