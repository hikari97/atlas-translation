---
id: TASK-0092

title: Implement InputManager

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

# TASK-0092 — Implement InputManager

## Summary

Implement `InputManager`.

InputManager is responsible for receiving platform-independent InputEvents and dispatching them to the active EditorTool.

InputManager coordinates the complete editor input lifecycle while remaining independent from browser APIs.

---

# Capability

After this task is complete, Atlas Studio can process user interaction through a centralized input system.

---

# Goal

Provide centralized input dispatching.

---

# Business Value

Supports:

- Mouse
- Keyboard
- Touch
- Stylus
- Future Gamepad
- Future Accessibility Input

without changing editor tools.

---

# Background

Platform adapters translate native events into InputEvents.

InputManager dispatches those events to the appropriate editor components.

---

# Scope

## Included

- Input dispatch
- Active tool dispatch
- Input lifecycle
- Event routing

## Excluded

- DOM integration
- Gesture recognition
- Rendering
- Browser implementation

---

# Deliverables

```text
packages/
└── atlas-input/
    └── src/
        ├── InputManager.ts
        ├── InputContext.ts
        ├── InputDispatcher.ts
        └── index.ts
```

---

# Responsibilities

InputManager is responsible for:

- receiving InputEvents
- routing events
- dispatching to active EditorTool
- coordinating input lifecycle

InputManager is NOT responsible for:

- rendering
- browser events
- gesture recognition
- command execution

---

# Architecture

```text
Platform Adapter

↓

InputEvent

↓

InputManager

↓

EditorTool

↓

EditorCommand
```

---

# Public API

```ts
interface InputManager {
  dispatch(event: InputEvent): void;
}
```

---

# Input Flow

```text
Mouse

↓

InputAdapter

↓

InputEvent

↓

InputManager

↓

EditorTool
```

---

# Dependency

Depends On

- TASK-0065 — EditorTool
- TASK-0091 — InputEvent

---

# Risk

High

InputManager becomes the centralized input dispatcher for Atlas Studio.

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
apps/**
```

---

# Acceptance Criteria

- [ ] InputManager implemented.
- [ ] Dispatches InputEvents.
- [ ] Routes to active EditorTool.
- [ ] Platform independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio dispatches all user interaction through InputManager.

---

# AI Constraints

Before implementation:

- Do not implement browser adapters.
- Do not implement gesture recognition.
- Do not implement rendering.
- Focus only on input dispatching.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0065-editor-tool.md
- TASK-0091-input-event.md

---

# Next Task

TASK-0093-input-adapter.md
