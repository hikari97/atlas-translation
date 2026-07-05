# Atlas Controller

Atlas Controller provides the application-level controller infrastructure for the Atlas ecosystem.

The package coordinates controller registration, resolution, dispatching, execution, lifecycle management, and metadata while remaining independent from runtime environments, networking implementations, transport protocols, and web frameworks.

---

# Objectives

- Controller abstraction
- Controller execution
- Runtime independence
- Strong typing
- Stable controller API

---

# Features

## Foundation

- Controller Core
- Controller Interface
- Controller Context

## Resolution

- Controller Registry
- Controller Resolver
- Controller Factory

## Execution

- Controller Dispatcher
- Controller Executor

## Infrastructure

- Controller Metadata
- Controller Lifecycle
- Controller Builder
- Controller Provider
- Controller Engine

---

# Package Structure

```text
atlas-controller/

├── Core
├── Interface
├── Context
├── Registry
├── Resolver
├── Factory
├── Dispatcher
├── Executor
├── Metadata
├── Lifecycle
├── Builder
├── Provider
└── Engine
```

---

# Responsibilities

Atlas Controller is responsible for

- Controller execution
- Controller orchestration
- Controller lifecycle
- Runtime abstraction

Atlas Controller is NOT responsible for

- Route matching
- Request parsing
- Response serialization
- Validation
- Dependency Injection
- Networking

---

# Design Principles

- Provider Independent
- Runtime Independent
- Strong Typing
- Modular Architecture
- Single Responsibility

---

# Future Integrations

- atlas-validation
- atlas-security
- atlas-authentication
- atlas-authorization
