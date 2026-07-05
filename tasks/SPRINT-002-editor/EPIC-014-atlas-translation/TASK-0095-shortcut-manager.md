---
id: TASK-0095

title: Implement ShortcutManager

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

# TASK-0095 — Implement ShortcutManager

## Summary

Implement `ShortcutManager`.

ShortcutManager is responsible for recognizing keyboard shortcuts and translating them into EditorCommands.

ShortcutManager is platform-independent and operates before EditorTool processing.

---

# Capability

After this task is complete, Atlas Studio can execute keyboard shortcuts consistently across every supported platform.

---

# Goal

Provide centralized shortcut handling.

---

# Business Value

Supports:

- Undo
- Redo
- Copy
- Paste
- Delete
- Save
- Custom shortcuts
- Plugin shortcuts

without coupling shortcuts to editor tools.

---

# Background

Keyboard shortcuts are global editor interactions.

They should not be implemented individually inside every EditorTool.

---

# Scope

## Included

- Shortcut registration
- Shortcut lookup
- Shortcut execution
- Shortcut context

## Excluded

- Browser keyboard events
- Command execution
- Rendering
- UI menus

---

# Deliverables

```text
packages/
└── atlas-input/
    └── src/
        ├── ShortcutManager.ts
        ├── ShortcutDefinition.ts
        ├── ShortcutContext.ts
        ├── ShortcutScope.ts
        └── index.ts
```

---

# Responsibilities

ShortcutManager is responsible for:

- registering shortcuts
- resolving key combinations
- creating EditorCommands
- supporting shortcut scopes

ShortcutManager is NOT responsible for:

- executing commands
- rendering
- browser APIs
- tool interactions

---

# Architecture

```text
Keyboard Input

↓

InputManager

↓

ShortcutManager

↓

EditorCommand

↓

CommandExecutor
```

---

# Public API

```ts
interface ShortcutManager {
  register(shortcut: ShortcutDefinition): void;

  resolve(event: KeyboardInputEvent): EditorCommand | undefined;
}
```

---

# Supported Shortcuts

Minimum shortcuts:

- Ctrl+Z
- Ctrl+Shift+Z
- Ctrl+Y
- Ctrl+C
- Ctrl+V
- Ctrl+X
- Ctrl+A
- Delete
- Escape
- Ctrl+S

---

# Supported Scopes

- Global
- Editor
- Text Editing
- Dialog
- Plugin

---

# Dependency

Depends On

- TASK-0066 — EditorCommand
- TASK-0091 — InputEvent
- TASK-0092 — InputManager
- TASK-0094 — FocusManager

---

# Risk

Medium

ShortcutManager centralizes keyboard shortcut handling across Atlas Studio.

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

- [ ] ShortcutManager implemented.
- [ ] Supports shortcut registration.
- [ ] Supports shortcut scopes.
- [ ] Produces EditorCommands.
- [ ] Platform independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio resolves keyboard shortcuts into EditorCommands using ShortcutManager.

---

# AI Constraints

Before implementation:

- Do not execute commands.
- Do not implement browser keyboard listeners.
- Do not implement menu integration.
- Focus only on shortcut resolution.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0066-editor-command.md
- TASK-0091-input-event.md
- TASK-0092-input-manager.md
- TASK-0094-focus-manager.md

---

# Next Task

TASK-0096-gesture-manager.md
