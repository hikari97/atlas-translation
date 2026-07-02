---
id: TASK-0066

title: Implement EditorCommand

status: Ready

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

# TASK-0066 — Implement EditorCommand

## Summary

Implement `EditorCommand`.

EditorCommand represents a single editing operation applied to an EditorDocument.

Every modification to editor data must be represented as an EditorCommand.

EditorCommand is the foundation for undo/redo, macro recording, scripting, automation, and collaboration.

---

# Capability

After this task is complete, Atlas Studio can represent every editing operation as a reusable command.

---

# Goal

Provide a command-based editing architecture.

---

# Business Value

Supports:

- Undo / Redo
- Macro recording
- Automation
- Command history
- Collaboration
- Plugin extensibility

without coupling editing logic to UI or tools.

---

# Background

EditorTool interprets user input.

EditorCommand modifies document state.

Workflow:

Mouse

↓

EditorTool

↓

EditorCommand

↓

CommandExecutor

↓

EditorDocument

---

# Scope

## Included

- Command contract
- Command metadata
- Command context
- Command execution interface

## Excluded

- Undo
- Redo
- Command history
- Rendering
- Input handling

---

# Deliverables

```text
packages/
└── atlas-editor/
    └── src/
        ├── EditorCommand.ts
        ├── CommandContext.ts
        ├── CommandResult.ts
        └── index.ts
```

---

# Responsibilities

EditorCommand is responsible for:

- representing document modifications
- exposing execution behavior
- remaining UI independent

EditorCommand is NOT responsible for:

- rendering
- receiving user input
- storing history
- performing undo

---

# Architecture

```text
EditorTool

↓

EditorCommand

↓

CommandExecutor

↓

EditorDocument
```

---

# Example Commands

Examples:

- MoveObjectCommand
- ResizeObjectCommand
- RotateObjectCommand
- DeleteObjectCommand
- CreateTextCommand
- UpdateTextCommand
- DuplicateObjectCommand
- GroupCommand
- UngroupCommand

---

# Public API

```ts
interface EditorCommand {
  readonly id: string;

  readonly name: string;

  execute(context: CommandContext): CommandResult;
}
```

---

# Command Flow

```text
User Input

↓

EditorTool

↓

EditorCommand

↓

CommandExecutor

↓

EditorDocument Updated
```

---

# Dependency

Depends On

- TASK-0061 — EditorSession
- TASK-0062 — EditorDocument
- TASK-0065 — EditorTool

---

# Risk

High

EditorCommand becomes the only supported mechanism for modifying editor state.

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

- [ ] EditorCommand implemented.
- [ ] Supports command execution.
- [ ] Independent from UI.
- [ ] Independent from rendering.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio represents every document modification using EditorCommand.

---

# AI Constraints

Before implementation:

- Do not implement Undo.
- Do not implement Redo.
- Do not implement rendering.
- Focus only on the command abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0061-editor-session.md
- TASK-0065-editor-tool.md

---

# Next Task

TASK-0067-command-executor.md
