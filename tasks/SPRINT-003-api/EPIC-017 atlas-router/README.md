# Atlas Router

Atlas Router provides the provider-independent routing foundation for the Atlas ecosystem.

The package is responsible for discovering HTTP endpoints from incoming HTTP requests while remaining independent from runtime environments, networking implementations, HTTP providers, and routing frameworks.

Atlas Router does not execute controllers, middleware, or HTTP requests.

Its sole responsibility is endpoint resolution.

---

# Objectives

- Provider-independent routing
- Runtime-independent architecture
- Modular routing engine
- Extensible routing strategies
- Stable routing contracts

---

# Features

## Core

- Router Core
- Route
- Route Group

## Matching

- Route Matcher
- Route Parameters
- Route Constraints

## Registry

- Route Registry
- Route Collection

## Resolution

- Route Resolver
- Route Context

## Infrastructure

- Route Metadata
- Route Lifecycle
- Route Provider

---

# Package Structure

```text
atlas-router/

├── Core
├── Route
├── Group
├── Matcher
├── Parameters
├── Constraints
├── Registry
├── Collection
├── Resolver
├── Context
├── Metadata
├── Lifecycle
└── Provider
```

---

# Responsibilities

Atlas Router is responsible for

- Route registration
- Route discovery
- Route matching
- Endpoint resolution

Atlas Router is NOT responsible for

- HTTP requests
- HTTP responses
- Middleware execution
- Controller execution
- Networking

---

# Design Principles

- Provider Independent
- Runtime Agnostic
- Single Responsibility
- Strongly Typed
- Immutable Routing Contracts
- Modular Architecture

---

# Future Integrations

- atlas-request
- atlas-response
- atlas-controller
- atlas-openapi
- atlas-validation
- atlas-authentication
