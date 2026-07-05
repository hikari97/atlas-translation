---

id: TASK-0006
title: Implement LayerDocument

status: Completed

priority: Critical

story_points: 5

sprint: SPRINT-001

epic: EPIC-002

package: atlas-document

owner: H.Makki

reviewer:

created_at: 2026-07-01

## updated_at: 2026-07-01

# TASK-0006 — Implement LayerDocument

## Summary

Implement the `LayerDocument`, the document model representing an editable layer within a page.

A `LayerDocument` acts as a container for editable objects such as bubbles, annotations, masks, guides, and future layer-specific content.

The layer provides structure only and does not perform rendering or editing logic.

---

# Goal

Create a reusable layer model that supports different layer types while providing a consistent API for managing contained objects.

---

# Background

Every `PageDocument` contains one or more layers.

Layers organize editable content and allow different editor features to remain independent.

Examples include:

- Image Layer
- Bubble Layer
- Text Layer
- Annotation Layer
- Mask Layer
- Guide Layer

The layer remains a passive document model.

---

# Scope

## Included

- LayerDocument class
- LayerMetadata
- LayerSettings
- LayerState
- Bubble collection
- Collection management methods
- Barrel exports

---

## Excluded

- Bubble implementation
- Translation implementation
- Rendering
- Canvas
- Selection
- Commands
- Events
- Business logic

---

# Deliverables

```text
packages/
└── atlas-document/
    └── src/
        └── layer/
            ├── LayerDocument.ts
            ├── LayerMetadata.ts
            ├── LayerSettings.ts
            ├── LayerState.ts
            ├── BubbleCollection.ts
            └── index.ts
```

---

# Responsibilities

LayerDocument is responsible for:

- Managing layer metadata.
- Managing layer settings.
- Managing layer state.
- Owning the bubble collection.
- Providing access to contained objects.
- Registering and removing bubbles.

LayerDocument is **not** responsible for:

- OCR.
- Translation.
- Rendering.
- Canvas operations.
- Selection.
- Commands.
- Events.
- Persistence.

---

# Public API

The document model should expose a simple bubble management API.

Examples include:

```ts
layer.bubbles;

layer.bubbleCount;

layer.getBubble(id);

layer.hasBubble(id);

layer.addBubble(bubble);

layer.removeBubble(id);

layer.clearBubbles();
```

Mutable internal collections must remain encapsulated.

---

# Technical Requirements

The implementation must:

- Depend only on `@atlas/types`.
- Reuse shared contracts defined in `atlas-types`.
- Expose read-only collections.
- Use strict TypeScript.
- Avoid unnecessary runtime dependencies.
- Follow project coding standards.

---

# Files Allowed

```text
packages/atlas-document/src/layer/**
packages/atlas-document/src/index.ts
```

---

# Files Forbidden

```text
packages/atlas-types/**
packages/atlas-command/**
packages/atlas-events/**
packages/atlas-core/**
apps/**
plugins/**
```

---

# Dependencies

Required:

- TASK-0001
- TASK-0002
- TASK-0003
- TASK-0004
- TASK-0005

---

# Acceptance Criteria

- [ ] LayerDocument implemented.
- [ ] LayerMetadata implemented.
- [ ] LayerSettings implemented.
- [ ] LayerState implemented.
- [ ] BubbleCollection implemented.
- [ ] Read-only bubble collection exposed.
- [ ] Public API exported.
- [ ] Build succeeds.

---

# Definition of Done

The task is complete when:

- PageDocument owns one or more LayerDocument instances.
- LayerDocument manages its bubble collection.
- Internal collections remain encapsulated.
- Public API is stable.
- Package is ready for BubbleDocument.

---

# AI Checklist

Before implementation:

- Implement only LayerDocument.
- Do not implement BubbleDocument.
- Do not implement TranslationDocument.
- Do not implement rendering.
- Do not implement business logic.
- Stop after completing this task.

---

# Next Task

TASK-0007 — Implement BubbleDocument
