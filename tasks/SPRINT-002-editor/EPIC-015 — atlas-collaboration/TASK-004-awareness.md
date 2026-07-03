---
id: TASK-004

title: Implement Awareness

status: Ready

priority: Critical

story_points: 21

sprint: SPRINT-002-editor

epic: EPIC-015

package: atlas-collaboration

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-004 — Implement Awareness

## Summary

Implement `Awareness`.

Awareness provides the provider-independent abstraction responsible for representing the real-time editor state of collaboration participants within a collaboration session.

Unlike Presence, which only indicates participant availability, Awareness describes what participants are currently doing inside the editor by exposing their editor state while remaining independent from networking protocols, synchronization algorithms, and collaboration providers.

---

# Capability

After this task is complete, Atlas Editor supports standardized real-time participant awareness for collaborative editing.

---

# Goal

Provide unified awareness abstraction.

---

# Business Value

Supports

- Remote cursor
- Remote selection
- Viewport synchronization
- Active tool indication
- Typing indicators
- Future collaborative editing features

without coupling awareness management to transport implementations.

---

# Background

Presence identifies who is currently participating.

Awareness extends collaboration by exposing participant editor state.

Awareness does not synchronize document changes. It only represents transient editor state that may change frequently during editing.

---

# Scope

## Included

- Awareness abstraction
- Awareness registry
- Awareness state
- Awareness metadata
- Awareness lifecycle

## Excluded

- Document synchronization
- CRDT
- Operational Transform
- Networking
- UI

---

# Deliverables

```text
atlas-collaboration/

Awareness.ts

AwarenessRegistry.ts

AwarenessState.ts

AwarenessMetadata.ts

AwarenessLifecycle.ts

index.ts
```

---

# Responsibilities

Awareness is responsible for

- managing participant awareness
- exposing editor state
- managing awareness lifecycle
- exposing awareness metadata
- remaining provider independent

Awareness is NOT responsible for

- document synchronization
- networking
- transport
- conflict resolution
- UI

---

# Architecture

```text
Awareness

├── Awareness Registry
├── Awareness State
├── Awareness Metadata
└── Awareness Lifecycle

↓

Remote Cursor

↓

Remote Selection

↓

Shared Viewport

↓

Synchronization
```

---

# Public API

```ts
interface Awareness {
  readonly registry: AwarenessRegistry;

  readonly lifecycle: AwarenessLifecycle;

  readonly state: AwarenessState;
}
```

---

# Supported Awareness Services

Editor State

- Cursor Position
- Selection Range
- Viewport
- Active Tool
- Typing Indicator

Registry

- Participant Awareness
- Awareness Lookup

Lifecycle

- Update
- Reset
- Remove

Future

- Shared Viewport
- Shared Zoom
- Shared Scroll Position
- Collaborative Editing Indicators

---

# Dependency

Depends On

- TASK-001 — Collaboration Core
- TASK-002 — Collaboration Session
- TASK-003 — Presence

---

# Risk

Medium

Awareness becomes the standardized real-time editor state abstraction across the Atlas Editor collaboration ecosystem.

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

- [ ] Awareness implemented.
- [ ] Supports participant editor state.
- [ ] Supports awareness lifecycle.
- [ ] Provider independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Editor exposes reusable awareness abstractions capable of representing participant editor state independently from networking and synchronization implementations.

---

# AI Constraints

Before implementation

- Do not implement networking.
- Do not implement synchronization.
- Do not implement CRDT.
- Do not implement Operational Transform.
- Do not implement UI.
- Focus only on Awareness abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-001-collaboration-core.md
- TASK-002-collaboration-session.md
- TASK-003-presence.md

---

# Next Task

TASK-005-collaboration-user.md
