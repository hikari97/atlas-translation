---
id: TASK-0061

title: Implement EditorSession

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

# TASK-0061 — Implement EditorSession

## Summary

Implement `EditorSession`.

EditorSession represents the runtime state of an editor.

It manages editor-specific state such as active document, viewport, selection, active tool, and interaction state.

EditorSession exists only while the editor is open.

It is never persisted inside TranslationProject.

---

# Capability

After this task is complete, Atlas Studio can isolate editor runtime state from project data.

---

# Goal

Provide the runtime foundation for every editor.

---

# Business Value

EditorSession enables:

- multiple editor windows
- independent editing sessions
- isolated runtime state
- future collaborative editing
- future multi-document editing

---

# Background

TranslationProject stores persistent data.

ProjectSession stores project runtime.

EditorSession stores editor runtime.

Relationship

TranslationProject

↓

ProjectSession

↓

EditorSession

---

# Scope

## Included

- Editor session contract
- Active document
- Active tool
- Active viewport
- Runtime state

## Excluded

- Rendering
- UI
- Undo
- Clipboard
- Selection implementation

---

# Deliverables

```text
packages/
└── atlas-editor/
    └── src/
        ├── EditorSession.ts
        ├── EditorState.ts
        └── index.ts
```

---

# Responsibilities

EditorSession is responsible for:

- managing editor runtime
- exposing active document
- exposing active tool
- exposing editor state

EditorSession is NOT responsible for:

- rendering
- workflow execution
- project persistence
- saving files

---

# Architecture

```text
TranslationProject

↓

ProjectSession

↓

EditorSession

↓

Editor
```

---

# Lifecycle

```text
Created

↓

Opened

↓

Editing

↓

Closing

↓

Closed
```

---

# Public API

```ts
interface EditorSession {
  readonly id: string;

  readonly projectSession: ProjectSession;

  readonly state: EditorState;
}
```

---

# Dependency

Depends On

- TASK-0055 — ProjectSession

---

# Risk

Medium

EditorSession becomes the runtime root for all editor operations.

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

- [ ] EditorSession implemented.
- [ ] Immutable project reference.
- [ ] Runtime state supported.
- [ ] Serializable runtime metadata.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio separates editor runtime from project runtime.

---

# AI Constraints

Before implementation:

- Do not implement rendering.
- Do not implement viewport.
- Do not implement selection.
- Focus only on EditorSession.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0055-project-session.md

---

# Next Task

TASK-0062-editor-document.md
