# Atlas WebSocket Architecture

## Overview

Atlas WebSocket provides the provider-independent architecture for realtime communication within the Atlas ecosystem.

Rather than implementing a WebSocket server directly, Atlas models realtime communication as reusable domain abstractions that can later be composed into complete runtimes through builders, transport adapters, and registries.

The package intentionally separates domain modeling from networking, serialization, transport implementations, and third-party integrations.

---

# Design Principles

Atlas WebSocket follows the core architectural principles adopted across the Atlas framework.

## Domain First

Realtime communication is represented using reusable domain models.

Examples

- WebSocketConnection
- WebSocketSession
- WebSocketMessage
- WebSocketChannel

---

## Provider Independent

Atlas WebSocket never depends directly on:

- ws
- Socket.IO
- Bun WebSocket
- uWebSockets
- Cloudflare Workers
- Deno

Every transport implementation is integrated through adapters.

---

## Separation of Concerns

Each abstraction owns exactly one responsibility.

Examples

- Connection manages transport state.
- Session manages communication identity.
- Endpoint defines realtime services.
- Message represents communication envelopes.
- Builder assembles runtime.
- Adapter integrates transport providers.
- Registry manages reusable runtime components.

---

## Composable

Realtime runtimes are composed from independent reusable components.

Each abstraction evolves independently.

---

## Extensible

Future transports, messaging protocols, distributed runtimes, and realtime platforms can be supported without modifying existing abstractions.

---

# Architecture

```text
                   Atlas Application

                           │

                           ▼

                    WebSocket Core

                           │

                           ▼

                   WebSocket Connection

                           │

                           ▼

                    WebSocket Session

                           │

                           ▼

                   WebSocket Endpoint

                           │

                           ▼

                   WebSocket Message

              ┌────────────┼────────────┐

              ▼            ▼            ▼

        Request       Response       Event

                           │

                           ▼

                  WebSocket Channel

                           │

                           ▼

               WebSocket Subscription

                           │

                           ▼

                WebSocket Middleware

                           │

                           ▼

                  WebSocket Context

                           │

                ┌──────────┴──────────┐

                ▼                     ▼

        Authentication         Authorization

                           │

                           ▼

                  WebSocket Protocol

                           │

                           ▼

              WebSocket Runtime Builder

                           │

                           ▼

            WebSocket Transport Adapter

                           │

                           ▼

                  WebSocket Registry
```

---

# Architectural Layers

## Core Layer

Coordinates the realtime subsystem.

Components

- WebSocketCore

---

## Transport Layer

Represents transport connectivity.

Components

- WebSocketConnection

---

## Session Layer

Represents logical communication state.

Components

- WebSocketSession

---

## Endpoint Layer

Represents realtime services.

Components

- WebSocketEndpoint

---

## Messaging Layer

Represents realtime communication contracts.

Components

- WebSocketMessage
- WebSocketRequest
- WebSocketResponse
- WebSocketEvent

---

## Communication Layer

Represents logical communication topology.

Components

- WebSocketChannel
- WebSocketSubscription

---

## Processing Layer

Intercepts realtime processing.

Components

- WebSocketMiddleware

---

## Execution Layer

Shares execution state.

Components

- WebSocketContext

---

## Security Layer

Represents security abstractions.

Components

- WebSocketAuthentication
- WebSocketAuthorization

---

## Protocol Layer

Represents application protocols.

Components

- WebSocketProtocol

---

## Composition Layer

Builds complete runtimes.

Components

- WebSocketRuntimeBuilder

---

## Integration Layer

Bridges runtime implementations.

Components

- WebSocketTransportAdapter

---

## Registry Layer

Provides runtime discovery.

Components

- WebSocketRegistry

---

# Runtime Flow

```text
Client

↓

Connection

↓

Session

↓

Endpoint

↓

Middleware

↓

Request

↓

Application Service

↓

Response

↓

Event

↓

Channel

↓

Subscription

↓

Transport Adapter

↓

Client
```

---

# Communication Model

```text
                  WebSocket Message

                         │

        ┌────────────────┼────────────────┐

        ▼                ▼                ▼

 Request (Command)   Response (Result)   Event (Notification)

                         │

                         ▼

                    Channel

                         │

                         ▼

                  Subscription

                         │

                         ▼

                      Delivery
```

---

# Dependency Graph

```text
Core

↓

Connection

↓

Session

↓

Endpoint

↓

Message

↓

Request
Response
Event

↓

Channel

↓

Subscription

↓

Middleware

↓

Context

↓

Authentication
Authorization

↓

Protocol

↓

Runtime Builder

↓

Transport Adapter

↓

Registry
```

---

# Runtime Composition

```text
Atlas Packages

├── atlas-controller

├── atlas-authentication

├── atlas-validation

├── atlas-openapi

└── atlas-websocket

        │

        ▼

WebSocketRuntimeBuilder

        │

        ▼

Realtime Runtime

        │

        ▼

Transport Adapter
```

---

# Integration Points

Atlas WebSocket integrates with:

## atlas-controller

Provides endpoint handlers.

---

## atlas-validation

Provides payload validation.

---

## atlas-authentication

Provides authentication and authorization providers.

---

## atlas-http

Provides shared protocol abstractions.

---

## atlas-openapi

Provides metadata for documentation generation.

---

# Extension Points

Future extensions include:

- WebTransport
- MQTT over WebSocket
- GraphQL Subscription
- STOMP
- JSON-RPC
- WAMP
- Cloud Events
- Distributed Realtime Runtime
- Multi-Node Clusters

---

# Future Transport Adapters

Future adapters may include:

- ws
- Socket.IO
- Bun WebSocket
- uWebSockets
- Cloudflare Workers
- Deno
- Node.js Native WebSocket

---

# Design Decisions

Atlas WebSocket intentionally separates:

- Transport from Session
- Session from Connection
- Request from Event
- Channel from Subscription
- Authentication from Authorization
- Builder from Transport Adapter
- Adapter from Registry

Each abstraction owns a single responsibility and can evolve independently.

---

# Non Goals

Atlas WebSocket does not implement:

- WebSocket server
- Networking
- RFC6455 transport
- Serialization
- Message brokers
- Authentication providers
- Authorization engines
- Dependency injection
- Business logic

These responsibilities belong to adapters or other Atlas packages.

---

# References

- README.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
