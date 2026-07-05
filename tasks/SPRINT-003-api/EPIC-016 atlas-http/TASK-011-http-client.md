---
id: TASK-011

title: Implement HTTP Client

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

# TASK-011 — Implement HTTP Client

## Summary

Implement `HttpClient`.

HttpClient provides the provider-independent abstraction responsible for initiating and managing outbound HTTP communication within the Atlas ecosystem.

The client abstraction coordinates request execution, connection usage, lifecycle management, and provider integration while remaining independent from runtime environments, networking implementations, and HTTP client libraries.

---

# Capability

After this task is complete, Atlas provides a standardized HTTP client abstraction capable of supporting multiple runtime providers.

---

# Goal

Provide unified HTTP client abstraction.

---

# Business Value

Supports

- Outbound HTTP communication
- External API integration
- Service-to-service communication
- Provider independence
- Future client implementations

without coupling Atlas to specific HTTP client libraries.

---

# Background

While HttpServer manages incoming HTTP communication, HttpClient manages outbound communication.

Concrete implementations such as Fetch API, Axios, Node.js HTTP Client, Bun, Deno, or Cloudflare Fetch are intentionally excluded from this task.

---

# Scope

## Included

- Client abstraction
- Client lifecycle
- Client metadata
- Client configuration
- Provider contract

## Excluded

- Request implementation
- Response implementation
- Retry policy
- Caching
- Networking
- UI

---

# Deliverables

```text
atlas-http/

HttpClient.ts

HttpClientConfiguration.ts

HttpClientLifecycle.ts

HttpClientMetadata.ts

HttpClientProvider.ts

index.ts
```

---

# Responsibilities

HttpClient is responsible for

- coordinating outbound HTTP communication
- managing client lifecycle
- exposing client metadata
- exposing provider contracts
- remaining provider independent

HttpClient is NOT responsible for

- request modeling
- response modeling
- retry strategies
- caching
- networking
- UI

---

# Architecture

```text
HTTP Client

├── Configuration
├── Lifecycle
├── Metadata
└── Provider

        │
        ▼

 Http Connection

        │
        ▼

 External Service
```

---

# Public API

```ts
interface HttpClient {
  readonly configuration: HttpClientConfiguration;

  readonly lifecycle: HttpClientLifecycle;

  readonly metadata: HttpClientMetadata;

  readonly provider: HttpClientProvider;
}
```

---

# Supported Client Services

Client

- Send
- Cancel
- Close

Lifecycle

- Initialize
- Ready
- Busy
- Closed

Configuration

- Base URL
- Timeout
- Default Headers

Future

- Retry Policy
- Redirect Policy
- Connection Pool
- Mock Client
- Load Balancer

---

# Dependency

Depends On

- TASK-001 — HTTP Core
- TASK-009 — HTTP Connection

---

# Risk

Critical

HttpClient becomes the standardized outbound HTTP abstraction across the Atlas HTTP ecosystem.

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

- [x] HttpClient implemented.
- [x] Supports client lifecycle.
- [x] Supports provider abstraction.
- [x] Supports configuration.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable HTTP client abstractions capable of supporting multiple runtime providers independently from networking implementations and HTTP client libraries.

---

# AI Constraints

Before implementation

- Do not implement Fetch API.
- Do not implement Axios.
- Do not implement Node.js HTTP client.
- Do not implement Bun client.
- Do not implement Deno client.
- Do not implement networking.
- Do not implement retry policies.
- Focus only on HttpClient abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-001-http-core.md
- TASK-009-http-connection.md
- TASK-010-http-server.md

---

# Next Task

TASK-012-http-pipeline.md
