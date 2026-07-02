---
id: TASK-0053

title: Implement ProjectAssets

status: Ready

priority: Critical

story_points: 13

sprint: SPRINT-007-project-management

epic: EPIC-014

package: atlas-project

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0053 — Implement ProjectAssets

## Summary

Implement `ProjectAssets`.

ProjectAssets manages every asset belonging to a TranslationProject.

Assets represent project resources such as images, OCR results, inpaint masks, fonts, exported files, and other reusable resources.

ProjectAssets only manages asset metadata and references.

It never loads, edits, or renders asset contents.

---

# Capability

After this task is complete, Atlas Studio can organize all project resources using a unified asset model.

---

# Goal

Provide centralized project asset management.

---

# Business Value

Projects become easier to organize, search, reuse, and export.

Examples:

- Original images
- OCR images
- Inpaint masks
- Font files
- Translation files
- Export files
- Reference images

---

# Background

Every Atlas Studio module depends on assets.

Instead of every module managing its own files, ProjectAssets provides a unified asset catalog.

---

# Scope

## Included

- Asset contract
- Asset metadata
- Asset references
- Asset categorization

## Excluded

- Asset loading
- Asset rendering
- File storage
- Import
- Export

---

# Deliverables

```text
packages/
└── atlas-project/
    └── src/
        ├── ProjectAssets.ts
        ├── ProjectAsset.ts
        ├── AssetMetadata.ts
        └── index.ts
```

---

# Responsibilities

ProjectAssets is responsible for:

- managing project asset references
- exposing asset metadata
- categorizing assets
- maintaining immutable asset collections

ProjectAssets is NOT responsible for:

- reading files
- writing files
- image processing
- OCR
- rendering

---

# Architecture

```text
TranslationProject
        │
        ▼
ProjectAssets
        │
        ├── Images
        ├── OCR
        ├── Inpaint
        ├── Fonts
        ├── Export
        └── References
```

---

# Public API

```ts
interface ProjectAssets {
  readonly assets: readonly ProjectAsset[];
}
```

```ts
interface ProjectAsset {
  readonly id: string;

  readonly name: string;

  readonly type: AssetType;

  readonly metadata: AssetMetadata;
}
```

---

# Example Asset Types

- Image
- OCR
- Mask
- Font
- Translation
- Export
- Thumbnail
- Reference
- Audio (future)
- Video (future)

---

# Dependency

Depends On

- TASK-0051 — TranslationProject

---

# Risk

Medium

ProjectAssets becomes the central catalog for every project resource.

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

- [ ] ProjectAssets implemented.
- [ ] Immutable asset collection.
- [ ] Supports multiple asset types.
- [ ] Serializable.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

TranslationProject manages every project resource through ProjectAssets.

---

# AI Constraints

Before implementation:

- Do not implement file loading.
- Do not implement storage.
- Do not implement rendering.
- Focus only on the asset model.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0051-translation-project.md

---

# Next Task

TASK-0054-project-resource.md
