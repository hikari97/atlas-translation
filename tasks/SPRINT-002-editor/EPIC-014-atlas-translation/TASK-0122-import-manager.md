---
id: TASK-0122

title: Implement ImportManager

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

# TASK-0122 — Implement ImportManager

## Summary

Implement `ImportManager`.

ImportManager coordinates document import by selecting the appropriate ImportProvider based on the ImportRequest.

ImportManager remains independent from specific import implementations.

---

# Capability

After this task is complete, Atlas Studio can coordinate document imports through a centralized import runtime.

---

# Goal

Provide centralized import management.

---

# Business Value

Supports:

- Multiple import formats
- Plugin-defined importers
- Batch import
- Future cloud import

without modifying Atlas Studio Core.

---

# Background

ImportProvider implementations focus on a single format.

ImportManager is responsible for provider discovery, selection, and import coordination.

---

# Scope

## Included

- Provider registration
- Provider lookup
- Import coordination
- Import result handling

## Excluded

- PDF parsing
- Rendering
- Storage
- File dialogs

---

# Deliverables

```text
packages/
└── atlas-import/
    └── src/
        ├── ImportManager.ts
        ├── ImportRegistry.ts
        ├── ImportProviderResolver.ts
        └── index.ts
```

---

# Responsibilities

ImportManager is responsible for:

- registering providers
- resolving providers
- coordinating imports
- returning import results

ImportManager is NOT responsible for:

- parsing files
- rendering
- storage
- UI

---

# Architecture

```text
ImportRequest

↓

ImportManager

↓

ImportProviderResolver

↓

ImportProvider

↓

ImportPipeline

↓

EditorDocument
```

---

# Public API

```ts
interface ImportManager {
  register(provider: ImportProvider): void;

  import(request: ImportRequest): Promise<ImportResult>;
}
```

---

# Supported Features

- Provider registration
- Multiple providers
- Format lookup
- Provider replacement
- Plugin-provided importers

---

# Dependency

Depends On

- TASK-0121 — ImportProvider
- TASK-0104 — ExtensionRegistry

---

# Risk

High

ImportManager becomes the runtime coordinator for all import operations.

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

- [ ] ImportManager implemented.
- [ ] Supports provider registration.
- [ ] Resolves providers by format.
- [ ] Platform independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio coordinates imports through ImportManager using interchangeable ImportProviders.

---

# AI Constraints

Before implementation:

- Do not implement PDF parsing.
- Do not implement rendering.
- Do not implement storage.
- Focus only on import coordination.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0104-extension-registry.md
- TASK-0121-import-provider.md

---

# Next Task

TASK-0123-import-pipeline.md
