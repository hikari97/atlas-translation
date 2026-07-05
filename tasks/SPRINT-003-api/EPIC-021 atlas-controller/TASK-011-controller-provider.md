---
id: TASK-011

title: Implement Controller Provider

status: Completed

priority: Critical

story_points: 21

sprint: SPRINT-003-api

epic: EPIC-021

package: atlas-controller

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-011 — Implement Controller Provider

## Summary

Implement `ControllerProvider`.

ControllerProvider provides the provider-independent abstraction responsible for integrating Atlas controllers with runtime-specific execution environments.

Rather than executing controllers directly, the provider adapts runtime events into ControllerEngine entry points while preserving transport independence.

---

# Capability

After this task is complete, Atlas supports pluggable controller providers capable of integrating controller execution with multiple runtime environments.

---

# Goal

Provide unified controller provider abstraction.

---

# Business Value

Supports

- Runtime independence
- Provider extensibility
- Testability
- Multiple deployment targets
- Stable controller API

without coupling Atlas Controller to runtime-specific implementations.

---

# Background

Controller execution begins from runtime-specific events.

Providers translate runtime events into Atlas controller execution requests.

Concrete implementations such as Node.js, Bun, Deno, Cloudflare Workers, and serverless runtimes are intentionally excluded.

---

# Scope

## Included

- Provider abstraction
- Provider registry
- Provider metadata
- Provider lifecycle
- Provider capabilities

## Excluded

- Node.js Provider
- Bun Provider
- Deno Provider
- Cloudflare Provider
- AWS Lambda Provider
- Azure Functions Provider
- Networking
- UI

---

# Deliverables

```text
atlas-controller/

ControllerProvider.ts

ControllerProviderRegistry.ts

ControllerProviderCapabilities.ts

ControllerProviderMetadata.ts

ControllerProviderLifecycle.ts

index.ts
```

---

# Responsibilities

ControllerProvider is responsible for

- adapting runtime controller execution
- exposing provider metadata
- exposing provider capabilities
- managing provider lifecycle
- remaining runtime independent

ControllerProvider is NOT responsible for

- controller execution
- routing
- middleware execution
- dependency injection
- networking
- UI

---

# Architecture

```text
Runtime

     │

     ▼

ControllerProvider

     │

     ▼

ControllerEngine

     │

     ▼

ControllerDispatcher

     │

     ▼

ControllerExecutor
```

---

# Public API

```ts
interface ControllerProvider {
  readonly metadata: ControllerProviderMetadata;

  readonly lifecycle: ControllerProviderLifecycle;

  readonly capabilities: ControllerProviderCapabilities;

  createEngine(): ControllerEngine;
}
```

---

# Supported Provider Services

Lifecycle

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
- Test Provider
- Mock Provider

---

# Dependency

Depends On

- TASK-007 — Controller Executor
- TASK-010 — Controller Builder

---

# Risk

Critical

ControllerProvider becomes the standardized runtime integration abstraction across the Atlas controller ecosystem.

---

# Files Allowed

```text
atlas-controller/**
```

---

# Files Forbidden

```text
None
```

---

# Acceptance Criteria

- [x] ControllerProvider implemented.
- [x] Supports provider lifecycle.
- [x] Supports provider capabilities.
- [x] Runtime independent.
- [x] Produces ControllerEngine.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable controller provider abstractions capable of integrating controller execution with multiple runtime environments while preserving a provider-independent API.

---

# AI Constraints

Before implementation

- Do not implement runtime providers.
- Do not implement networking.
- Do not implement dependency injection.
- Focus only on ControllerProvider abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-007-controller-executor.md
- TASK-010-controller-builder.md

---

# Next Task

TASK-012-controller-engine.md
