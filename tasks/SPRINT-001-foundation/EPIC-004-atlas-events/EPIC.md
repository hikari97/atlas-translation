# EPIC-004 — atlas-events

Status

Ready

Priority

Critical

Package

atlas-events

---

# Overview

The atlas-events package provides the messaging infrastructure used throughout Atlas Studio.

It enables communication between packages using strongly typed immutable events while remaining completely independent from rendering engines, application frameworks, and editor implementations.

---

# Goals

Provide a reusable event infrastructure that supports communication between all Atlas Studio packages.

---

# Scope

Included

- Event Bus
- Event Dispatch
- Event Subscription
- Event Metadata
- Event Filtering
- Event Priorities
- Event Diagnostics

Excluded

- Rendering
- Networking
- UI
- Browser APIs

---

# Architecture

```text
Publisher

↓

Event Bus

↓

Middleware

↓

Subscribers
```

---

# Milestones

Sprint 1

Foundation

Sprint 2

Dispatch

Sprint 3

Middleware

Sprint 4

Diagnostics

Sprint 5

Performance

---

# Deliverables

- Typed Event Bus
- Immutable Events
- Event Middleware
- Event Diagnostics
- Performance Metrics

---

# Success Criteria

- Immutable
- Thread Safe
- Deterministic
- Extensible
- Framework Independent
