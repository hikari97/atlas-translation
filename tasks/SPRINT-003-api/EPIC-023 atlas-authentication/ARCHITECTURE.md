# Atlas Authentication Architecture

## Overview

Atlas Authentication provides a provider-independent authentication engine.

Applications define authentication strategies using AuthenticationBuilder.

AuthenticationEngine coordinates authentication resolution, credential processing, session creation, token generation, lifecycle management, metadata propagation, and authentication orchestration.

---

# Architecture

```text
Runtime

     │

     ▼

Authentication Provider

     │

     ▼

Authentication Engine

     │

     ▼

Authentication Resolver

     │

     ▼

Authentication Strategy

     │

     ▼

Authentication Result

     │

     ▼

Authentication Session

     │

     ▼

Authentication Token
```

---

# Component Dependency

```text
Authentication Core
      │
      ▼
Authentication Interface
      │
      ▼
Authentication Context
      │
      ▼
Authentication Registry
      │
      ▼
Authentication Resolver
      │
      ▼
Authentication Credential
      │
      ▼
Authentication Session
      │
      ▼
Authentication Token
      │
      ▼
Authentication Lifecycle
      │
      ▼
Authentication Builder
      │
      ▼
Authentication Provider
      │
      ▼
Authentication Engine
      │
      ▼
Authentication Factory
```

---

# Authentication Pipeline

```text
AuthenticationContext
        │
        ▼
AuthenticationEngine
        │
        ▼
AuthenticationResolver
        │
        ▼
AuthenticationFactory
        │
        ▼
AuthenticationStrategy
        │
        ▼
AuthenticationResult
        │
        ▼
AuthenticationSession
        │
        ▼
AuthenticationToken
```

---

# Authentication Flow

```text
Credential
     │
     ▼
AuthenticationContext
     │
     ▼
AuthenticationEngine
     │
     ▼
AuthenticationResolver
     │
     ▼
AuthenticationStrategy
     │
     ▼
AuthenticationResult
     │
     ▼
AuthenticationSession
     │
     ▼
AuthenticationToken
```

---

# Integration Points

Foundation

- atlas-http
- atlas-request
- atlas-controller

Security

- atlas-authorization

Future

- atlas-openapi
- atlas-websocket

Runtime

- Node.js
- Bun
- Deno
- Cloudflare Workers

---

# Design Goals

- Runtime Independence
- Provider Independence
- Strategy-based Authentication
- Strong Typing
- Extensible Authentication
- Transport Independence
