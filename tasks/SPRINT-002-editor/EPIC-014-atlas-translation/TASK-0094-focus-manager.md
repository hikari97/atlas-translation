---
id: TASK-0094

title: Implement FocusManager

status: Ready

priority: High

story_points: 13

sprint: SPRINT-011-input-system

epic: EPIC-014

package: atlas-input

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0094 — Implement FocusManager

## Summary

Implement `FocusManager`.

FocusManager tracks and manages the active input target within Atlas Studio.

Only the currently focused target receives keyboard and pointer events requiring focus.

FocusManager is platform-independent.

---

# Capability

After this task is complete, Atlas Studio can consistently route focus-sensitive input across editor components.

---

# Goal

Provide centralized focus management.

---

# Business Value

Supports:

- Multiple editor windows
- Dockable panels
- Text editing
- Keyboard shortcuts
- Floating dialogs
- Future accessibility

---

# Background

Not every input event should reach the active EditorTool.

Focus determines where keyboard and text input are delivered.

---

# Scope

## Included

- Focus tracking
- Active target
- Focus transfer
- Focus lifecycle

## Excluded

- Rendering
- DOM focus
- Window management
- Accessibility implementation

---

# Deliverables

```text
packages/
└── atlas-input/
    └── src/
        ├── FocusManager.ts
        ├── FocusTarget.ts
        ├── FocusState.ts
        └── index.ts
```

---

# Responsibilities

FocusManager is responsible for:

- tracking focused target
- changing focus
- exposing focus state
- notifying focus changes

FocusManager is NOT responsible for:

- rendering
- browser focus
- dispatching input
- editor commands

---

# Architecture

```text
InputEvent

↓

FocusManager

↓

Focused Target

↓

InputManager
```

---

# Public API

```ts
interface FocusManager {
  readonly focusedTarget: FocusTarget | undefined;

  focus(target: FocusTarget): void;

  blur(): void;
}
```

---

# Supported Focus Targets

- Editor
- Canvas
- TextObject
- Dialog
- Panel
- Overlay

---

# Focus Lifecycle

```text
Blur

↓

Focus Requested

↓

Focus Granted

↓

Focused

↓

Blur
```

---

# Dependency

Depends On

- TASK-0091 — InputEvent
- TASK-0092 — InputManager

---

# Risk

Medium

FocusManager ensures input is delivered to the correct runtime target.

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

- [ ] FocusManager implemented.
- [ ] Tracks active focus target.
- [ ] Supports focus transfer.
- [ ] Platform independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio routes focus-sensitive input through FocusManager.

---

# AI Constraints

Before implementation:

- Do not implement DOM focus.
- Do not implement browser APIs.
- Do not implement accessibility.
- Focus only on focus management.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0091-input-event.md
- TASK-0092-input-manager.md
- TASK-0093-input-adapter.md

---

# Next Task

TASK-0095-shortcut-manager.md
