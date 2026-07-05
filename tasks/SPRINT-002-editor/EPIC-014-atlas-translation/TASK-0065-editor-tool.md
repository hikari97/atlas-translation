---
id: TASK-0065

title: Implement EditorTool

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

# TASK-0065 — Implement EditorTool

## Summary

Implement `EditorTool`.

EditorTool represents the active interaction mode within an EditorSession.

An EditorTool processes user input and produces editing operations without directly modifying the underlying project model.

EditorTool is runtime-only.

---

# Capability

After this task is complete, Atlas Studio can switch between different editing tools while maintaining a consistent interaction model.

---

# Goal

Provide a reusable editor tool abstraction.

---

# Business Value

Supports:

- Pointer Tool
- Text Tool
- Selection Tool
- Hand Tool
- Zoom Tool
- Brush Tool
- Eraser Tool
- Future plugin tools

without coupling tool behavior to rendering or UI.

---

# Background

Every editor operates through tools.

Only one tool is active at a time.

Changing tools changes how input events are interpreted.

---

# Scope

## Included

- Tool contract
- Tool metadata
- Tool activation
- Tool lifecycle

## Excluded

- Rendering
- Input implementation
- Commands
- Undo/Redo
- Clipboard

---

# Deliverables

```text
packages/
└── atlas-editor/
    └── src/
        ├── EditorTool.ts
        ├── ToolType.ts
        ├── ToolContext.ts
        └── index.ts
```

---

# Responsibilities

EditorTool is responsible for:

- describing editor interaction
- processing editor input
- exposing tool metadata
- remaining independent from UI

EditorTool is NOT responsible for:

- rendering
- saving documents
- executing commands
- managing undo/redo

---

# Architecture

```text
EditorSession

↓

EditorTool

↓

EditorCommand

↓

EditorDocument
```

---

# Example Tools

Supported tools:

- Pointer
- Selection
- Hand
- Zoom
- Text
- Brush
- Eraser
- Eyedropper
- Measure

---

# Public API

```ts
interface EditorTool {
  readonly id: string;

  readonly type: ToolType;

  readonly name: string;
}
```

---

# Tool Lifecycle

```text
Created

↓

Activated

↓

Running

↓

Deactivated

↓

Disposed
```

---

# Dependency

Depends On

- TASK-0061 — EditorSession
- TASK-0064 — EditorSelection

---

# Risk

Medium

EditorTool becomes the abstraction for every editing interaction.

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

- [ ] EditorTool implemented.
- [ ] Supports multiple tool types.
- [ ] Independent from rendering.
- [ ] Serializable metadata.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio can represent editing interactions using reusable EditorTool definitions.

---

# AI Constraints

Before implementation:

- Do not implement rendering.
- Do not implement input handling.
- Do not implement commands.
- Focus only on the tool model.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0061-editor-session.md
- TASK-0064-editor-selection.md

---

# Next Task

TASK-0066-editor-command.md
