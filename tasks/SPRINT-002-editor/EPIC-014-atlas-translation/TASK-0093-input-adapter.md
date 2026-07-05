---
id: TASK-0093

title: Implement InputAdapter

status: Completed

priority: Critical

story_points: 21

sprint: SPRINT-011-input-system

epic: EPIC-014

package: atlas-input

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0093 — Implement InputAdapter

## Summary

Implement `InputAdapter`.

InputAdapter converts platform-specific input events into platform-independent InputEvents.

InputAdapter is the only component allowed to interact with platform event systems.

---

# Capability

After this task is complete, Atlas Studio can support multiple platforms without modifying the input engine.

---

# Goal

Provide platform abstraction.

---

# Business Value

Supports:

- Browser
- Electron
- Desktop
- Mobile
- Pen Tablet
- Future platforms

without changing InputManager.

---

# Background

Every platform exposes different event systems.

InputAdapter normalizes them.

Example

DOM MouseEvent

↓

BrowserInputAdapter

↓

InputEvent

↓

InputManager

---

# Scope

## Included

- Adapter contract
- Platform conversion
- Event normalization
- Coordinate conversion

## Excluded

- Input dispatch
- Rendering
- Gesture recognition
- Tool execution

---

# Deliverables

```text
packages/
└── atlas-input/
    └── src/
        ├── InputAdapter.ts
        ├── BrowserInputAdapter.ts
        ├── AdapterContext.ts
        └── index.ts
```

---

# Responsibilities

InputAdapter is responsible for:

- reading platform events
- normalizing coordinates
- converting native events
- producing InputEvents

InputAdapter is NOT responsible for:

- dispatching
- rendering
- gesture recognition
- editor tools

---

# Architecture

```text
Native Event

↓

InputAdapter

↓

InputEvent

↓

InputManager
```

---

# Public API

```ts
interface InputAdapter {
  adapt(nativeEvent: unknown): InputEvent;
}
```

---

# Supported Adapters

Minimum adapters:

- BrowserInputAdapter
- ElectronInputAdapter
- HeadlessInputAdapter

Future:

- ReactNativeInputAdapter
- WPFInputAdapter
- MAUIInputAdapter

---

# Dependency

Depends On

- TASK-0091 — InputEvent
- TASK-0092 — InputManager

---

# Risk

Medium

InputAdapter isolates every platform dependency from Atlas Studio.

---

# Files Allowed

```text
packages/atlas-input/src/**
```

---

# Files Forbidden

```text
packages/atlas-editor/**
packages/atlas-renderer/**
packages/atlas-project/**
```

---

# Acceptance Criteria

- [ ] InputAdapter implemented.
- [ ] Produces InputEvent.
- [ ] Platform independent contract.
- [ ] Browser adapter defined.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio converts native platform events into InputEvents using interchangeable InputAdapters.

---

# AI Constraints

Before implementation:

- Do not implement DOM listeners.
- Do not implement rendering.
- Do not implement gestures.
- Focus only on adapter abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0091-input-event.md
- TASK-0092-input-manager.md

---

# Next Task

TASK-0094-focus-manager.md
