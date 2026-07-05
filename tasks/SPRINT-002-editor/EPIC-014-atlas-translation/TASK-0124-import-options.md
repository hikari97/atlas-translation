---
id: TASK-0124

title: Implement ImportOptions

status: Completed

priority: Medium

story_points: 13

sprint: SPRINT-014-import-system

epic: EPIC-017

package: atlas-import

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0124 — Implement ImportOptions

## Summary

Implement `ImportOptions`.

ImportOptions defines the configurable parameters used during document import.

ImportOptions are shared across ImportProviders while allowing provider-specific configuration through typed option groups.

---

# Capability

After this task is complete, Atlas Studio can configure import behavior using a reusable options model.

---

# Goal

Provide standardized import configuration.

---

# Business Value

Supports:

- Page selection
- Metadata import
- Layer preservation
- Image preprocessing
- Provider-specific configuration
- Future AI-assisted import

without modifying ImportProvider contracts.

---

# Background

Every import format requires different configuration.

ImportOptions provides a common abstraction while allowing providers to consume only relevant options.

---

# Scope

## Included

- Import options model
- Default values
- Validation metadata
- Common options
- Provider-specific options

## Excluded

- UI
- Persistence
- Rendering
- Parsing implementation

---

# Deliverables

```text
packages/
└── atlas-import/
    └── src/
        ├── ImportOptions.ts
        ├── ImportOptionDefinition.ts
        ├── ImportOptionsSchema.ts
        └── index.ts
```

---

# Responsibilities

ImportOptions is responsible for:

- describing import configuration
- exposing default values
- validating option definitions
- remaining provider independent

ImportOptions is NOT responsible for:

- parsing
- rendering
- storage
- UI

---

# Architecture

```text
ImportRequest

↓

ImportOptions

↓

ImportPipeline

↓

ImportProvider
```

---

# Public API

```ts
interface ImportOptions {
  readonly importMetadata: boolean;

  readonly preserveLayers: boolean;

  readonly pageRange?: readonly number[];

  readonly skipCorruptedPages: boolean;

  readonly formatOptions?: unknown;
}
```

---

# Suggested Options

Common

- Import Metadata
- Preserve Layers
- Page Range
- Skip Corrupted Pages
- Normalize Metadata

Format-specific

- PDF DPI
- PSD Preserve Effects
- ZIP Recursive
- EPUB Reading Direction

---

# Dependency

Depends On

- TASK-0121 — ImportProvider
- TASK-0123 — ImportPipeline

---

# Risk

Medium

ImportOptions standardizes configuration across all import providers.

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

- [ ] ImportOptions implemented.
- [ ] Immutable.
- [ ] Supports typed configuration.
- [ ] Provider independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio configures imports through a reusable ImportOptions model.

---

# AI Constraints

Before implementation:

- Do not implement settings UI.
- Do not implement parsing.
- Do not implement rendering.
- Focus only on the ImportOptions model.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0121-import-provider.md
- TASK-0123-import-pipeline.md

---

# Next Task

TASK-0125-import-events.md
