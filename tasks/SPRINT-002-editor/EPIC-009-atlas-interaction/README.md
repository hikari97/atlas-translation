# atlas-interaction

The `atlas-interaction` package provides the interaction layer for Atlas Studio.

It is responsible for translating user input into reusable interaction sessions that can be consumed by other packages such as the editor, renderer, and user interface.

This package is completely independent from rendering, document manipulation, and business logic.

---

## Purpose

The interaction layer provides a consistent abstraction for all user interactions regardless of the originating input device.

Supported interaction domains include:

- Pointer
- Mouse
- Touch
- Keyboard
- Drag & Drop
- Resize
- Gesture
- Accessibility
- Custom interactions

---

## Responsibilities

The package is responsible for:

- Managing interaction lifecycle
- Creating interaction sessions
- Routing interaction events
- Hit testing
- Pointer capture
- Gesture recognition
- Interaction state synchronization
- Accessibility interactions

The package is **not** responsible for:

- Rendering
- Document modification
- Command execution
- Editor business logic
- Workspace management

---

## Package Structure

```text
packages/
└── atlas-interaction/
    └── src/
```

---

## Dependencies

### Depends On

- atlas-foundation
- atlas-core

### Used By

- atlas-ui
- atlas-selection
- atlas-history
- atlas-editor

---

## Interaction Flow

```text
Input Device

↓

Interaction Layer

↓

Interaction Session

↓

Interaction State

↓

Consumer
```

---

## Design Principles

The package follows these principles:

- Framework independent
- Strongly typed
- Immutable public contracts
- Session based
- Event driven
- Accessibility first
- Extensible
- Plugin friendly

---

## Major Components

The package contains:

- Interaction Manager
- Interaction Session
- Interaction State
- Pointer System
- Keyboard System
- Mouse System
- Drag System
- Resize System
- Gesture System

---

## Supported Input Devices

- Mouse
- Touch
- Pen
- Trackpad
- Keyboard
- Assistive Devices

Future devices should be supported without breaking the public API.

---

## Public API

The package exposes reusable interfaces only.

Implementation details remain internal.

---

## Accessibility

Accessibility is a core requirement.

The interaction layer should:

- Support keyboard navigation
- Support assistive technologies
- Respect accessibility preferences
- Preserve focus management

---

## Performance Goals

The interaction layer should:

- Minimize allocations
- Minimize latency
- Support high-frequency events
- Avoid unnecessary state mutation

---

## Related Packages

- atlas-foundation
- atlas-core
- atlas-document
- atlas-renderer
- atlas-ui
- atlas-selection
- atlas-editor
