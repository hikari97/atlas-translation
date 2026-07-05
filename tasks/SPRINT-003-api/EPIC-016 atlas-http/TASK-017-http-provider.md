---
id: TASK-017

title: Implement HTTP Provider

status: Completed

priority: Critical

story_points: 34

sprint: SPRINT-003-api

epic: EPIC-016

package: atlas-http

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-017 — Implement HTTP Provider

## Summary

Implement `HttpProvider`.

HttpProvider provides the provider-independent abstraction responsible for integrating Atlas HTTP with runtime-specific HTTP implementations.

The provider abstraction adapts Atlas HTTP contracts to concrete runtimes while remaining isolated from HTTP components, ensuring that the Atlas public API remains stable regardless of the underlying platform.

---

# Capability

After this task is complete, Atlas supports pluggable HTTP runtime providers without modifying the HTTP abstraction layer.

---

# Goal

Provide unified HTTP provider abstraction.

---

# Business Value

Supports

- Runtime independence
- Provider extensibility
- Platform portability
- Testability
- Future runtime integrations

without coupling Atlas HTTP to any specific runtime implementation.

---

# Background

Atlas HTTP defines protocol abstractions.

Runtime implementations are provided separately through HttpProvider.

Providers translate runtime-specific behavior into Atlas abstractions.

---

# Scope

## Included

- Provider abstraction
- Provider registry
- Provider metadata
- Provider lifecycle
- Provider capabilities

## Excluded

- Runtime implementation
- Node.js integration
- Bun integration
- Deno integration
- Cloudflare integration
- Networking
- UI

---

# Deliverables

```text
atlas-http/

HttpProvider.ts

HttpProviderRegistry.ts

HttpProviderCapabilities.ts

HttpProviderMetadata.ts

HttpProviderLifecycle.ts

index.ts
```

---

# Responsibilities

HttpProvider is responsible for

- exposing provider contracts
- exposing provider metadata
- exposing provider capabilities
- managing provider lifecycle
- remaining runtime independent

HttpProvider is NOT responsible for

- networking
- routing
- middleware
- request parsing
- response generation
- runtime implementation
- UI

---

# Architecture

```text
                Atlas HTTP

                    │

             Http Provider

                    │

     ┌──────────────┼───────────────┐
     ▼              ▼               ▼

 Node Provider   Bun Provider   Deno Provider

     ▼              ▼               ▼

 Runtime APIs   Runtime APIs   Runtime APIs
```

---

# Public API

```ts
interface HttpProvider {
  readonly metadata: HttpProviderMetadata;

  readonly lifecycle: HttpProviderLifecycle;

  readonly capabilities: HttpProviderCapabilities;
}
```

---

# Supported Provider Services

Provider

- Initialize
- Shutdown
- Health Check

Registry

- Register
- Lookup
- Replace
- Remove

Future

- Node.js Provider
- Bun Provider
- Deno Provider
- Cloudflare Provider
- AWS Lambda Provider
- Azure Functions Provider
- Mock Provider
- Test Provider

---

# Dependency

Depends On

- TASK-001 — HTTP Core
- TASK-010 — HTTP Server
- TASK-011 — HTTP Client
- TASK-016 — HTTP Lifecycle

---

# Risk

Critical

HttpProvider becomes the standardized runtime integration abstraction across the Atlas HTTP ecosystem.

---

# Files Allowed

```text
atlas-http/**
```

---

# Files Forbidden

```text
None
```

---

# Acceptance Criteria

- [x] HttpProvider implemented.
- [x] Supports provider lifecycle.
- [x] Supports provider registry.
- [x] Supports provider capabilities.
- [x] Runtime independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable HTTP provider abstractions capable of integrating with multiple runtime environments while preserving a stable provider-independent public API.

---

# AI Constraints

Before implementation

- Do not implement Node.js Provider.
- Do not implement Bun Provider.
- Do not implement Deno Provider.
- Do not implement Cloudflare Provider.
- Do not implement AWS Lambda Provider.
- Do not implement Azure Functions Provider.
- Do not implement networking.
- Focus only on HttpProvider abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-001-http-core.md
- TASK-010-http-server.md
- TASK-011-http-client.md
- TASK-016-http-lifecycle.md

---

# Next Task

END OF EPIC-016
