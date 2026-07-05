# Atlas Controller Architecture

## Overview

Atlas Controller provides a provider-independent controller execution engine.

Applications declare controllers using ControllerBuilder.

ControllerEngine coordinates resolution, dispatching, execution, lifecycle, and metadata propagation.

---

# Architecture

```text
Runtime

     │

     ▼

Controller Provider

     │

     ▼

Controller Engine

     │

     ▼

Controller Dispatcher

     │

     ▼

Controller Executor

     │

     ▼

Controller
```

---

# Component Dependency

```text
Controller Core
      │
      ▼
Controller Interface
      │
      ▼
Controller Context
      │
      ▼
Controller Registry
      │
      ▼
Controller Resolver
      │
      ▼
Controller Dispatcher
      │
      ▼
Controller Executor
      │
      ▼
Controller Metadata
      │
      ▼
Controller Lifecycle
      │
      ▼
Controller Builder
      │
      ▼
Controller Provider
      │
      ▼
Controller Engine
      │
      ▼
Controller Factory
```

---

# Integration Points

Foundation

- atlas-http
- atlas-router
- atlas-request
- atlas-response
- atlas-middleware

Application

- atlas-validation

Runtime

- Node.js
- Bun
- Deno
- Cloudflare Workers

---

# Design Goals

- Runtime Independence
- Transport Independence
- Strong Typing
- Reusable Controllers
- Extensible Architecture
