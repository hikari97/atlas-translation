# Atlas Request

Atlas Request provides the application-level request abstraction for the Atlas ecosystem.

The package transforms protocol-level HTTP requests into application-friendly request objects that can be consumed by controllers, middleware, validation, authentication, and future application services.

Atlas Request intentionally remains independent from runtime environments, networking implementations, and HTTP providers.

---

# Objectives

- Application request abstraction
- Provider-independent request model
- Immutable request contracts
- Request composition
- Stable public API

---

# Features

## Core

- Request Core
- HTTP Request

## Request Components

- Request Body
- Request Headers
- Request Query
- Request Parameters
- Request Cookies
- Request Files
- Request Session

## Infrastructure

- Request Context
- Request Metadata
- Request Lifecycle
- Request Provider

---

# Package Structure

```text
atlas-request/

├── Core
├── Http Request
├── Body
├── Headers
├── Query
├── Parameters
├── Cookies
├── Files
├── Session
├── Context
├── Metadata
├── Lifecycle
└── Provider
```

---

# Responsibilities

Atlas Request is responsible for

- Application request abstraction
- Request composition
- Request context
- Session abstraction
- Uploaded file abstraction

Atlas Request is NOT responsible for

- HTTP protocol
- Route matching
- Response generation
- Middleware execution
- Controller execution
- Networking

---

# Design Principles

- Provider Independent
- Runtime Agnostic
- Immutable Contracts
- Strongly Typed
- Single Responsibility
- Modular Architecture

---

# Future Integrations

- atlas-response
- atlas-middleware
- atlas-controller
- atlas-validation
- atlas-authentication
