---
id: TASK-0076

title: Implement TextObject

status: Completed

priority: Critical

story_points: 21

sprint: SPRINT-009-editor-object-model

epic: EPIC-014

package: atlas-editor

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0076 — Implement TextObject

## Summary

Implement `TextObject`.

TextObject represents editable text inside an EditorDocument.

It extends the common EditorObject model with text content, typography, layout, and language information.

TextObject is the foundation for OCR editing, translation editing, and typesetting.

TextObject never performs rendering.

---

# Capability

After this task is complete, Atlas Studio can represent editable text independently from rendering and translation providers.

---

# Goal

Provide a reusable text model for every text-related editor feature.

---

# Business Value

Supports:

- OCR correction
- Translation editing
- Manga typesetting
- Balloon text
- Vertical text
- Future Ruby/Furigana
- Future Rich Text

---

# Background

Unlike ImageObject, TextObject contains editable semantic data.

Text editing should remain independent from rendering and layout engines.

---

# Scope

## Included

- Text content
- Typography
- Language
- Alignment
- Text direction
- Writing mode

## Excluded

- Rendering
- Font loading
- Text shaping
- Spell checking

---

# Deliverables

```text
packages/
└── atlas-editor/
    └── src/
        ├── TextObject.ts
        ├── TextProperties.ts
        ├── Typography.ts
        ├── WritingMode.ts
        ├── TextAlignment.ts
        └── index.ts
```

---

# Responsibilities

TextObject is responsible for:

- storing editable text
- exposing typography
- exposing language
- exposing writing direction
- integrating with SceneGraph

TextObject is NOT responsible for:

- rendering
- font loading
- line breaking
- OCR
- translation

---

# Architecture

```text
EditorObject

↓

TextObject

↓

SceneGraph

↓

Renderer
```

---

# Public API

```ts
interface TextObject {
  readonly object: EditorObject;

  readonly text: string;

  readonly language: string;

  readonly typography: Typography;

  readonly properties: TextProperties;
}
```

---

# Text Features

Supports:

- Plain Text
- Multi-line
- Horizontal Writing
- Vertical Writing
- Left-to-Right
- Right-to-Left
- Rich Typography (future)

---

# Dependency

Depends On

- TASK-0071 — EditorObject
- TASK-0074 — SceneGraph

---

# Risk

High

TextObject becomes the foundation of OCR editing, translation editing, and typesetting.

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

- [ ] TextObject implemented.
- [ ] Immutable.
- [ ] Serializable.
- [ ] Supports typography.
- [ ] Supports writing modes.
- [ ] Integrated with SceneGraph.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio represents editable text using TextObject independently from rendering.

---

# AI Constraints

Before implementation:

- Do not implement rendering.
- Do not implement text shaping.
- Do not implement OCR.
- Focus only on the text model.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0071-editor-object.md
- TASK-0074-scene-graph.md

---

# Next Task

TASK-0077-bubble-object.md
