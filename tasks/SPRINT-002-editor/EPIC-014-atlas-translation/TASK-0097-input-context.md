---
id: TASK-0097

title: Implement InputContext

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

# TASK-0097 — Implement InputContext

## Summary

Implement `InputContext`.

InputContext represents the immutable runtime snapshot available while processing an InputEvent or GestureEvent.

It aggregates all information required by EditorTools without requiring direct access to editor services.

InputContext is recreated for every input processing cycle.

---

# Capability

After this task is complete, Atlas Studio can process editor input using a consistent immutable runtime context.

---

# Goal

Provide a unified input execution context.

---

# Business Value

Supports:

- deterministic tool behavior
- simplified testing
- plugin isolation
- multi-window editors
- collaborative editing
- replayable input sessions

---

# Background

EditorTools require access to editor runtime information.

Instead of querying multiple services directly, InputContext provides a complete immutable snapshot.

---

# Scope

## Included

- Context contract
- Active document
- Active viewport
- Active selection
- Focus target
- Current gesture
- Current input event

## Excluded

- Rendering
- Command execution
- Scene traversal
- Service lookup

---

# Deliverables

```text
packages/
└── atlas-input/
    └── src/
        ├── InputContext.ts
        ├── ContextSnapshot.ts
        └── index.ts
```

---

# Responsibilities

InputContext is responsible for:

- exposing runtime editor state
- exposing current input
- exposing current gesture
- remaining immutable

InputContext is NOT responsible for:

- executing commands
- rendering
- hit testing
- modifying editor state

---

# Architecture

```text
InputManager

↓

InputContext

↓

EditorTool

↓

EditorCommand
```

---

# Public API

```ts
interface InputContext {
  readonly event: InputEvent;

  readonly gesture?: GestureSession;

  readonly editorSession: EditorSession;

  readonly document: EditorDocument;

  readonly viewport: EditorViewport;

  readonly selection: EditorSelection;

  readonly focusedTarget?: FocusTarget;
}
```

---

# Context Features

Supports:

- Active document
- Active viewport
- Active selection
- Active gesture
- Current input event
- Focus state

---

# Dependency

Depends On

- TASK-0061 — EditorSession
- TASK-0062 — EditorDocument
- TASK-0063 — EditorViewport
- TASK-0064 — EditorSelection
- TASK-0091 — InputEvent
- TASK-0094 — FocusManager
- TASK-0096 — GestureManager

---

# Risk

Medium

InputContext becomes the unified runtime context for all editor interaction.

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

- [ ] InputContext implemented.
- [ ] Immutable.
- [ ] Serializable where appropriate.
- [ ] Exposes runtime editor snapshot.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio processes all editor interaction using immutable InputContext instances.

---

# AI Constraints

Before implementation:

- Do not implement rendering.
- Do not implement service lookup.
- Do not implement command execution.
- Focus only on the InputContext model.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0061-editor-session.md
- TASK-0091-input-event.md
- TASK-0096-gesture-manager.md

---

# Next Task

TASK-0098-input-events.md
