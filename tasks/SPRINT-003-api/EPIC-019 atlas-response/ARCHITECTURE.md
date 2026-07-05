# Atlas Response Architecture

## Overview

Atlas Response provides application-oriented response generation.

Controllers never construct HTTP responses directly.

Instead, they use ResponseBuilder to construct immutable HttpResponse objects.

---

# Architecture

```text
Controller

     │

     ▼

ResponseBuilder

     │

     ▼

ResponseContext

     │

     ▼

HttpResponse

     │

     ▼

ResponseProvider

     │

     ▼

Runtime
```

---

# Component Dependency

```text
Response Core
      │
      ▼
HTTP Response
      │
      ▼
Body
      │
      ▼
Headers
      │
      ▼
Status
      │
      ▼
Cookies
      │
      ▼
Cache
      │
      ▼
Attachment
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
Builder
      │
      ▼
Provider
```

---

# Integration Points

Foundation

- atlas-http
- atlas-request

Application

- atlas-controller
- atlas-serialization
- atlas-validation

Infrastructure

- Runtime Providers

---

# Design Goals

- Immutable Response
- Fluent Builder
- Provider Independence
- Runtime Independence
- Strong Typing
