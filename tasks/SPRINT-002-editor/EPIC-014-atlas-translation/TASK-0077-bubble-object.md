---
id: TASK-0077

title: Implement BubbleObject

status: Ready

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

# TASK-0077 — Implement BubbleObject

## Summary

Implement `BubbleObject`.

BubbleObject represents a speech bubble, narration box, thought bubble, or other text container inside an EditorDocument.

BubbleObject references one or more TextObjects while describing the editable text region.

BubbleObject never performs rendering.

---

# Capability

After this task is complete, Atlas Studio can represent speech bubbles independently from image assets.

---

# Goal

Provide a reusable semantic model for speech bubbles.

---

# Business Value

Supports:

- Manga bubbles
- Webtoon bubbles
- Narration boxes
- Thought bubbles
- AI Typesetting
- Auto Layout

---

# Background

Speech bubbles are not simply drawings.

They define where text may be placed.

TextObjects are placed inside BubbleObjects.

---

# Scope

## Included

- Bubble metadata
- Bubble geometry
- Text references
- Layout constraints

## Excluded

- Rendering
- OCR detection
- Auto Layout implementation
- Image segmentation

---

# Deliverables

```text
packages/
└── atlas-editor/
    └── src/
        ├── BubbleObject.ts
        ├── BubbleGeometry.ts
        ├── BubbleType.ts
        └── index.ts
```

---

# Responsibilities

BubbleObject is responsible for:

- describing bubble geometry
- defining text region
- referencing TextObjects
- exposing layout constraints

BubbleObject is NOT responsible for:

- rendering
- OCR
- text shaping
- image segmentation

---

# Architecture

```text
EditorObject

↓

BubbleObject

↓

TextObject

↓

Renderer
```

---

# Public API

```ts
interface BubbleObject {
  readonly object: EditorObject;

  readonly type: BubbleType;

  readonly geometry: BubbleGeometry;

  readonly textObjectIds: readonly string[];
}
```

---

# Supported Bubble Types

- Speech
- Thought
- Narration
- Shout
- Whisper
- Caption
- Custom

---

# Bubble Features

Supports:

- Multiple text objects
- Layout bounds
- Internal padding
- Tail metadata
- Future auto layout

---

# Dependency

Depends On

- TASK-0071 — EditorObject
- TASK-0076 — TextObject

---

# Risk

Medium

BubbleObject becomes the semantic representation of text containers.

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

- [ ] BubbleObject implemented.
- [ ] Immutable.
- [ ] Serializable.
- [ ] References TextObjects.
- [ ] Supports BubbleGeometry.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio can represent editable speech bubbles independently from rendering.

---

# AI Constraints

Before implementation:

- Do not implement rendering.
- Do not implement OCR.
- Do not implement auto layout.
- Focus only on the BubbleObject model.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0071-editor-object.md
- TASK-0076-text-object.md

---

# Next Task

TASK-0078-group-object.md
