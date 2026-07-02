---
id: TASK-0057

title: Implement Project Events

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

# TASK-0057 — Implement Project Events

## Summary

Implement Project Events.

Project Events represent immutable notifications emitted during the lifecycle of a TranslationProject and ProjectSession.

Project Events allow UI, plugins, logging, and automation to observe project lifecycle changes without coupling to ProjectLifecycle.

Project Events never modify project state.

---

# Capability

After this task is complete, Atlas Studio can publish standardized project lifecycle events.

---

# Goal

Provide a provider-independent event model for project lifecycle.

---

# Business Value

Project Events enable:

- activity logging
- autosave triggers
- UI updates
- plugin integration
- diagnostics
- future collaboration

without modifying ProjectLifecycle.

---

# Background

Projects naturally produce lifecycle events.

Examples:

Project Created

↓

Project Opened

↓

Project Saved

↓

Project Closed

Events describe what happened.

They never execute project logic.

---

# Scope

## Included

- Event contract
- Event metadata
- Lifecycle event types

## Excluded

- Event Bus
- Logging
- Autosave
- Collaboration

---

# Deliverables

```text
packages/
└── atlas-project/
    └── src/
        ├── ProjectEvent.ts
        ├── ProjectEventType.ts
        └── index.ts
```

---

# Responsibilities

Project Events are responsible for:

- describing project lifecycle
- exposing immutable event data
- supporting observers

Project Events are NOT responsible for:

- dispatching events
- saving projects
- executing workflows
- updating UI

---

# Architecture

```text
ProjectLifecycle

↓

ProjectEvent

↓

UI
Logger
Plugin
Autosave
```

---

# Event Types

Minimum supported events:

- ProjectCreated
- ProjectOpened
- ProjectModified
- ProjectSaved
- ProjectClosing
- ProjectClosed
- ProjectDeleted

---

# Public API

```ts
interface ProjectEvent {
  readonly id: string;

  readonly type: ProjectEventType;

  readonly projectId: string;

  readonly timestamp: Date;
}
```

---

# Dependency

Depends On

- TASK-0051 — TranslationProject
- TASK-0056 — ProjectLifecycle

---

# Risk

Low

Project Events are immutable runtime notifications.

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

- [ ] ProjectEvent implemented.
- [ ] Immutable.
- [ ] Serializable.
- [ ] Supports lifecycle events.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio exposes project lifecycle events independently from ProjectLifecycle implementation.

---

# AI Constraints

Before implementation:

- Do not implement Event Bus.
- Do not implement logging.
- Do not implement autosave.
- Focus only on the event model.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0051-translation-project.md
- TASK-0056-project-lifecycle.md

---

# Next Task

TASK-0058-project-history.md
