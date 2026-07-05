---
id: TASK-0112

title: Implement ExportManager

status: Completed

priority: Critical

story_points: 21

sprint: SPRINT-013-export-system

epic: EPIC-016

package: atlas-export

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0112 — Implement ExportManager

## Summary

Implement `ExportManager`.

ExportManager coordinates document export by selecting the appropriate ExportProvider based on the ExportRequest.

ExportManager remains independent from specific export implementations.

---

# Capability

After this task is complete, Atlas Studio can coordinate document exports through a centralized export runtime.

---

# Goal

Provide centralized export management.

---

# Business Value

Supports:

- Multiple export formats
- Custom export providers
- Plugin-based exporters
- Batch export
- Future cloud export

without changing Atlas Studio Core.

---

# Background

ExportProvider implementations focus on a single format.

ExportManager is responsible for provider discovery, selection, and export coordination.

---

# Scope

## Included

- Provider registration
- Provider lookup
- Export coordination
- Export result handling

## Excluded

- Rendering
- File dialogs
- Compression
- Storage

---

# Deliverables

```text
packages/
└── atlas-export/
    └── src/
        ├── ExportManager.ts
        ├── ExportRegistry.ts
        ├── ExportProviderResolver.ts
        └── index.ts
```

---

# Responsibilities

ExportManager is responsible for:

- registering providers
- resolving providers
- coordinating exports
- returning export results

ExportManager is NOT responsible for:

- rendering
- file saving
- UI
- export implementation

---

# Architecture

```text
ExportRequest

↓

ExportManager

↓

ExportProviderResolver

↓

ExportProvider

↓

ExportResult
```

---

# Public API

```ts
interface ExportManager {
  register(provider: ExportProvider): void;

  export(request: ExportRequest): Promise<ExportResult>;
}
```

---

# Supported Features

- Provider registration
- Multiple providers
- Format lookup
- Provider replacement
- Plugin-provided exporters

---

# Dependency

Depends On

- TASK-0111 — ExportProvider
- TASK-0104 — ExtensionRegistry

---

# Risk

High

ExportManager becomes the runtime coordinator for all export operations.

---

# Files Allowed

```text
packages/atlas-export/src/**
```

---

# Files Forbidden

```text
packages/atlas-editor/**
packages/atlas-renderer/**
packages/atlas-input/**
packages/atlas-plugin/**
apps/**
```

---

# Acceptance Criteria

- [ ] ExportManager implemented.
- [ ] Supports provider registration.
- [ ] Resolves providers by format.
- [ ] Platform independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio coordinates exports through ExportManager using interchangeable ExportProviders.

---

# AI Constraints

Before implementation:

- Do not implement PDF export.
- Do not implement rendering.
- Do not implement storage.
- Focus only on export coordination.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0111-export-provider.md
- TASK-0104-extension-registry.md

---

# Next Task

TASK-0113-export-pipeline.md
