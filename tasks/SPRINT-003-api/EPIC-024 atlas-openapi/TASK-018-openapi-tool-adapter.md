---
id: TASK-018

title: Implement OpenAPI Tool Adapter

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

# TASK-018 — Implement OpenAPI Tool Adapter

## Summary

Implement `OpenAPIToolAdapter`.

OpenAPIToolAdapter provides the provider-independent abstraction responsible for integrating Atlas OpenAPI specifications with external OpenAPI tooling.

The adapter standardizes communication between Atlas OpenAPI domain models and external documentation platforms, SDK generators, API testing tools, gateways, and development tooling while remaining independent from any single vendor.

---

# Capability

After this task is complete, Atlas API supports standardized OpenAPI tool integrations.

---

# Goal

Provide unified OpenAPI tool adapter abstraction.

---

# Business Value

Supports

- Documentation platforms
- SDK generators
- Client generators
- API testing
- API gateways
- Provider independence

without coupling Atlas to third-party tooling.

---

# Background

Atlas internally models OpenAPI using provider-independent abstractions.

External tools expect their own formats, APIs, or configuration.

OpenAPIToolAdapter bridges these two worlds while keeping Atlas isolated from implementation details.

---

# Scope

## Included

- Tool adapter abstraction
- Adapter lifecycle
- Adapter capabilities
- Adapter metadata
- Adapter registry

## Excluded

- Swagger implementation
- Redoc implementation
- Scalar implementation
- Postman implementation
- SDK generation
- UI

---

# Deliverables

```text
atlas-openapi/

OpenAPIToolAdapter.ts

OpenAPIToolAdapterRegistry.ts

OpenAPIToolAdapterMetadata.ts

OpenAPIToolAdapterCapabilities.ts

OpenAPIToolAdapterLifecycle.ts

index.ts
```

---

# Responsibilities

OpenAPIToolAdapter is responsible for

- adapting Atlas OpenAPI models
- exposing adapter capabilities
- managing adapter lifecycle
- registering adapters
- remaining provider independent

OpenAPIToolAdapter is NOT responsible for

- rendering documentation
- generating SDKs
- communicating with remote services
- serialization
- UI

---

# Architecture

```text
Atlas OpenAPI

        │

        ▼

OpenAPI Tool Adapter

        │

 ┌──────┼─────────┬─────────┬──────────┬──────────┐

 ▼      ▼         ▼         ▼          ▼

Swagger Redoc   Scalar   Postman   Custom Tool
```

---

# Public API

```ts
interface OpenAPIToolAdapter {
  readonly metadata: OpenAPIToolAdapterMetadata;

  readonly capabilities: OpenAPIToolAdapterCapabilities;

  initialize(): Promise<void>;

  shutdown(): Promise<void>;
}
```

---

# Supported Adapter Services

Adapter

- Registration
- Discovery
- Initialization
- Shutdown

Capabilities

- Documentation
- SDK Generation
- Client Generation
- Mock Server
- API Testing

Future

- Swagger UI
- Redoc
- Scalar
- Stoplight
- Postman
- Insomnia
- Custom Tool

---

# Dependency

Depends On

- TASK-016 — OpenAPI Document Builder
- TASK-017 — OpenAPI Specification Generator

---

# Risk

Medium

OpenAPIToolAdapter becomes the standardized integration point between Atlas OpenAPI and external tooling.

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

- [ ] OpenAPIToolAdapter implemented.
- [ ] Supports adapter registration.
- [ ] Supports lifecycle management.
- [ ] Supports capability discovery.
- [ ] Provider independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable adapter abstractions capable of integrating OpenAPI domain models with external tooling independently from vendor-specific implementations.

---

# AI Constraints

Before implementation

- Do not implement Swagger.
- Do not implement Redoc.
- Do not implement Scalar.
- Do not implement Postman.
- Do not implement SDK generation.
- Focus only on OpenAPIToolAdapter abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-016-openapi-document-builder.md
- TASK-017-openapi-specification-generator.md
- OpenAPI Specification 3.1

---

# Next Task

END OF EPIC-024
