---
id: TASK-0069

title: Implement UndoRedoManager

status: Completed

priority: Critical

story_points: 13

sprint: SPRINT-008-editor-foundation

epic: EPIC-014

package: atlas-editor

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0069 — Implement UndoRedoManager

## Summary

Implement `UndoRedoManager`.

UndoRedoManager manages undo and redo operations for EditorCommands executed during an EditorSession.

UndoRedoManager does not execute commands directly.

Command execution remains the responsibility of CommandExecutor.

---

# Capability

After this task is complete, Atlas Studio can undo and redo editor operations consistently.

---

# Goal

Provide centralized undo/redo management.

---

# Business Value

Supports:

- unlimited undo
- redo
- macro editing
- reliable editing workflow
- future collaborative editing

without coupling history to execution.

---

# Background

Every successful EditorCommand is recorded in CommandHistory.

UndoRedoManager navigates through that history.

Workflow

EditorCommand

↓

CommandExecutor

↓

CommandHistory

↓

UndoRedoManager

---

# Scope

## Included

- Undo
- Redo
- History cursor
- Availability state

## Excluded

- Command execution
- Command history storage
- Rendering
- Clipboard

---

# Deliverables

```text
packages/
└── atlas-editor/
    └── src/
        ├── UndoRedoManager.ts
        ├── UndoRedoState.ts
        └── index.ts
```

---

# Responsibilities

UndoRedoManager is responsible for:

- tracking current history position
- determining undo availability
- determining redo availability
- coordinating undo/redo requests

UndoRedoManager is NOT responsible for:

- executing commands
- storing command history
- rendering
- receiving user input

---

# Architecture

```text
EditorCommand

↓

CommandExecutor

↓

CommandHistory

↓

UndoRedoManager
```

---

# Public API

```ts
interface UndoRedoManager {
  canUndo(): boolean;

  canRedo(): boolean;

  undo(): void;

  redo(): void;
}
```

---

# Undo/Redo Flow

```text
Command Executed

↓

CommandHistory

↓

History Cursor

↓

Undo

↓

Redo
```

---

# Dependency

Depends On

- TASK-0067 — CommandExecutor
- TASK-0068 — CommandHistory

---

# Risk

High

Undo/Redo is fundamental to all editor interactions.

---

# Files Allowed

```text
packages/atlas-editor/src/**
```

---

# Files Forbidden

```text
packages/atlas-project/**
packages/atlas-translation/**
apps/**
```

---

# Acceptance Criteria

- [ ] UndoRedoManager implemented.
- [ ] Supports undo.
- [ ] Supports redo.
- [ ] Maintains history cursor.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio supports reliable undo and redo operations independently from CommandHistory.

---

# AI Constraints

Before implementation:

- Do not implement rendering.
- Do not modify CommandHistory.
- Do not implement UI shortcuts.
- Focus only on undo/redo management.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0067-command-executor.md
- TASK-0068-command-history.md

---

# Next Task

TASK-0070-editor-events.md
