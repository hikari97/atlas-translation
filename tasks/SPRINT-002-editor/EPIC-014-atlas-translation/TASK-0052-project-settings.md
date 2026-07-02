---
id: TASK-0052

title: Implement ProjectSettings

status: Ready

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

# TASK-0052 — Implement ProjectSettings

## Summary

Implement `ProjectSettings`.

ProjectSettings stores all project-level configuration required by Atlas Studio.

Settings are immutable and travel with the project, ensuring consistent behavior across different machines and environments.

---

# Capability

After this task is complete, Atlas Studio can configure translation behavior on a per-project basis.

---

# Goal

Provide centralized project configuration.

---

# Business Value

Projects become portable and reproducible.

Examples:

- default source language
- default target language
- default workflow
- default AI provider
- project preferences

---

# Background

Every project requires configuration.

Instead of scattering configuration across different modules, ProjectSettings becomes the single source of truth.

---

# Scope

## Included

- Project configuration
- Translation preferences
- OCR preferences
- Typesetting preferences
- Export preferences

## Excluded

- Global application settings
- User preferences
- Secret storage
- Runtime configuration

---

# Deliverables

```text
packages/
└── atlas-project/
    └── src/
        ├── ProjectSettings.ts
        ├── ProjectSetting.ts
        └── index.ts
```

---

# Responsibilities

ProjectSettings is responsible for:

- storing project configuration
- exposing immutable settings
- providing project defaults

ProjectSettings is NOT responsible for:

- executing workflows
- storing user preferences
- storing API keys
- managing runtime state

---

# Architecture

```text
TranslationProject
        │
        ▼
ProjectSettings
        │
        ├── Translation
        ├── OCR
        ├── Typesetting
        └── Export
```

---

# Example Settings

Examples:

- Source Language
- Target Language
- Default Workflow
- Default Provider
- Auto Save
- Auto Translate
- Preserve Line Breaks
- Output Format

---

# Public API

```ts
interface ProjectSettings {
  readonly translation: TranslationSettings;

  readonly ocr: OCRSettings;

  readonly typesetting: TypesettingSettings;

  readonly export: ExportSettings;
}
```

---

# Dependency

Depends On

- TASK-0051 — TranslationProject

---

# Risk

Low

ProjectSettings is an immutable configuration model.

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

- [ ] ProjectSettings implemented.
- [ ] Immutable.
- [ ] Serializable.
- [ ] Supports module-specific settings.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

TranslationProject can expose a centralized immutable configuration through ProjectSettings.

---

# AI Constraints

Before implementation:

- Do not implement UI.
- Do not implement user preferences.
- Do not implement runtime configuration.
- Focus only on the project configuration model.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0051-translation-project.md

---

# Next Task

TASK-0053-project-assets.md
