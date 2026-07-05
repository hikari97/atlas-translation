---
id: TASK-0121

title: Implement ImportProvider

status: Completed

priority: Critical

story_points: 21

sprint: SPRINT-014-import-system

epic: EPIC-017

package: atlas-import

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0121 — Implement ImportProvider

## Summary

Implement `ImportProvider`.

ImportProvider defines the contract for importing external files into Atlas Studio.

Import providers are interchangeable and platform independent.

---

# Capability

After this task is complete, Atlas Studio can import multiple document formats using interchangeable providers.

---

# Goal

Provide a standardized import abstraction.

---

# Business Value

Supports:

- PDF Import
- CBZ Import
- EPUB Import
- ZIP Import
- Image Folder Import
- Future PSD Import
- Plugin-defined import providers

without changing Atlas Studio Core.

---

# Background

Every document format requires different parsing logic.

Atlas Studio communicates only with ImportProvider contracts.

---

# Scope

## Included

- Import provider contract
- Import metadata
- Import capabilities
- Import lifecycle

## Excluded

- PDF parsing
- CBZ parsing
- Rendering
- Storage

---

# Deliverables

```text
packages/
└── atlas-import/
    └── src/
        ├── ImportProvider.ts
        ├── ImportMetadata.ts
        ├── ImportCapability.ts
        └── index.ts
```

---

# Responsibilities

ImportProvider is responsible for:

- exposing import capabilities
- describing supported formats
- importing external documents
- remaining platform independent

ImportProvider is NOT responsible for:

- rendering
- storage
- UI
- editor behavior

---

# Architecture

```text
Input File

↓

ImportPipeline

↓

ImportProvider

↓

EditorDocument
```

---

# Public API

```ts
interface ImportProvider {
  readonly metadata: ImportMetadata;

  import(request: ImportRequest): Promise<ImportResult>;
}
```

---

# Supported Providers

- PDF Import
- CBZ Import
- EPUB Import
- ZIP Import
- Image Folder Import

Future:

- PSD Import
- AI Import
- SVG Import

---

# Dependency

Depends On

- TASK-0062 — EditorDocument

---

# Risk

High

ImportProvider becomes the foundation for every supported import format.

---

# Files Allowed

```text
packages/atlas-import/src/**
```

---

# Files Forbidden

```text
packages/atlas-editor/**
packages/atlas-renderer/**
packages/atlas-input/**
packages/atlas-plugin/**
packages/atlas-export/**
apps/**
```

---

# Acceptance Criteria

- [ ] ImportProvider implemented.
- [ ] Immutable metadata.
- [ ] Platform independent.
- [ ] Supports import requests.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio imports external documents through interchangeable ImportProviders.

---

# AI Constraints

Before implementation:

- Do not implement PDF parsing.
- Do not implement CBZ parsing.
- Do not implement rendering.
- Focus only on the ImportProvider abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md

---

# Next Task

TASK-0122-import-manager.md
