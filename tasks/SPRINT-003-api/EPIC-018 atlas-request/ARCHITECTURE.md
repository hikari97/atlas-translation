# Atlas Request Architecture

## Overview

Atlas Request provides application-oriented access to inbound HTTP requests.

It aggregates HTTP abstractions, routing results, and request-scoped services into a unified application request model.

---

# Architecture

```text
HttpRequest

      │

      ▼

Request Core

      │

      ▼

Request Context

      │

 ┌────┼──────────────────────────────┐

 ▼    ▼      ▼        ▼       ▼      ▼

Body Query Params Cookies Files Session

      │

      ▼

 Controller
```

---

# Component Dependency

```text
Request Core
      │
      ▼
HTTP Request
      │
      ▼
Body
      │
      ▼
Headers
      │
      ▼
Query
      │
      ▼
Parameters
      │
      ▼
Cookies
      │
      ▼
Files
      │
      ▼
Session
      │
      ▼
Context
      │
      ▼
Metadata
      │
      ▼
Lifecycle
      │
      ▼
Provider
```

---

# Integration Points

Foundation

- atlas-http
- atlas-router

Application

- atlas-response
- atlas-controller
- atlas-validation
- atlas-authentication

---

# Design Goals

- Unified Request API
- Immutable Request Model
- Provider Independence
- Runtime Independence
- Strong Typing
