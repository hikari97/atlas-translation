---
id: TASK-006

title: Implement WebSocket Request

status: Completed

priority: Critical

story_points: 21

sprint: SPRINT-003-api

epic: EPIC-025

package: atlas-websocket

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-05
---

# TASK-006 — Implement WebSocket Request

## Summary

Implement `WebSocketRequest`.

WebSocketRequest provides the provider-independent abstraction responsible for representing inbound realtime requests initiated by clients.

The request abstraction standardizes command metadata, payload contracts, correlation information, routing semantics, and request lifecycle while remaining independent from transport implementations, serialization formats, networking libraries, and runtime environments.

---

# Capability

After this task is complete, Atlas supports standardized realtime request abstractions.

---

# Goal

Provide reusable WebSocket request abstraction.

---

# Business Value

Supports

- Client commands
- RPC-style messaging
- Request/Response workflows
- Correlation tracking
- Provider independence

without coupling Atlas to any WebSocket implementation.

---

# Background

Unlike HTTP, WebSocket has no native request model.

Atlas introduces WebSocketRequest as a logical command abstraction that represents an action requested by a connected client.

Requests are transport-independent and may be processed synchronously or asynchronously.

---

# Scope

## Included

- Request abstraction
- Command metadata
- Correlation information
- Request lifecycle
- Extension points

## Excluded

- Networking
- Serialization
- Authentication
- Authorization
- Business logic

---

# Deliverables

```text
packages/atlas-websocket/

WebSocketRequest.ts

WebSocketRequestMetadata.ts

WebSocketRequestContext.ts

WebSocketRequestLifecycle.ts

WebSocketRequestExtension.ts

index.ts
```

---

# Responsibilities

WebSocketRequest is responsible for

- representing client requests
- exposing request metadata
- exposing routing information
- exposing correlation identifiers
- remaining provider independent

WebSocketRequest is NOT responsible for

- executing business logic
- authentication
- authorization
- serialization
- networking

---

# Architecture

```text
WebSocket Request

├── Identifier
├── Route
├── Payload
├── Metadata
├── Context
└── Extensions
```

---

# Public API

```ts
interface WebSocketRequest {
  readonly id: string;

  readonly route: string;

  readonly payload: unknown;

  readonly metadata: WebSocketRequestMetadata;
}
```

---

# Supported Request Services

Request

- Command
- RPC
- Query
- Action Invocation

Metadata

- Correlation Id
- Request Id
- Timestamp
- Client Id

Future

- Batch Requests
- Streaming Requests
- Priority Requests
- Scheduled Requests

---

# Dependency

Depends On

- TASK-005 — WebSocket Message

---

# Risk

Critical

WebSocketRequest becomes the standardized inbound command abstraction across the Atlas realtime subsystem.

---

# Files Allowed

```text
packages/atlas-websocket/**
```

---

# Files Forbidden

```text
None
```

---

# Acceptance Criteria

- [x] WebSocketRequest implemented.
- [x] Supports request metadata.
- [x] Supports correlation identifiers.
- [x] Supports routing information.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable WebSocket request abstractions capable of representing inbound realtime commands independently from transport implementations, networking libraries, and serialization formats.

---

# AI Constraints

Before implementation

- Do not implement networking.
- Do not implement request dispatching.
- Do not implement authentication.
- Do not implement serialization.
- Focus only on WebSocketRequest abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-005-websocket-message.md
- RFC 6455 WebSocket Protocol

---

# Next Task

TASK-007-websocket-response.md
