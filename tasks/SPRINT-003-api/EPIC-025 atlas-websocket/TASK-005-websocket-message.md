---
id: TASK-005

title: Implement WebSocket Message

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

# TASK-005 — Implement WebSocket Message

## Summary

Implement `WebSocketMessage`.

WebSocketMessage provides the provider-independent abstraction responsible for representing realtime messages exchanged between clients and servers.

The message abstraction standardizes payload envelopes, metadata, message identifiers, routing information, delivery semantics, and extensions while remaining independent from transport implementations, serialization formats, and runtime environments.

---

# Capability

After this task is complete, Atlas supports standardized realtime messaging abstractions.

---

# Goal

Provide reusable WebSocket message abstraction.

---

# Business Value

Supports

- Realtime messaging
- Bidirectional communication
- Event-driven architecture
- Request/Response messaging
- Broadcast messaging
- Provider independence

without coupling Atlas to any WebSocket implementation.

---

# Background

Every WebSocket communication exchanges messages.

Atlas models messages as transport-independent envelopes capable of representing requests, responses, events, notifications, and broadcasts.

This abstraction provides a unified messaging model for every realtime interaction.

---

# Scope

## Included

- Message abstraction
- Envelope metadata
- Message identifiers
- Routing metadata
- Extensions

## Excluded

- Serialization
- Networking
- Compression
- Encryption
- Delivery implementation

---

# Deliverables

```text
atlas-websocket/

WebSocketMessage.ts

WebSocketMessageMetadata.ts

WebSocketMessageHeader.ts

WebSocketMessageIdentifier.ts

WebSocketMessageExtension.ts

index.ts
```

---

# Responsibilities

WebSocketMessage is responsible for

- representing realtime messages
- exposing message metadata
- exposing message identity
- exposing routing information
- remaining provider independent

WebSocketMessage is NOT responsible for

- serialization
- transport
- encryption
- compression
- delivery guarantees

---

# Architecture

```text
WebSocket Message

├── Identifier
├── Headers
├── Payload
├── Metadata
└── Extensions
```

---

# Public API

```ts
interface WebSocketMessage {
  readonly id: string;

  readonly headers: ReadonlyMap<string, string>;

  readonly payload: unknown;

  readonly metadata: WebSocketMessageMetadata;
}
```

---

# Supported Message Services

Messaging

- Request
- Response
- Event
- Broadcast
- Notification

Metadata

- Correlation Id
- Timestamp
- Sender
- Receiver

Future

- Streaming Messages
- Chunked Messages
- Binary Payloads
- Reliable Messaging

---

# Dependency

Depends On

- TASK-004 — WebSocket Endpoint

---

# Risk

Critical

WebSocketMessage becomes the standardized communication abstraction across the Atlas realtime subsystem.

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

- [ ] WebSocketMessage implemented.
- [ ] Supports message metadata.
- [ ] Supports routing metadata.
- [ ] Supports extensible payloads.
- [ ] Provider independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable WebSocket message abstractions capable of representing realtime communication independently from transport implementations and serialization formats.

---

# AI Constraints

Before implementation

- Do not implement JSON serialization.
- Do not implement networking.
- Do not implement compression.
- Do not implement encryption.
- Focus only on WebSocketMessage abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-004-websocket-endpoint.md
- RFC 6455 WebSocket Protocol

---

# Next Task

TASK-006-websocket-request.md
