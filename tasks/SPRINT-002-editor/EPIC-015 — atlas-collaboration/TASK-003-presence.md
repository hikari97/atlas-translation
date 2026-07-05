---
id: TASK-003

title: Implement Presence

status: Completed

priority: Critical

story_points: 13

sprint: SPRINT-002-editor

epic: EPIC-015

package: atlas-collaboration

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-003 — Implement Presence

## Summary

Implement `Presence`.

Presence provides the provider-independent abstraction responsible for representing the availability and connection state of collaboration participants within a collaboration session.

Presence tracks who is currently participating in a session while remaining independent from networking protocols, synchronization strategies, and collaboration providers.

---

# Capability

After this task is complete, Atlas Editor supports standardized participant presence across collaborative editing sessions.

---

# Goal

Provide unified presence abstraction.

---

# Business Value

Supports

- Online participants
- Offline participants
- Participant status
- Session membership
- Shared presence information
- Future distributed collaboration

without coupling presence management to networking implementations.

---

# Background

CollaborationSession establishes a shared editing session.

Presence introduces participant visibility by allowing collaboration services to determine who is currently connected to a session.

Presence only describes participant availability and does not contain editor state such as cursor position or current selection.

---

# Scope

## Included

- Presence abstraction
- Presence registry
- Presence metadata
- Presence lifecycle
- Presence state

## Excluded

- Cursor position
- Selection state
- Awareness
- Synchronization
- Networking
- UI

---

# Deliverables

```text
atlas-collaboration/

Presence.ts

PresenceRegistry.ts

PresenceMetadata.ts

PresenceState.ts

PresenceLifecycle.ts

index.ts
```

---

# Responsibilities

Presence is responsible for

- managing participant presence
- exposing participant status
- maintaining presence lifecycle
- exposing presence metadata
- remaining provider independent

Presence is NOT responsible for

- cursor synchronization
- document synchronization
- transport
- networking
- UI

---

# Architecture

```text
Presence

├── Presence Registry
├── Presence State
├── Presence Metadata
└── Presence Lifecycle

↓

Awareness

↓

Synchronization

↓

Transport
```

---

# Public API

```ts
interface Presence {
  readonly registry: PresenceRegistry;

  readonly lifecycle: PresenceLifecycle;

  readonly state: PresenceState;
}
```

---

# Supported Presence Services

Presence

- Join
- Leave
- Online
- Offline
- Idle

Registry

- Participant Registry
- Presence Lookup

Lifecycle

- Connected
- Disconnected
- Reconnected

Future

- Heartbeat
- Presence Timeout
- Multi-device Presence
- Distributed Presence

---

# Dependency

Depends On

- TASK-001 — Collaboration Core
- TASK-002 — Collaboration Session

---

# Risk

Medium

Presence becomes the standardized participant visibility abstraction across the Atlas Editor collaboration ecosystem.

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

- [ ] Presence implemented.
- [ ] Supports participant lifecycle.
- [ ] Supports participant registry.
- [ ] Provider independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Editor exposes reusable presence abstractions capable of representing collaboration participants independently from transport implementations.

---

# AI Constraints

Before implementation

- Do not implement networking.
- Do not implement synchronization.
- Do not implement WebSocket.
- Do not implement UI.
- Focus only on Presence abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-001-collaboration-core.md
- TASK-002-collaboration-session.md

---

# Next Task

TASK-004-awareness.md
