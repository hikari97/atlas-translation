---
id: TASK-0056

title: Implement ProjectLifecycle

status: Completed

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

# TASK-0056 — Implement ProjectLifecycle

## Summary

Implement `ProjectLifecycle`.

ProjectLifecycle coordinates the lifecycle of a TranslationProject from creation until closure.

It manages session creation, initialization, activation, suspension, and shutdown.

ProjectLifecycle never executes workflows or performs translation.

---

# Capability

After this task is complete, Atlas Studio can consistently manage project lifecycle operations.

---

# Goal

Provide a centralized lifecycle manager for TranslationProject and ProjectSession.

---

# Business Value

Provides predictable project behavior for:

- opening projects
- closing projects
- creating sessions
- restoring runtime state
- future autosave integration

---

# Background

Project lifecycle should not be scattered across UI and runtime.

Instead a single lifecycle service coordinates all project state transitions.

---

# Scope

## Included

- Open project
- Close project
- Session creation
- Session disposal
- Lifecycle state transitions

## Excluded

- Autosave
- Import
- Export
- Workflow execution
- Collaboration

---

# Deliverables

```text
packages/
└── atlas-project/
    └── src/
        ├── ProjectLifecycle.ts
        └── index.ts
```

---

# Responsibilities

ProjectLifecycle is responsible for:

- opening projects
- creating ProjectSession
- closing sessions
- managing lifecycle transitions

ProjectLifecycle is NOT responsible for:

- executing workflows
- translating text
- importing projects
- exporting projects

---

# Architecture

```text
TranslationProject

↓

ProjectLifecycle

↓

ProjectSession

↓

WorkflowExecutor
```

---

# Lifecycle Flow

```text
Create Project

↓

Open

↓

Session Created

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
interface ProjectLifecycle {
  open(project: TranslationProject): ProjectSession;

  close(session: ProjectSession): void;
}
```

---

# Dependency

Depends On

- TASK-0051 — TranslationProject
- TASK-0055 — ProjectSession

---

# Risk

Low

ProjectLifecycle coordinates project runtime but does not own project data.

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

- [ ] ProjectLifecycle implemented.
- [ ] Can open projects.
- [ ] Can create ProjectSession.
- [ ] Can close sessions.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio manages project lifecycle through a dedicated ProjectLifecycle service.

---

# AI Constraints

Before implementation:

- Do not execute workflows.
- Do not implement autosave.
- Do not implement persistence.
- Focus only on lifecycle management.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0051-translation-project.md
- TASK-0055-project-session.md

---

# Next Task

TASK-0057-project-events.md
