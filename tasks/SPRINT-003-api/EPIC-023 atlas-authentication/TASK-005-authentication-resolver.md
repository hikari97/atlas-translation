---
id: TASK-005

title: Implement Authentication Resolver

status: Completed

priority: Critical

story_points: 34

sprint: SPRINT-003-api

epic: EPIC-023

package: atlas-authentication

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-005 — Implement Authentication Resolver

## Summary

Implement `AuthenticationResolver`.

AuthenticationResolver provides the provider-independent abstraction responsible for resolving authentication strategies from AuthenticationRegistry based on the supplied AuthenticationContext.

Rather than authenticating identities directly, the resolver determines the most appropriate authentication strategy capable of processing the current authentication request while remaining independent from runtime environments, networking implementations, dependency injection frameworks, and transport protocols.

---

# Capability

After this task is complete, Atlas provides reusable authentication strategy resolution shared across all runtime providers.

---

# Goal

Provide unified authentication strategy resolution.

---

# Business Value

Supports

- Strategy resolution
- Multiple authentication schemes
- Extensible authentication
- Runtime independence
- Provider independence

without coupling Atlas Authentication to runtime-specific authentication mechanisms.

---

# Background

Applications commonly support multiple authentication mechanisms simultaneously.

AuthenticationResolver selects the appropriate strategy according to the supplied AuthenticationContext.

---

# Scope

## Included

- Strategy resolution
- Scheme resolution
- Descriptor lookup
- Resolution metadata
- Resolution lifecycle

## Excluded

- Credential verification
- Session creation
- Token generation
- Authorization
- Dependency Injection
- Networking
- UI

---

# Deliverables

```text
atlas-authentication/

AuthenticationResolver.ts

AuthenticationResolution.ts

AuthenticationResolverMetadata.ts

AuthenticationResolverLifecycle.ts

AuthenticationScheme.ts

index.ts
```

---

# Responsibilities

AuthenticationResolver is responsible for

- resolving authentication strategies
- selecting authentication scheme
- exposing resolution metadata
- managing resolver lifecycle
- remaining provider independent

AuthenticationResolver is NOT responsible for

- verifying credentials
- generating tokens
- session management
- authorization
- dependency injection
- networking
- UI

---

# Architecture

```text
AuthenticationRegistry

        │

        ▼

AuthenticationResolver

├── Scheme Resolution
├── Descriptor Lookup
├── Metadata
└── Lifecycle

        │

        ▼

Authentication Strategy

        │

        ▼

AuthenticationEngine
```

---

# Public API

```ts
interface AuthenticationResolver {
  resolve(context: AuthenticationContext): Authentication;

  supports(context: AuthenticationContext): boolean;
}
```

---

# Supported Resolution

Resolution

- Bearer
- Basic
- API Key
- Anonymous

Strategy

- Named Strategy
- Scheme Strategy

Future

- OAuth2
- OpenID Connect
- LDAP
- Certificate
- Passkey
- WebAuthn

---

# Dependency

Depends On

- TASK-002 — Authentication Interface
- TASK-004 — Authentication Registry

---

# Risk

Critical

AuthenticationResolver becomes the standardized authentication strategy resolver across the Atlas ecosystem.

---

# Files Allowed

```text
atlas-authentication/**
```

---

# Files Forbidden

```text
None
```

---

# Acceptance Criteria

- [x] AuthenticationResolver implemented.
- [x] Supports strategy resolution.
- [x] Supports scheme resolution.
- [x] Supports metadata.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes a reusable authentication resolver capable of resolving authentication strategies independently from runtime environments and transport protocols.

---

# AI Constraints

Before implementation

- Do not implement authentication.
- Do not implement session management.
- Do not implement dependency injection.
- Do not implement networking.
- Focus only on AuthenticationResolver abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-002-authentication-interface.md
- TASK-004-authentication-registry.md

---

# Next Task

TASK-006-authentication-credential.md
