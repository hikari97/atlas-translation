---
id: TASK-004

title: Implement Route Matcher

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

# TASK-004 — Implement Route Matcher

## Summary

Implement `RouteMatcher`.

RouteMatcher provides the provider-independent abstraction responsible for determining whether an incoming HTTP request matches a registered route.

The matcher abstraction standardizes route comparison, matching strategies, scoring, metadata, and lifecycle while remaining independent from runtime environments, networking implementations, HTTP providers, and routing algorithms.

---

# Capability

After this task is complete, Atlas provides standardized route matching abstractions capable of supporting multiple routing strategies.

---

# Goal

Provide unified route matching abstraction.

---

# Business Value

Supports

- Route matching
- Dynamic routes
- Extensible matching strategies
- Provider independence
- Future routing optimization

without coupling Atlas to framework-specific routing implementations.

---

# Background

Routing consists of two distinct responsibilities:

1. Determine whether a request matches a route.
2. Select the best matching endpoint.

RouteMatcher performs only the first responsibility.

Endpoint selection belongs to RouteResolver.

---

# Scope

## Included

- Matcher abstraction
- Match result
- Matching strategy
- Matcher metadata
- Matcher lifecycle

## Excluded

- Route resolver
- Endpoint execution
- Middleware
- Request parsing
- Networking
- UI

---

# Deliverables

```text
atlas-router/

RouteMatcher.ts

RouteMatch.ts

RouteMatchResult.ts

RouteMatchStrategy.ts

RouteMatcherMetadata.ts

index.ts
```

---

# Responsibilities

RouteMatcher is responsible for

- matching requests against routes
- exposing match results
- exposing matching strategies
- exposing matcher metadata
- remaining provider independent

RouteMatcher is NOT responsible for

- endpoint resolution
- controller execution
- middleware
- networking
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

 Route Match

        │

        ▼

 Route Resolver
```

---

# Public API

```ts
interface RouteMatcher {
  match(route: Route, context: HttpContext): RouteMatchResult;
}
```

---

# Supported Matching Strategies

Matching

- Exact Match
- Prefix Match
- Wildcard Match
- Parameter Match
- Regular Expression Match

Future

- Locale Match
- Version Match
- Host Match
- Header Match
- Query Match
- Custom Strategy

---

# Dependency

Depends On

- TASK-001 — Router Core
- TASK-002 — Route
- EPIC-016 — atlas-http

---

# Risk

Critical

RouteMatcher becomes the standardized route matching abstraction across the Atlas Router ecosystem.

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

- [x] RouteMatcher implemented.
- [x] Supports match strategies.
- [x] Supports match results.
- [x] Supports metadata.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable route matching abstractions capable of evaluating routes independently from routing algorithms, runtime environments, and networking implementations.

---

# AI Constraints

Before implementation

- Do not implement RouteResolver.
- Do not implement routing algorithms.
- Do not implement middleware.
- Do not implement controller execution.
- Do not implement networking.
- Focus only on RouteMatcher abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-001-router-core.md
- TASK-002-route.md
- EPIC-016 atlas-http

---

# Next Task

TASK-005-route-parameters.md
