---
id: TASK-012

title: Implement WebSocket Context

status: Ready

priority: Critical

story_points: 21

sprint: SPRINT-003-api

epic: EPIC-025

package: atlas-websocket

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-012 — Implement WebSocket Context

## Summary

Implement `WebSocketContext`.

WebSocketContext provides the provider-independent abstraction responsible for representing the execution context of realtime communication within the Atlas WebSocket ecosystem.

The context abstraction standardizes access to connections, sessions, requests, responses, events, channels, subscriptions, middleware state, and execution metadata while remaining independent from transport implementations, networking libraries, and runtime environments.

---

# Capability

After this task is complete, Atlas supports standardized execution context abstractions for realtime communication.

---

# Goal

Provide reusable execution context abstraction.

---

# Business Value

Supports

- Middleware execution
- Context propagation
- Dependency injection
- Observability
- Request correlation
- Provider independence

without coupling Atlas to any runtime implementation.

---

# Background

Every stage of realtime communication requires access to shared state.

Instead of passing numerous objects between components, Atlas exposes a single execution context that encapsulates the current communication state.

The context becomes the primary interaction surface throughout the WebSocket processing pipeline.

---

# Scope

## Included

- Execution context
- Context metadata
- Context attributes
- Context lifecycle
- Extension points

## Excluded

- Dependency injection container
- Networking
- Authentication implementation
- Authorization implementation
- Serialization

---

# Deliverables

```text
atlas-websocket/

WebSocketContext.ts

WebSocketContextMetadata.ts

WebSocketContextAttributes.ts

WebSocketContextLifecycle.ts

WebSocketContextExtension.ts

index.ts
```

---

# Responsibilities

WebSocketContext is responsible for

- exposing execution state
- exposing shared communication objects
- propagating contextual information
- exposing execution metadata
- remaining provider independent

WebSocketContext is NOT responsible for

- networking
- dependency injection
- authentication implementation
- authorization implementation
- serialization

---

# Architecture

```text
WebSocket Context

├── Connection
├── Session
├── Endpoint
├── Request
├── Response
├── Event
├── Channel
├── Subscription
├── Metadata
└── Attributes
```

---

# Public API

```ts
interface WebSocketContext {
  readonly connection: WebSocketConnection;

  readonly session: WebSocketSession;

  readonly endpoint: WebSocketEndpoint;

  readonly metadata: WebSocketContextMetadata;

  readonly attributes: ReadonlyMap<string, unknown>;
}
```

---

# Supported Context Services

Execution Context

- Connection
- Session
- Endpoint
- Request
- Response
- Event
- Channel
- Subscription

State

- Metadata
- Attributes
- Correlation
- Trace

Future

- Distributed Context
- Activity Context
- OpenTelemetry Integration
- Context Snapshot

---

# Dependency

Depends On

- TASK-002 — WebSocket Connection
- TASK-003 — WebSocket Session
- TASK-004 — WebSocket Endpoint
- TASK-011 — WebSocket Middleware

---

# Risk

Critical

WebSocketContext becomes the standardized execution context across the Atlas realtime subsystem.

---

# Files Allowed

```text
atlas-websocket/**
```

---

# Files Forbidden

```text
None
```

---

# Acceptance Criteria

- [ ] WebSocketContext implemented.
- [ ] Supports shared execution state.
- [ ] Supports metadata propagation.
- [ ] Supports custom attributes.
- [ ] Provider independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable execution context abstractions capable of sharing realtime communication state independently from transport implementations, networking libraries, and runtime environments.

---

# AI Constraints

Before implementation

- Do not implement dependency injection.
- Do not implement networking.
- Do not implement authentication.
- Do not implement authorization.
- Focus only on WebSocketContext abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-011-websocket-middleware.md
- RFC 6455 WebSocket Protocol

---

# Next Task

TASK-013-websocket-authentication.md
