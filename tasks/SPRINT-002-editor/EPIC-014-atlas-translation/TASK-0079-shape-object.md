---
id: TASK-0079

title: Implement ShapeObject

status: Ready

priority: Medium

story_points: 13

sprint: SPRINT-009-editor-object-model

epic: EPIC-014

package: atlas-editor

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0079 — Implement ShapeObject

## Summary

Implement `ShapeObject`.

ShapeObject represents editable vector geometry inside an EditorDocument.

ShapeObject provides reusable geometric primitives that can be used for annotations, guides, regions, masks, and future vector editing.

ShapeObject never performs rendering.

---

# Capability

After this task is complete, Atlas Studio can represent reusable vector objects independently from rendering.

---

# Goal

Provide a generic vector object model.

---

# Business Value

Supports:

- Rectangle
- Ellipse
- Polygon
- Line
- Path
- Highlight
- Annotation
- Crop Area
- AI Region

---

# Background

Not every editable object is text or image.

Many editor features require lightweight geometric objects.

ShapeObject provides reusable vector primitives.

---

# Scope

## Included

- Shape contract
- Shape geometry
- Stroke
- Fill
- Shape metadata

## Excluded

- Rendering
- Boolean operations
- Path editing
- SVG parsing

---

# Deliverables

```text
packages/
└── atlas-editor/
    └── src/
        ├── ShapeObject.ts
        ├── ShapeGeometry.ts
        ├── ShapeType.ts
        ├── StrokeStyle.ts
        ├── FillStyle.ts
        └── index.ts
```

---

# Responsibilities

ShapeObject is responsible for:

- describing vector geometry
- exposing styling metadata
- integrating with SceneGraph

ShapeObject is NOT responsible for:

- rendering
- hit testing
- path editing
- SVG import

---

# Architecture

```text
EditorObject

↓

ShapeObject

↓

SceneGraph

↓

Renderer
```

---

# Public API

```ts
interface ShapeObject {
  readonly object: EditorObject;

  readonly type: ShapeType;

  readonly geometry: ShapeGeometry;

  readonly stroke: StrokeStyle;

  readonly fill: FillStyle;
}
```

---

# Supported Shapes

- Rectangle
- Rounded Rectangle
- Circle
- Ellipse
- Polygon
- Polyline
- Line
- Path

---

# Dependency

Depends On

- TASK-0071 — EditorObject
- TASK-0074 — SceneGraph

---

# Risk

Medium

ShapeObject provides the reusable geometric foundation for editor features.

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

- [ ] ShapeObject implemented.
- [ ] Immutable.
- [ ] Serializable.
- [ ] Supports multiple geometry types.
- [ ] Supports stroke and fill metadata.
- [ ] Integrated with SceneGraph.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio can represent reusable vector objects independently from rendering.

---

# AI Constraints

Before implementation:

- Do not implement rendering.
- Do not implement SVG parsing.
- Do not implement boolean geometry operations.
- Focus only on the ShapeObject model.

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

TASK-0080-object-hierarchy.md
