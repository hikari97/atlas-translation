---
id: TASK-0054

title: Implement ProjectResource

status: Completed

priority: High

story_points: 8

sprint: SPRINT-007-project-management

epic: EPIC-014

package: atlas-project

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0054 — Implement ProjectResource

## Summary

Implement `ProjectResource`.

ProjectResource represents a runtime resource selected from ProjectAssets.

Unlike ProjectAssets, ProjectResource only contains resources actively used by workflows during execution.

---

# Capability

After this task is complete, Atlas Studio can manage active project resources independently from the complete asset catalog.

---

# Goal

Separate project asset storage from workflow resource usage.

---

# Business Value

Allows Atlas Studio to:

- reduce memory usage
- process subsets of assets
- support batch execution
- support partial project execution
- improve scalability for large projects

---

# Background

A project may contain thousands of assets.

Example:

ProjectAssets

- 2,000 Images
- 2,000 OCR Results
- 500 Masks
- 30 Fonts

Current workflow

- Image 15
- Image 16
- Image 17

Only these become ProjectResources.

---

# Scope

## Included

- Resource contract
- Resource metadata
- Runtime resource references
- Resource collection

## Excluded

- Asset storage
- Workflow execution
- Rendering
- Import/Export

---

# Deliverables

```text
packages/
└── atlas-project/
    └── src/
        ├── ProjectResource.ts
        ├── ProjectResources.ts
        └── index.ts
```

---

# Responsibilities

ProjectResource is responsible for:

- referencing active assets
- exposing runtime resources
- grouping workflow resources

ProjectResource is NOT responsible for:

- loading files
- rendering
- executing workflows
- editing assets

---

# Architecture

```text
TranslationProject
        │
        ▼
ProjectAssets
        │
        ▼
ProjectResources
        │
        ▼
WorkflowExecutor
```

---

# Public API

```ts
interface ProjectResources {
  readonly items: readonly ProjectResource[];
}
```

```ts
interface ProjectResource {
  readonly id: string;

  readonly assetId: string;

  readonly type: ResourceType;
}
```

---

# Example Resource Types

- Image
- OCR
- Translation
- Mask
- Font
- Export

---

# Dependency

Depends On

- TASK-0053 — ProjectAssets
- TASK-0046 — WorkflowExecutor

---

# Risk

Low

ProjectResources provide runtime references only.

---

# Files Allowed

```text
packages/atlas-project/src/**
```

---

# Files Forbidden

```text
packages/atlas-translation/**
packages/atlas-editor/**
apps/**
```

---

# Acceptance Criteria

- [ ] ProjectResource implemented.
- [ ] Immutable.
- [ ] Serializable.
- [ ] References ProjectAssets.
- [ ] Supports runtime resource grouping.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio can separate project asset storage from workflow runtime resources.

---

# AI Constraints

Before implementation:

- Do not implement asset loading.
- Do not implement workflow execution.
- Do not implement rendering.
- Focus only on runtime resource modeling.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0051-translation-project.md
- TASK-0053-project-assets.md

---

# Next Task

TASK-0055-project-session.md
