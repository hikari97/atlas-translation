---
id: TASK-0063

title: Implement EditorViewport

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

# TASK-0063 — Implement EditorViewport

## Summary

Implement `EditorViewport`.

EditorViewport represents the visible region of an EditorDocument.

It manages camera position, zoom level, viewport size, and coordinate transformation.

EditorViewport never renders graphics.

---

# Capability

After this task is complete, Atlas Studio can manage document navigation independently from rendering.

---

# Goal

Provide a reusable viewport abstraction for every editor.

---

# Business Value

Supports:

- zoom
- pan
- fit-to-screen
- center view
- future minimap
- multiple synchronized views

---

# Background

EditorDocument represents editable content.

EditorViewport determines which part of that content is currently visible.

Multiple viewports may display the same document.

---

# Scope

## Included

- Viewport contract
- Camera position
- Zoom level
- View size
- Coordinate conversion

## Excluded

- Rendering
- Canvas
- Selection
- Input handling

---

# Deliverables

```text
packages/
└── atlas-editor/
    └── src/
        ├── EditorViewport.ts
        ├── ViewportState.ts
        └── index.ts
```

---

# Responsibilities

EditorViewport is responsible for:

- storing camera position
- storing zoom level
- exposing visible region
- converting coordinates

EditorViewport is NOT responsible for:

- rendering
- hit testing
- drawing
- input events

---

# Architecture

```text
EditorSession

↓

EditorDocument

↓

EditorViewport

↓

Renderer
```

---

# Public API

```ts
interface EditorViewport {
  readonly id: string;

  readonly documentId: string;

  readonly state: ViewportState;
}
```

---

# Viewport Features

Supports:

- Pan
- Zoom
- Fit Width
- Fit Height
- Fit Screen
- Reset View
- Coordinate Transform

---

# Dependency

Depends On

- TASK-0062 — EditorDocument

---

# Risk

Medium

Viewport becomes the foundation of all editor navigation.

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

- [ ] EditorViewport implemented.
- [ ] Supports zoom state.
- [ ] Supports camera position.
- [ ] Supports coordinate conversion.
- [ ] Immutable document reference.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio can represent document navigation independently from rendering.

---

# AI Constraints

Before implementation:

- Do not implement rendering.
- Do not implement canvas.
- Do not implement input handling.
- Focus only on the viewport model.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0061-editor-session.md
- TASK-0062-editor-document.md

---

# Next Task

TASK-0064-editor-selection.md
