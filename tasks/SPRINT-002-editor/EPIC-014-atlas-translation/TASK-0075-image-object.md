---
id: TASK-0075

title: Implement ImageObject

status: Ready

priority: Critical

story_points: 13

sprint: SPRINT-009-editor-object-model

epic: EPIC-014

package: atlas-editor

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0075 — Implement ImageObject

## Summary

Implement `ImageObject`.

ImageObject represents an image placed inside an EditorDocument.

It references an existing ProjectAsset and extends the common EditorObject model with image-specific properties.

ImageObject never owns image data.

---

# Capability

After this task is complete, Atlas Studio can place project images into the editor scene.

---

# Goal

Provide a reusable editor image object.

---

# Business Value

Supports:

- manga pages
- webtoon pages
- background images
- reference images
- overlay images

without duplicating image assets.

---

# Background

ProjectAsset stores image resources.

ImageObject represents one usage of that resource.

The same image asset may appear multiple times inside a document.

---

# Scope

## Included

- Image reference
- Display properties
- Image metadata
- Editor integration

## Excluded

- Image decoding
- Rendering
- Image processing
- Asset loading

---

# Deliverables

```text
packages/
└── atlas-editor/
    └── src/
        ├── ImageObject.ts
        ├── ImageProperties.ts
        └── index.ts
```

---

# Responsibilities

ImageObject is responsible for:

- referencing ProjectAsset
- exposing image properties
- integrating with SceneGraph

ImageObject is NOT responsible for:

- loading images
- rendering
- image processing
- OCR

---

# Architecture

```text
ProjectAsset

↓

ImageObject

↓

SceneGraph

↓

Renderer
```

---

# Public API

```ts
interface ImageObject {
  readonly object: EditorObject;

  readonly assetId: string;

  readonly properties: ImageProperties;
}
```

---

# Image Properties

Supports:

- opacity
- visibility
- clipping
- crop rectangle
- color profile (future)

---

# Dependency

Depends On

- TASK-0053 — ProjectAssets
- TASK-0071 — EditorObject
- TASK-0074 — SceneGraph

---

# Risk

Medium

ImageObject becomes the foundation for all image-based editing.

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

- [ ] ImageObject implemented.
- [ ] References ProjectAsset.
- [ ] Immutable.
- [ ] Serializable.
- [ ] Integrated with SceneGraph.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio can represent image assets as editable objects inside an EditorDocument.

---

# AI Constraints

Before implementation:

- Do not implement rendering.
- Do not implement image loading.
- Do not implement OCR.
- Focus only on the ImageObject model.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0053-project-assets.md
- TASK-0071-editor-object.md
- TASK-0074-scene-graph.md

---

# Next Task

TASK-0076-text-object.md
