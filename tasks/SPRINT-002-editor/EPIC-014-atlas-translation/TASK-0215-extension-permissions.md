---
id: TASK-0215

title: Implement ExtensionPermissions

status: Ready

priority: Critical

story_points: 21

sprint: SPRINT-023-extension-platform

epic: EPIC-018

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0215 — Implement ExtensionPermissions

## Summary

Implement `ExtensionPermissions`.

ExtensionPermissions provides a provider-independent permission model for extensions.

Permissions determine which operations an extension may perform against Atlas services after capability grants have been validated.

Permissions are evaluated independently from extension execution.

---

# Capability

After this task is complete, Atlas Translation Platform can authorize extension operations through reusable permission models.

---

# Goal

Provide fine-grained extension authorization.

---

# Business Value

Supports

- Least privilege
- Enterprise governance
- Security auditing
- Extension isolation
- Capability restriction
- Future policy enforcement

without modifying ExtensionRuntime.

---

# Background

Granting access to a service is different from allowing every operation on that service.

ExtensionPermissions provides operation-level authorization while remaining independent from runtime implementation.

---

# Scope

## Included

- Permission model
- Permission evaluation
- Permission metadata
- Permission groups
- Authorization result

## Excluded

- Authentication
- Identity management
- Marketplace
- UI

---

# Deliverables

```text
atlas-translation/

ExtensionPermissions.ts

ExtensionPermissionSet.ts

ExtensionPermissionRule.ts

ExtensionPermissionResult.ts

ExtensionPermissionMetadata.ts

index.ts
```

---

# Responsibilities

ExtensionPermissions is responsible for

- evaluating permissions
- exposing permission metadata
- grouping permissions
- returning authorization results

ExtensionPermissions is NOT responsible for

- authentication
- runtime execution
- marketplace
- UI

---

# Architecture

```text
Extension

↓

ExtensionSandbox

↓

ExtensionPermissions

↓

Atlas Service API
```

---

# Public API

```ts
interface ExtensionPermissions {
  authorize(
    request: ExtensionPermissionRequest,
  ): Promise<ExtensionPermissionResult>;
}
```

---

# Supported Permission Groups

Filesystem

- Read
- Write
- Delete

Network

- HTTP GET
- HTTP POST
- WebSocket

Atlas Services

- AI Inference
- AI Embedding
- Workflow Execution
- Cloud Storage
- Plugin API

Runtime

- Logger
- Configuration
- Local Storage

Future

- Native Modules
- GPU
- External Process

---

# Dependency

Depends On

- TASK-0213 — ExtensionRuntime
- TASK-0214 — ExtensionSandbox

---

# Risk

Critical

ExtensionPermissions becomes the authorization layer for every extension operation.

---

# Files Allowed

```text
atlas-translation/**
```

---

# Files Forbidden

```text
None
```

---

# Acceptance Criteria

- [ ] ExtensionPermissions implemented.
- [ ] Supports fine-grained authorization.
- [ ] Provider independent.
- [ ] Immutable authorization results.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Translation Platform authorizes extension operations through reusable ExtensionPermissions.

---

# AI Constraints

Before implementation

- Do not implement authentication.
- Do not implement user management.
- Do not implement UI.
- Focus only on the ExtensionPermissions abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0213-extension-runtime.md
- TASK-0214-extension-sandbox.md

---

# Next Task

TASK-0216-extension-events.md
