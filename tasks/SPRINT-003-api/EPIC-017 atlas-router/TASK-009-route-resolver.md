---
id: TASK-009

title: Implement Route Resolver

status: Completed

priority: Critical

story_points: 34

sprint: SPRINT-003-api

epic: EPIC-017

package: atlas-router

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-009 — Implement Route Resolver

## Summary

Implement `RouteResolver`.

RouteResolver provides the provider-independent abstraction responsible for selecting the most appropriate route from one or more successful route matches.

The resolver abstraction standardizes endpoint resolution, candidate evaluation, priority rules, metadata, and lifecycle while remaining independent from routing algorithms, runtime environments, networking implementations, and HTTP providers.

---

# Capability

After this task is complete, Atlas provides standardized endpoint resolution capable of selecting the best matching route.

---

# Goal

Provide unified route resolution abstraction.

---

# Business Value

Supports

- Endpoint resolution
- Route prioritization
- Extensible routing
- Provider independence
- Future routing optimization

without coupling Atlas to framework-specific routing implementations.

---

# Background

RouteMatcher determines whether a route matches.

RouteResolver determines which matched route should ultimately be selected.

This separation allows multiple matching strategies while keeping endpoint selection independent.

---

# Scope

## Included

- Resolver abstraction
- Candidate evaluation
- Resolution policies
- Resolver metadata
- Resolver lifecycle

## Excluded

- Route matching
- Request parsing
- Endpoint execution
- Middleware
- Networking
- UI

---

# Deliverables

```text
atlas-router/

RouteResolver.ts

RouteCandidate.ts

RouteResolution.ts

RouteResolutionPolicy.ts

RouteResolverMetadata.ts

index.ts
```

---

# Responsibilities

RouteResolver is responsible for

- resolving matched routes
- evaluating candidates
- selecting the best endpoint
- exposing resolver metadata
- remaining provider independent

RouteResolver is NOT responsible for

- matching routes
- executing endpoints
- networking
- middleware
- UI

---

# Architecture

```text
Incoming Request

        │

        ▼

 Route Matcher

        │

        ▼

 Candidate Routes

        │

        ▼

 Route Resolver

        │

        ▼

 HTTP Endpoint
```

---

# Public API

```ts
interface RouteResolver {
  resolve(matches: readonly RouteMatchResult[]): RouteResolution;
}
```

---

# Supported Resolution Policies

Resolution

- Exact Match
- Highest Score
- Static Route Priority
- Registration Order

Future

- Version Priority
- Locale Priority
- Host Priority
- Custom Resolver Policy

---

# Dependency

Depends On

- TASK-004 — Route Matcher
- TASK-007 — Route Registry
- TASK-008 — Route Collection

---

# Risk

Critical

RouteResolver becomes the standardized endpoint resolution abstraction across the Atlas Router ecosystem.

---

# Files Allowed

```text
atlas-router/**
```

---

# Files Forbidden

```text
None
```

---

# Acceptance Criteria

- [x] RouteResolver implemented.
- [x] Supports candidate evaluation.
- [x] Supports resolution policies.
- [x] Supports metadata.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable route resolution abstractions capable of selecting the most appropriate endpoint independently from routing algorithms, runtime environments, and networking implementations.

---

# AI Constraints

Before implementation

- Do not implement routing algorithms.
- Do not implement endpoint execution.
- Do not implement middleware.
- Do not implement networking.
- Focus only on RouteResolver abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-004-route-matcher.md
- TASK-007-route-registry.md
- TASK-008-route-collection.md

---

# Next Task

TASK-010-route-context.md
