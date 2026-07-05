---
id: TASK-0158

title: Implement CollaborationPresence

status: Completed

priority: Critical

story_points: 21

sprint: SPRINT-017-collaboration-system

epic: EPIC-014

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0158 — Implement CollaborationPresence

## Summary

Implement `CollaborationPresence`.

CollaborationPresence represents the real-time state of participants within an active collaboration session.

Presence provides a transport-independent model for user activity, cursor location, viewport information, selection state, and availability.

Presence is immutable and observable.

---

# Capability

After this task is complete, Atlas Translation Platform can expose standardized participant presence information across collaboration providers.

---

# Goal

Provide reusable participant presence management.

---

# Business Value

Supports

- Active participant list
- Cursor sharing
- Selection sharing
- Viewport synchronization
- User status
- Future live editing indicators

without modifying CollaborationProviders.

---

# Background

Modern collaborative editors require awareness of other participants.

Rather than exposing provider-specific implementations, Atlas Translation Platform exposes a unified CollaborationPresence model.

---

# Scope

## Included

- Presence model
- Participant state
- Cursor state
- Selection state
- Viewport state

## Excluded

- Networking
- Conflict resolution
- Rendering
- UI

---

# Deliverables

```text
atlas-translation/

CollaborationPresence.ts

ParticipantPresence.ts

CursorPresence.ts

SelectionPresence.ts

ViewportPresence.ts

PresenceStatus.ts

index.ts
```

---

# Responsibilities

CollaborationPresence is responsible for

- exposing participant state
- exposing cursor position
- exposing current selection
- exposing viewport information
- exposing availability

CollaborationPresence is NOT responsible for

- rendering cursors
- networking
- synchronization
- UI

---

# Architecture

```text
Participant

↓

CollaborationPresence

↓

Editor

↓

Plugin

↓

Diagnostics
```

---

# Public API

```ts
interface CollaborationPresence {
  readonly participants: readonly ParticipantPresence[];
}
```

---

# Participant Information

Supports

- User ID
- Display Name
- Presence Status
- Cursor Position
- Current Selection
- Viewport
- Last Activity Time

---

# Presence States

- Online
- Offline
- Away
- Busy
- Synchronizing

---

# Dependency

Depends On

- TASK-0152 — CollaborationManager
- TASK-0155 — CollaborationEvents

---

# Risk

High

CollaborationPresence becomes the foundation for every collaborative user experience.

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

- [ ] CollaborationPresence implemented.
- [ ] Immutable.
- [ ] Supports multiple participants.
- [ ] Transport independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Translation Platform exposes standardized participant presence through CollaborationPresence.

---

# AI Constraints

Before implementation

- Do not implement networking.
- Do not implement rendering.
- Do not implement synchronization.
- Focus only on the CollaborationPresence model.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0152-collaboration-manager.md
- TASK-0155-collaboration-events.md

---

# Next Task

TASK-0159-collaboration-session.md
