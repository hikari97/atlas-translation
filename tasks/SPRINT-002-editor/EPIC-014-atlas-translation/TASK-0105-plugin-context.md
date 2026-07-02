---
id: TASK-0105

title: Implement PluginContext

status: Ready

priority: Critical

story_points: 21

sprint: SPRINT-012-plugin-system

epic: EPIC-015

package: atlas-plugin

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0105 — Implement PluginContext

## Summary

Implement `PluginContext`.

PluginContext provides the controlled runtime environment through which plugins interact with Atlas Studio.

Plugins access editor capabilities exclusively through PluginContext.

PluginContext prevents direct access to internal implementation details.

---

# Capability

After this task is complete, Atlas Studio exposes a stable runtime API for plugins.

---

# Goal

Provide a secure plugin runtime context.

---

# Business Value

Supports:

- OCR plugins
- Translation plugins
- AI integrations
- Importers
- Exporters
- Marketplace
- Enterprise plugins

without exposing Atlas Studio internals.

---

# Background

Plugins require access to editor functionality.

Rather than exposing internal services, Atlas Studio provides PluginContext as a stable runtime API.

---

# Scope

## Included

- Plugin runtime context
- Extension lookup
- Command execution
- Event subscription
- Capability discovery

## Excluded

- Plugin loading
- Dependency injection
- Marketplace
- Permission enforcement

---

# Deliverables

```text
packages/
└── atlas-plugin/
    └── src/
        ├── PluginContext.ts
        ├── PluginCapability.ts
        ├── PluginServices.ts
        └── index.ts
```

---

# Responsibilities

PluginContext is responsible for:

- exposing plugin APIs
- exposing extension discovery
- exposing runtime services
- remaining implementation independent

PluginContext is NOT responsible for:

- loading plugins
- rendering
- dependency injection
- managing plugin lifecycle

---

# Architecture

```text
Atlas Core

↓

PluginContext

↓

Plugin

↓

Extension
```

---

# Public API

```ts
interface PluginContext {
  readonly extensions: ExtensionRegistry;

  readonly commands: CommandExecutor;

  readonly events: EventBus;
}
```

---

# Available Services

Supports:

- Extension Registry
- Command API
- Event API
- Logger (future)
- Settings (future)
- Storage (future)

---

# Dependency

Depends On

- TASK-0068 — EventBus
- TASK-0069 — CommandExecutor
- TASK-0104 — ExtensionRegistry

---

# Risk

High

PluginContext defines the long-term public API exposed to every Atlas Studio plugin.

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

- [ ] PluginContext implemented.
- [ ] Immutable.
- [ ] Exposes runtime APIs.
- [ ] Platform independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio exposes a stable runtime API to plugins through PluginContext.

---

# AI Constraints

Before implementation:

- Do not implement plugin loading.
- Do not implement dependency injection.
- Do not implement permission enforcement.
- Focus only on the PluginContext model.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0068-event-bus.md
- TASK-0069-command-executor.md
- TASK-0104-extension-registry.md

---

# Next Task

TASK-0106-plugin-events.md
