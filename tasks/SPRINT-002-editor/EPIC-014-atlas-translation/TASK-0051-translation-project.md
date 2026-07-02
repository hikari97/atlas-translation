---
id: TASK-0051

title: Implement TranslationProject

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

# TASK-0051 — Implement TranslationProject

## Summary

Implement `TranslationProject`.

TranslationProject is the root aggregate of Atlas Studio.

It contains all resources required to translate a project, including workflows, assets, settings, glossary, translation memory, and project metadata.

TranslationProject is the entry point for every Atlas Studio session.

---

# Capability

After this task is complete, Atlas Studio can organize translation work into reusable projects.

---

# Goal

Provide a root aggregate representing a complete translation project.

---

# Business Value

Projects allow users to:

- organize work
- save progress
- reopen sessions
- share project files
- reuse project settings

---

# Background

Every Atlas Studio operation belongs to exactly one project.

Examples:

- Manga Project
- Webtoon Project
- Visual Novel Project
- Novel Project

Each project owns its own resources.

---

# Scope

## Included

- Project metadata
- Workflow reference
- Project settings
- Asset references
- Translation resources

## Excluded

- Project storage
- Import
- Export
- Autosave
- Collaboration

---

# Deliverables

```text
packages/
└── atlas-project/
    └── src/
        ├── TranslationProject.ts
        ├── ProjectMetadata.ts
        └── index.ts
```

---

# Responsibilities

TranslationProject is responsible for:

- owning project resources
- exposing project metadata
- referencing workflow
- referencing translation assets
- representing project state

TranslationProject is NOT responsible for:

- executing workflows
- translating text
- importing files
- exporting files
- rendering UI

---

# Architecture

```text
TranslationProject
        │
        ├── Workflow
        ├── Assets
        ├── Glossary
        ├── TranslationMemory
        ├── Settings
        └── Metadata
```

---

# Public API

```ts
interface TranslationProject {
  readonly id: string;

  readonly name: string;

  readonly metadata: ProjectMetadata;

  readonly workflow: TranslationWorkflow;
}
```

---

# Dependency

Depends On

- TASK-0042 — TranslationWorkflow
- TASK-0035 — TranslationMemory
- TASK-0036 — Glossary

---

# Risk

Medium

TranslationProject becomes the root aggregate for Atlas Studio.

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

- [ ] TranslationProject implemented.
- [ ] Immutable.
- [ ] Serializable.
- [ ] References TranslationWorkflow.
- [ ] Supports project metadata.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio can represent an entire translation project using a single TranslationProject aggregate.

---

# AI Constraints

Before implementation:

- Do not implement storage.
- Do not implement import/export.
- Do not execute workflows.
- Focus only on the project model.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0042-translation-workflow.md

---

# Next Task

TASK-0052-project-settings.md
