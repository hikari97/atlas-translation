---
id: TASK-0106

title: Implement Plugin Events

status: Ready

priority: Medium

story_points: 13

sprint: SPRINT-012-plugin-system

epic: EPIC-015

package: atlas-plugin

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0106 — Implement Plugin Events

## Summary

Implement `PluginEvent`.

Plugin Events represent immutable runtime notifications exposed to plugins.

Plugin Events allow plugins to observe Atlas Studio behavior without depending on internal runtime implementations.

Plugin Events never modify editor state.

---

# Capability

After this task is complete, Atlas Studio exposes standardized runtime events to plugins.

---

# Goal

Provide observable plugin runtime events.

---

# Business Value

Supports:

- Plugin automation
- Plugin synchronization
- Diagnostics
- Analytics
- Logging
- Future marketplace extensions

without coupling plugins to Atlas Studio internals.

---

# Background

Plugins frequently need to react to editor activity.

Rather than exposing internal EventBus implementations, Atlas Studio exposes immutable Plugin Events.

---

# Scope

## Included

- Plugin event contract
- Event metadata
- Event typing
- Runtime notifications

## Excluded

- EventBus implementation
- Rendering
- Plugin loading
- Analytics

---

# Deliverables

```text
packages/
└── atlas-plugin/
    └── src/
        ├── PluginEvent.ts
        ├── PluginEventType.ts
        ├── PluginEventMetadata.ts
        └── index.ts
```

---

# Responsibilities

PluginEvent is responsible for:

- exposing immutable runtime events
- describing editor activity
- supporting plugin observers

PluginEvent is NOT responsible for:

- dispatching
- rendering
- plugin loading
- command execution

---

# Architecture

```text
Atlas Core

↓

PluginEvent

↓

Plugin Event API

↓

Plugin
```

---

# Public API

```ts
interface PluginEvent {
  readonly id: string;

  readonly type: PluginEventType;

  readonly timestamp: Date;
}
```

---

# Example Event Types

Minimum events:

- DocumentOpened
- DocumentClosed
- SelectionChanged
- ToolChanged
- CommandExecuted
- CommandUndone
- ProjectSaved
- ProjectLoaded
- PluginActivated
- PluginDeactivated

---

# Dependency

Depends On

- TASK-0068 — EventBus
- TASK-0105 — PluginContext

---

# Risk

Medium

Plugin Events provide a stable event model for every plugin.

---

# Files Allowed

```text
packages/atlas-plugin/src/**
```

---

# Files Forbidden

```text
packages/atlas-editor/**
packages/atlas-renderer/**
packages/atlas-input/**
packages/atlas-project/**
apps/**
```

---

# Acceptance Criteria

- [ ] PluginEvent implemented.
- [ ] Immutable.
- [ ] Serializable.
- [ ] Supports runtime notifications.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio exposes standardized runtime events for plugins.

---

# AI Constraints

Before implementation:

- Do not implement EventBus.
- Do not implement analytics.
- Do not implement plugin loading.
- Focus only on the PluginEvent model.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0068-event-bus.md
- TASK-0105-plugin-context.md

---

# Next Task

TASK-0107-plugin-settings.md
