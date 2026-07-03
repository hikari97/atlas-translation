---
id: TASK-009

title: Implement Remote Cursor

status: Ready

priority: High

story_points: 13

sprint: SPRINT-002-editor

epic: EPIC-015

package: atlas-collaboration

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-009 — Implement Remote Cursor

## Summary

Implement `RemoteCursor`.

RemoteCursor provides the provider-independent abstraction responsible for representing the cursor position of remote collaboration participants within the Atlas Editor.

The remote cursor abstraction standardizes how participant cursor information is represented, updated, and consumed while remaining independent from networking protocols, synchronization strategies, rendering implementations, and collaboration providers.

---

# Capability

After this task is complete, Atlas Editor supports standardized remote cursor abstractions for collaborative editing.

---

# Goal

Provide unified remote cursor abstraction.

---

# Business Value

Supports

- Remote cursor visualization
- Multi-user editing
- Participant navigation
- Future collaborative editing features
- Provider independence

without coupling cursor management to networking or rendering implementations.

---

# Background

Awareness exposes participant editor state.

RemoteCursor specializes awareness by representing the logical cursor location for each collaboration participant.

Rendering remote cursors is intentionally outside the scope of this task.

---

# Scope

## Included

- Remote cursor abstraction
- Cursor registry
- Cursor metadata
- Cursor state
- Cursor lifecycle

## Excluded

- Cursor rendering
- Cursor animation
- Networking
- Synchronization
- UI

---

# Deliverables

```text
atlas-collaboration/

RemoteCursor.ts

RemoteCursorRegistry.ts

RemoteCursorState.ts

RemoteCursorMetadata.ts

RemoteCursorLifecycle.ts

index.ts
```

---

# Responsibilities

RemoteCursor is responsible for

- representing remote cursor state
- managing cursor lifecycle
- exposing cursor metadata
- exposing cursor registry
- remaining provider independent

RemoteCursor is NOT responsible for

- rendering cursors
- document synchronization
- networking
- UI

---

# Architecture

```text
Remote Cursor

├── Cursor Registry
├── Cursor State
├── Cursor Metadata
└── Cursor Lifecycle

↓

Remote Selection

↓

Cursor Renderer
```

---

# Public API

```ts
interface RemoteCursor {
  readonly registry: RemoteCursorRegistry;

  readonly lifecycle: RemoteCursorLifecycle;

  readonly state: RemoteCursorState;
}
```

---

# Supported Cursor Services

Cursor

- Cursor Position
- Cursor Visibility
- Cursor Identity

Registry

- Participant Cursor Registry
- Cursor Lookup

Lifecycle

- Create
- Update
- Remove

Future

- Cursor Labels
- Cursor Color
- Cursor Avatar
- Multi-cursor Support

---

# Dependency

Depends On

- TASK-003 — Presence
- TASK-004 — Awareness
- TASK-005 — Collaboration User

---

# Risk

Medium

RemoteCursor becomes the standardized cursor abstraction across the Atlas Editor collaboration ecosystem.

---

# Files Allowed

```text
atlas-collaboration/**
```

---

# Files Forbidden

```text
None
```

---

# Acceptance Criteria

- [ ] RemoteCursor implemented.
- [ ] Supports cursor lifecycle.
- [ ] Supports participant cursor registry.
- [ ] Provider independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Editor exposes reusable remote cursor abstractions capable of representing participant cursor positions independently from rendering and networking implementations.

---

# AI Constraints

Before implementation

- Do not implement cursor rendering.
- Do not implement networking.
- Do not implement synchronization.
- Do not implement UI.
- Focus only on RemoteCursor abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-003-presence.md
- TASK-004-awareness.md
- TASK-005-collaboration-user.md

---

# Next Task

TASK-010-remote-selection.md
