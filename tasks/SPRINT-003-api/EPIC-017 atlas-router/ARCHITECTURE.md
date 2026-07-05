# Atlas Router Architecture

## Overview

Atlas Router is responsible for resolving HTTP endpoints.

Routing consists of multiple independent stages that cooperate through shared abstractions.

---

# Architecture

```text
Incoming Request

        │

        ▼

 Route Registry

        │

        ▼

 Route Collection

        │

        ▼

 Route Matcher

        │

        ▼

 Route Parameters

        │

        ▼

 Route Constraints

        │

        ▼

 Route Resolver

        │

        ▼

 Route Resolution

        │

        ▼

 HTTP Endpoint
```

---

# Component Dependency

```text
Router Core
      │
      ▼
Route
      │
      ▼
Route Group
      │
      ▼
Matcher
      │
      ▼
Parameters
      │
      ▼
Constraints
      │
      ▼
Registry
      │
      ▼
Collection
      │
      ▼
Resolver
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

# Design Goals

- Separation of Concerns
- Provider Independence
- Runtime Independence
- Extensible Routing
- Immutable Route Definitions
- Predictable Resolution
