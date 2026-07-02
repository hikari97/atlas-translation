---
id: TASK-0067

title: Implement CommandExecutor

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

# TASK-0067 — Implement CommandExecutor

## Summary

Implement `CommandExecutor`.

CommandExecutor is responsible for executing EditorCommands against an EditorDocument.

It is the only component allowed to mutate editor state.

CommandExecutor coordinates command execution, validation, history integration, and event publishing.

---

# Capability

After this task is complete, Atlas Studio has a centralized execution engine for all editor commands.

---

# Goal

Provide a single execution point for document mutations.

---

# Business Value

Supports:

- centralized editing
- undo/redo integration
- macro recording
- automation
- scripting
- collaborative editing

without coupling editing logic to UI.

---

# Background

EditorTool produces EditorCommand.

EditorCommand describes the modification.

CommandExecutor performs the modification.

---

# Scope

## Included

- Command execution
- Execution context
- Validation
- Result propagation
- Execution lifecycle

## Excluded

- Undo stack
- Redo stack
- Rendering
- Input handling

---

# Deliverables

```text
packages/
└── atlas-editor/
    └── src/
        ├── CommandExecutor.ts
        ├── CommandExecution.ts
        ├── CommandExecutionResult.ts
        └── index.ts
```

---

# Responsibilities

CommandExecutor is responsible for:

- executing commands
- validating execution
- updating EditorDocument
- returning execution results

CommandExecutor is NOT responsible for:

- rendering
- receiving user input
- selecting tools
- storing projects

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

# Execution Flow

```text
EditorTool

↓

EditorCommand

↓

CommandExecutor

↓

Validation

↓

Execute

↓

Result
```

---

# Public API

```ts
interface CommandExecutor {
  execute(execution: CommandExecution): CommandExecutionResult;
}
```

```ts
interface CommandExecution {
  readonly document: EditorDocument;

  readonly command: EditorCommand;
}
```

---

# Dependency

Depends On

- TASK-0062 — EditorDocument
- TASK-0066 — EditorCommand

---

# Risk

High

Every editor modification passes through CommandExecutor.

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

- [ ] CommandExecutor implemented.
- [ ] Executes EditorCommand.
- [ ] Updates EditorDocument.
- [ ] Returns execution result.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio performs every document modification through CommandExecutor.

---

# AI Constraints

Before implementation:

- Do not implement Undo.
- Do not implement Redo.
- Do not implement rendering.
- Focus only on command execution.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0062-editor-document.md
- TASK-0066-editor-command.md

---

# Next Task

TASK-0068-command-history.md
