---
id: TASK-0125

title: Implement Import Events

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

# TASK-0125 — Implement Import Events

## Summary

Implement `ImportEvent`.

Import Events represent immutable runtime notifications emitted during document import.

They allow user interfaces, plugins, diagnostics, and automation systems to observe import activity without depending on ImportPipeline implementations.

Import Events never modify import behavior.

---

# Capability

After this task is complete, Atlas Studio exposes standardized import lifecycle events.

---

# Goal

Provide observable import lifecycle.

---

# Business Value

Supports:

- Import progress monitoring
- Plugin integration
- Diagnostics
- Automation
- Benchmarking
- Future telemetry

without coupling observers to ImportPipeline.

---

# Background

Import operations naturally generate lifecycle events.

Observers consume immutable ImportEvents rather than relying on internal pipeline execution.

---

# Scope

## Included

- Import event contract
- Event metadata
- Lifecycle events

## Excluded

- EventBus implementation
- Rendering
- Parsing implementation
- Progress UI

---

# Deliverables

```text
packages/
└── atlas-import/
    └── src/
        ├── ImportEvent.ts
        ├── ImportEventType.ts
        ├── ImportEventMetadata.ts
        └── index.ts
```

---

# Responsibilities

ImportEvent is responsible for:

- exposing import lifecycle notifications
- providing immutable metadata
- supporting observers

ImportEvent is NOT responsible for:

- dispatching
- rendering
- parsing
- UI

---

# Architecture

```text
ImportPipeline

↓

ImportEvent

↓

Plugin

↓

UI

↓

Logger
```

---

# Public API

```ts
interface ImportEvent {
  readonly id: string;

  readonly type: ImportEventType;

  readonly timestamp: Date;

  readonly importId: string;
}
```

---

# Suggested Event Types

- ImportStarted
- StageStarted
- StageCompleted
- ImportProgressUpdated
- ImportCompleted
- ImportFailed
- ImportCancelled

---

# Dependency

Depends On

- TASK-0106 — PluginEvents
- TASK-0123 — ImportPipeline

---

# Risk

Low

ImportEvent provides standardized import lifecycle notifications.

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

- [ ] ImportEvent implemented.
- [ ] Immutable.
- [ ] Serializable.
- [ ] Supports lifecycle notifications.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio exposes standardized import lifecycle events.

---

# AI Constraints

Before implementation:

- Do not implement EventBus.
- Do not implement progress UI.
- Do not implement telemetry.
- Focus only on the ImportEvent model.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0106-plugin-events.md
- TASK-0123-import-pipeline.md

---

# Next Task

TASK-0126-import-progress.md
