# Atlas Middleware Architecture

## Overview

Atlas Middleware provides a transport-independent middleware execution engine.

Applications configure middleware through MiddlewareBuilder.

MiddlewareEngine orchestrates resolution, execution, lifecycle, and context propagation.

---

# Architecture

```text
Runtime

     │

     ▼

Middleware Provider

     │

     ▼

Middleware Engine

     │

     ▼

Middleware Executor

     │

     ▼

Middleware Pipeline

     │

     ▼

Middleware Chain

     │

     ▼

Controller
```

---

# Component Dependency

```text
Middleware Core
      │
      ▼
Middleware Interface
      │
      ▼
Middleware Context
      │
      ▼
Middleware Pipeline
      │
      ▼
Middleware Chain
      │
      ▼
Middleware Registry
      │
      ▼
Middleware Resolver
      │
      ▼
Middleware Executor
      │
      ▼
Middleware Metadata
      │
      ▼
Middleware Lifecycle
      │
      ▼
Middleware Builder
      │
      ▼
Middleware Provider
      │
      ▼
Middleware Engine
```

---

# Integration Points

Foundation

- atlas-http
- atlas-router
- atlas-request
- atlas-response

Application

- atlas-controller
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
- Reusable Middleware
- Pipeline-based Execution
- Strong Typing
