# Atlas Validation Architecture

## Overview

Atlas Validation provides a provider-independent validation engine.

Applications define validators using ValidationBuilder.

ValidationEngine coordinates validation resolution, rule execution, lifecycle management, metadata propagation, and result aggregation.

---

# Architecture

```text
Runtime

     │

     ▼

Validation Provider

     │

     ▼

Validation Engine

     │

     ▼

Validation Resolver

     │

     ▼

Validation Executor

     │

     ▼

Validation Rule Collection

     │

     ▼

Validation Result
```

---

# Component Dependency

```text
Validation Core
      │
      ▼
Validation Interface
      │
      ▼
Validation Context
      │
      ▼
Validation Registry
      │
      ▼
Validation Resolver
      │
      ▼
Validation Rule
      │
      ▼
Validation Executor
      │
      ▼
Validation Metadata
      │
      ▼
Validation Lifecycle
      │
      ▼
Validation Builder
      │
      ▼
Validation Provider
      │
      ▼
Validation Engine
      │
      ▼
Validation Factory
```

---

# Validation Pipeline

```text
ValidationContext
        │
        ▼
ValidationEngine
        │
        ▼
ValidationResolver
        │
        ▼
ValidationExecutor
        │
        ▼
ValidationRuleCollection
        │
 ┌──────┼──────────────┬─────────────┐
 ▼      ▼              ▼             ▼
Rule1  Rule2        Rule3         RuleN
        │
        ▼
ValidationResult
```

---

# Integration Points

Foundation

- atlas-http
- atlas-request
- atlas-controller

Future

- atlas-serialization
- atlas-security
- atlas-authentication
- atlas-authorization

Runtime

- Node.js
- Bun
- Deno
- Cloudflare Workers

---

# Design Goals

- Runtime Independence
- Provider Independence
- Rule Composition
- Strong Typing
- Extensible Validation
