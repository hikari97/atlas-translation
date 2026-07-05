---
id: TASK-0091

title: Implement InputEvent

status: Completed

priority: Critical

story_points: 13

sprint: SPRINT-011-input-system

epic: EPIC-014

package: atlas-input

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0091 — Implement InputEvent

## Summary

Implement `InputEvent`.

InputEvent represents a platform-independent user input event.

Every input source (mouse, keyboard, touch, stylus) is translated into InputEvents before reaching the editor.

InputEvent never references browser APIs.

---

# Capability

After this task is complete, Atlas Studio can process user interaction independently from platform-specific input systems.

---

# Goal

Provide a unified input model.

---

# Business Value

Supports:

- Browser
- Electron
- Desktop
- Touch devices
- Pen tablet
- Future mobile

without changing EditorTool implementations.

---

# Background

Different platforms expose different input APIs.

Atlas Studio normalizes all of them into InputEvents.

---

# Scope

## Included

- Input event contract
- Event metadata
- Event timestamp
- Pointer position
- Modifier keys

## Excluded

- Input dispatch
- DOM events
- Gesture recognition
- Tool handling

---

# Deliverables

```text
packages/
└── atlas-input/
    └── src/
        ├── InputEvent.ts
        ├── InputEventType.ts
        ├── ModifierKeys.ts
        └── index.ts
```

---

# Responsibilities

InputEvent is responsible for:

- describing user input
- remaining platform independent
- exposing immutable input metadata

InputEvent is NOT responsible for:

- dispatching
- tool execution
- rendering
- browser integration

---

# Architecture

```text
Mouse

↓

Touch

↓

Keyboard

↓

Stylus

↓

InputEvent

↓

EditorTool
```

---

# Public API

```ts
interface InputEvent {
  readonly id: string;

  readonly type: InputEventType;

  readonly timestamp: Date;

  readonly position: Point2D;

  readonly modifiers: ModifierKeys;
}
```

---

# Supported Input Types

- PointerDown
- PointerMove
- PointerUp
- PointerEnter
- PointerLeave
- Wheel
- KeyDown
- KeyUp
- DoubleClick
- ContextMenu

---

# Dependency

Depends On

- TASK-0065 — EditorTool
- TASK-0088 — HitTestEngine

---

# Risk

High

InputEvent becomes the standard interaction model across every platform.

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

- [ ] InputEvent implemented.
- [ ] Immutable.
- [ ] Serializable.
- [ ] Platform independent.
- [ ] Supports pointer and keyboard events.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio processes all user interaction through platform-independent InputEvents.

---

# AI Constraints

Before implementation:

- Do not implement DOM integration.
- Do not implement touch gestures.
- Do not implement event dispatching.
- Focus only on the InputEvent model.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0065-editor-tool.md
- TASK-0088-hit-test.md

---

# Next Task

TASK-0092-input-manager.md
