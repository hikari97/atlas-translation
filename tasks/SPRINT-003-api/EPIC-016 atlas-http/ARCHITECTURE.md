# Atlas HTTP Architecture

## Overview

Atlas HTTP is the protocol abstraction layer of the Atlas ecosystem.

It defines reusable HTTP contracts without depending on specific runtime environments or web frameworks.

---

# Architecture

```text
                Atlas HTTP

                    │

              Http Core

                    │

              Http Context

                    │

              Http Message

        ┌───────────┴───────────┐

        ▼                       ▼

 Http Request             Http Response
      (EPIC-018)             (EPIC-019)

                    │

             Http Pipeline

                    │

             Http Handler

                    │

             Http Endpoint

                    │

             Http Provider

                    │

        Runtime Implementations
```

---

# Component Dependency

```text
Core
    ↓
Context
    ↓
Message
    ↓
Protocol
    ↓
Connection
    ↓
Server / Client
    ↓
Pipeline
    ↓
Handler
    ↓
Endpoint
    ↓
Metadata
    ↓
Lifecycle
    ↓
Provider
```

---

# Integration Points

Foundation

- atlas-core
- atlas-events

API

- atlas-router
- atlas-request
- atlas-response
- atlas-middleware
- atlas-controller

Backend

- Authentication
- Validation
- OpenAPI

---

# Design Goals

- Stable HTTP contracts
- Runtime independence
- Provider abstraction
- Extensible architecture
- High cohesion
- Low coupling
