---
id: TASK-0060

title: Implement ProjectTemplate

status: Ready

priority: Medium

story_points: 8

sprint: SPRINT-007-project-management

epic: EPIC-014

package: atlas-project

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0060 — Implement ProjectTemplate

## Summary

Implement `ProjectTemplate`.

ProjectTemplate represents a reusable blueprint for creating TranslationProject instances.

Templates define default project configuration, workflows, assets, and project metadata.

ProjectTemplate is immutable and never executed directly.

---

# Capability

After this task is complete, Atlas Studio can create standardized TranslationProjects from reusable templates.

---

# Goal

Provide reusable project presets.

---

# Business Value

Project templates reduce setup time and ensure consistent project structures.

Examples:

- Manga Project
- Webtoon Project
- Comic Project
- Visual Novel Project
- Novel Project

---

# Background

Users frequently create projects with similar structures.

Instead of configuring every project manually, ProjectTemplate provides predefined configurations.

Example

ProjectTemplate

↓

Create Project

↓

TranslationProject

↓

ProjectSession

↓

WorkflowExecutor

---

# Scope

## Included

- Template contract
- Template metadata
- Default project settings
- Default workflow
- Default assets

## Excluded

- Template editing
- Project execution
- Runtime state
- Import/Export

---

# Deliverables

```text
packages/
└── atlas-project/
    └── src/
        ├── ProjectTemplate.ts
        ├── ProjectTemplateMetadata.ts
        └── index.ts
```

---

# Responsibilities

ProjectTemplate is responsible for:

- describing reusable project structures
- providing default configuration
- defining default workflows
- exposing immutable template metadata

ProjectTemplate is NOT responsible for:

- creating ProjectSession
- executing workflows
- translating content
- saving projects

---

# Architecture

```text
ProjectTemplate

↓

TranslationProject

↓

ProjectSession

↓

WorkflowExecutor
```

---

# Example Templates

Examples:

- Manga Translation
- Webtoon Translation
- Comic Translation
- Novel Translation
- OCR + Translation
- OCR + Translation + Typesetting

---

# Public API

```ts
interface ProjectTemplate {
  readonly id: string;

  readonly name: string;

  readonly description?: string;

  readonly metadata: ProjectTemplateMetadata;

  readonly settings: ProjectSettings;

  readonly workflow: TranslationWorkflow;
}
```

---

# Dependency

Depends On

- TASK-0042 — TranslationWorkflow
- TASK-0051 — TranslationProject
- TASK-0052 — ProjectSettings

---

# Risk

Low

ProjectTemplate is an immutable project blueprint.

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

- [ ] ProjectTemplate implemented.
- [ ] Immutable.
- [ ] Serializable.
- [ ] Supports reusable project presets.
- [ ] References ProjectSettings.
- [ ] References TranslationWorkflow.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio can create TranslationProjects from reusable ProjectTemplates.

---

# AI Constraints

Before implementation:

- Do not create ProjectSession.
- Do not execute workflows.
- Do not implement project persistence.
- Focus only on template definition.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0042-translation-workflow.md
- TASK-0051-translation-project.md
- TASK-0052-project-settings.md

---

# Sprint Completion

After Sprint 7 is completed, Atlas Studio is capable of:

✓ Creating TranslationProject

✓ Managing ProjectSettings

✓ Managing ProjectAssets

✓ Managing ProjectResources

✓ Managing ProjectSession

✓ Managing ProjectLifecycle

✓ Publishing ProjectEvents

✓ Recording ProjectHistory

✓ Validating Project integrity

✓ Creating projects from reusable ProjectTemplates

The Project Management Layer is now complete.

---

# Next Task

TASK-0061-editor-session.md
