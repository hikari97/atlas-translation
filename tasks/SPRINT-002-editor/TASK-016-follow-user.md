---
id: TASK-016

title: Implement Follow User

status: Ready

priority: Medium

story_points: 13

sprint: SPRINT-002-editor

epic: EPIC-015

package: atlas-collaboration

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-016 — Implement Follow User

## Summary

Implement `FollowUser`.

FollowUser provides the provider-independent abstraction responsible for synchronizing a participant's editor perspective with another collaboration participant.

The follow user abstraction enables participants to observe another participant's editing activity by following their navigation state while remaining independent from rendering engines, networking protocols, synchronization strategies, and collaboration providers.

---

# Capability

After this task is complete, Atlas Editor supports standardized participant following during collaborative editing sessions.

---

# Goal

Provide unified follow user abstraction.

---

# Business Value

Supports

- Live presentation
- Pair editing
- Collaborative learning
- Guided document review
- Provider independence
- Future collaborative presentation mode

without coupling participant following to rendering or networking implementations.

---

# Background

Awareness exposes participant editor state.

FollowUser allows one participant to synchronize their editor perspective with another participant without affecting document ownership or editing permissions.

The feature only defines the abstraction and intentionally excludes viewport synchronization implementations.

---

# Scope

## Included

- Follow abstraction
- Follow registry
- Follow metadata
- Follow lifecycle
- Follow state

## Excluded

- Viewport synchronization
- Camera synchronization
- Rendering
- Networking
- UI

---

# Deliverables

```text
atlas-collaboration/

FollowUser.ts

FollowRegistry.ts

FollowState.ts

FollowMetadata.ts

FollowLifecycle.ts

index.ts
```

---

# Responsibilities

FollowUser is responsible for

- managing follow relationships
- exposing follow metadata
- managing follow lifecycle
- exposing follow state
- remaining provider independent

FollowUser is NOT responsible for

- viewport synchronization
- camera movement
- networking
- rendering
- UI

---

# Architecture

```text
Follow User

├── Follow Registry
├── Follow State
├── Follow Metadata
└── Follow Lifecycle

↓

Viewport Provider

↓

Renderer
```

---

# Public API

```ts
interface FollowUser {
  readonly registry: FollowRegistry;

  readonly lifecycle: FollowLifecycle;

  readonly state: FollowState;
}
```

---

# Supported Follow Services

Follow

- Follow Participant
- Stop Following
- Current Target

State

- Active
- Suspended
- Stopped

Lifecycle

- Start
- Pause
- Resume
- Stop

Future

- Presenter Mode
- Team Follow
- Group Follow
- Collaborative Walkthrough

---

# Dependency

Depends On

- TASK-003 — Presence
- TASK-004 — Awareness
- TASK-005 — Collaboration User

---

# Risk

Low

FollowUser becomes the standardized participant-following abstraction across the Atlas Editor collaboration ecosystem.

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

- [ ] FollowUser implemented.
- [ ] Supports follow lifecycle.
- [ ] Supports follow registry.
- [ ] Provider independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Editor exposes reusable follow abstractions capable of representing participant-following independently from rendering, networking, and viewport synchronization implementations.

---

# AI Constraints

Before implementation

- Do not implement viewport synchronization.
- Do not implement networking.
- Do not implement rendering.
- Do not implement UI.
- Focus only on FollowUser abstraction.

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

TASK-017-collaboration-permissions.md
