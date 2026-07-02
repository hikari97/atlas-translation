---
id: TASK-0059

title: Implement ProjectValidator

status: Ready

priority: High

story_points: 13

sprint: SPRINT-007-project-management

epic: EPIC-014

package: atlas-project

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0059 — Implement ProjectValidator

## Summary

Implement `ProjectValidator`.

ProjectValidator validates the structural integrity of a TranslationProject before it can be opened or executed.

Validation ensures that all required project resources, references, and configurations are valid.

ProjectValidator never modifies the project.

---

# Capability

After this task is complete, Atlas Studio can detect invalid project definitions before runtime.

---

# Goal

Provide comprehensive project validation.

---

# Business Value

Users receive immediate feedback when opening or importing projects.

Validation prevents runtime failures caused by invalid project structures.

---

# Background

A TranslationProject may become invalid due to:

- missing workflow
- invalid settings
- broken asset references
- duplicated identifiers
- invalid metadata
- inconsistent resources

ProjectValidator detects these problems before ProjectSession is created.

---

# Scope

## Included

- Project validation
- Metadata validation
- Asset validation
- Workflow validation
- Settings validation
- Validation report

## Excluded

- Project repair
- Project migration
- Project execution
- Import/Export

---

# Deliverables

```text
packages/
└── atlas-project/
    └── src/
        ├── ProjectValidator.ts
        ├── ProjectValidationResult.ts
        ├── ProjectValidationIssue.ts
        └── index.ts
```

---

# Responsibilities

ProjectValidator is responsible for:

- validating project metadata
- validating workflow references
- validating asset references
- validating project settings
- producing validation reports

ProjectValidator is NOT responsible for:

- repairing projects
- executing workflows
- importing projects
- exporting projects

---

# Architecture

```text
TranslationProject

↓

ProjectValidator

↓

ProjectValidationResult
```

---

# Validation Rules

Minimum validation rules:

- Project ID exists.
- Project name exists.
- Workflow exists.
- Workflow is valid.
- Asset IDs are unique.
- Asset references are valid.
- Project settings are valid.
- TranslationMemory is valid.
- Glossary is valid.

---

# Public API

```ts
interface ProjectValidator {
  validate(project: TranslationProject): ProjectValidationResult;
}
```

```ts
interface ProjectValidationResult {
  readonly valid: boolean;

  readonly issues: readonly ProjectValidationIssue[];
}
```

```ts
interface ProjectValidationIssue {
  readonly code: string;

  readonly message: string;

  readonly severity: ValidationSeverity;
}
```

---

# Dependency

Depends On

- TASK-0048 — WorkflowValidator
- TASK-0051 — TranslationProject
- TASK-0052 — ProjectSettings
- TASK-0053 — ProjectAssets

---

# Risk

Medium

Invalid projects may prevent Atlas Studio from opening correctly.

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

- [ ] ProjectValidator implemented.
- [ ] Validates workflow.
- [ ] Validates settings.
- [ ] Validates assets.
- [ ] Produces validation report.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio validates project integrity before creating a ProjectSession.

---

# AI Constraints

Before implementation:

- Do not repair projects.
- Do not execute workflows.
- Do not implement migration.
- Focus only on project validation.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0048-workflow-validator.md
- TASK-0051-translation-project.md
- TASK-0052-project-settings.md
- TASK-0053-project-assets.md

---

# Next Task

TASK-0060-project-template.md
