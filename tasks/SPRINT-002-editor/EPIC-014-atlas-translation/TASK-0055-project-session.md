---
id: TASK-0055

title: Implement ProjectSession

status: Completed

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

# TASK-0055 — Implement ProjectSession

## Summary

Implement `ProjectSession`.

ProjectSession represents the runtime state of an opened TranslationProject.

It exists only while the project is open.

ProjectSession coordinates runtime services such as workflow execution, resource allocation, and editor state.

---

# Capability

After this task is complete, Atlas Studio can manage runtime state independently from the persisted TranslationProject.

---

# Goal

Separate project definition from runtime state.

---

# Business Value

ProjectSession enables:

- opening projects
- closing projects
- runtime state isolation
- multiple future sessions
- clean separation between persistent and runtime data

---

# Background

TranslationProject represents the project itself.

ProjectSession represents one runtime instance of that project.

Multiple sessions may exist in the future.

Example

Project

↓

Open

↓

Session

↓

Workflow Execution

↓

Close

↓

Session destroyed

---

# Scope

## Included

- Session contract
- Session lifecycle
- Runtime references
- Active project state

## Excluded

- Workflow execution
- Persistence
- Autosave
- Collaboration

---

# Deliverables

```text
packages/
└── atlas-project/
    └── src/
        ├── ProjectSession.ts
        ├── SessionState.ts
        └── index.ts
```

---

# Responsibilities

ProjectSession is responsible for:

- referencing TranslationProject
- exposing runtime state
- tracking session lifecycle
- managing runtime services

ProjectSession is NOT responsible for:

- saving projects
- importing files
- exporting files
- translating text

---

# Architecture

```text
TranslationProject

↓

ProjectSession

↓

WorkflowExecutor

↓

Editor
```

---

# Lifecycle

```text
Created

↓

Opened

↓

Running

↓

Closing

↓

Closed
```

---

# Public API

```ts
interface ProjectSession {
  readonly id: string;

  readonly project: TranslationProject;

  readonly state: SessionState;

  readonly openedAt: Date;
}
```

---

# Dependency

Depends On

- TASK-0051 — TranslationProject
- TASK-0046 — WorkflowExecutor

---

# Risk

Medium

ProjectSession becomes the runtime entry point for Atlas Studio.

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

- [ ] ProjectSession implemented.
- [ ] Immutable project reference.
- [ ] Runtime lifecycle supported.
- [ ] Serializable runtime metadata.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio separates persistent project data from runtime session state.

---

# AI Constraints

Before implementation:

- Do not implement WorkflowExecutor.
- Do not implement autosave.
- Do not implement collaboration.
- Focus only on runtime session modeling.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0051-translation-project.md
- TASK-0046-workflow-executor.md

---

# Next Task

TASK-0056-project-lifecycle.md
