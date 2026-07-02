# atlas-events

Atlas Events provides the event infrastructure used throughout Atlas Studio.

The package defines a lightweight, strongly typed, framework-independent event system that enables communication between independent packages while maintaining loose coupling.

The package contains no rendering logic, editor behavior, browser-specific APIs, or application logic.

---

## Goals

- Event-driven architecture
- Strong typing
- Immutable event payloads
- Framework independent
- Plugin friendly
- Deterministic event dispatch

---

## Features

- Event Bus
- Event Publisher
- Event Subscriber
- Event Listener
- Event Middleware
- Event Priority
- Event Filtering
- Event Diagnostics

---

## Package Structure

```text
packages/

atlas-events/

src/
```

---

## Design Principles

- Immutable
- Event Driven
- Framework Independent
- Strongly Typed
- Extensible
- Predictable

---

## Package Dependencies

This package should not depend on:

- atlas-renderer
- atlas-ui
- atlas-editor

Other packages may depend on atlas-events.

---

## Current Epic

EPIC-004 — atlas-events

Status

In Progress
