---
id: TASK-0104

title: Implement ExtensionRegistry

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

# TASK-0104 — Implement ExtensionRegistry

## Summary

Implement `ExtensionRegistry`.

ExtensionRegistry maintains the runtime registry of all extensions contributed by active plugins.

It provides discovery, lookup, and lifecycle coordination for registered extensions.

ExtensionRegistry is platform independent.

---

# Capability

After this task is complete, Atlas Studio can discover and resolve plugin extensions through a centralized registry.

---

# Goal

Provide centralized extension management.

---

# Business Value

Supports:

- OCR providers
- Translation providers
- AI providers
- Importers
- Exporters
- Custom tools
- Marketplace extensions

without coupling Atlas Studio Core to plugin implementations.

---

# Background

Plugins contribute one or more Extensions.

ExtensionRegistry indexes those extensions by ExtensionPoint.

Atlas Studio queries ExtensionRegistry instead of individual plugins.

---

# Scope

## Included

- Extension registration
- Extension lookup
- Extension removal
- Extension discovery

## Excluded

- Plugin loading
- Dependency injection
- Marketplace
- Version conflict resolution

---

# Deliverables

```text
packages/
└── atlas-plugin/
    └── src/
        ├── ExtensionRegistry.ts
        ├── RegisteredExtension.ts
        ├── ExtensionLookup.ts
        └── index.ts
```

---

# Responsibilities

ExtensionRegistry is responsible for:

- registering extensions
- unregistering extensions
- resolving extensions
- exposing extension lookup APIs

ExtensionRegistry is NOT responsible for:

- loading plugins
- dependency resolution
- rendering
- editor behavior

---

# Architecture

```text
PluginManager

↓

ExtensionRegistry

↓

ExtensionPoint

↓

Atlas Core
```

---

# Public API

```ts
interface ExtensionRegistry {
  register(extension: Extension): void;

  unregister(extensionId: string): void;

  resolve<TExtension>(extensionPointId: string): readonly TExtension[];
}
```

---

# Supported Features

- Extension registration
- Extension removal
- Lookup by ExtensionPoint
- Multiple implementations
- Immutable lookup results

---

# Dependency

Depends On

- TASK-0102 — PluginManager
- TASK-0103 — ExtensionPoint

---

# Risk

High

ExtensionRegistry becomes the runtime discovery mechanism for every plugin capability.

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

- [ ] ExtensionRegistry implemented.
- [ ] Supports extension registration.
- [ ] Supports extension lookup.
- [ ] Platform independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio resolves plugin extensions through a centralized ExtensionRegistry.

---

# AI Constraints

Before implementation:

- Do not implement plugin loading.
- Do not implement dependency injection.
- Do not implement version conflict resolution.
- Focus only on extension registration and lookup.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0102-plugin-manager.md
- TASK-0103-extension-point.md

---

# Next Task

TASK-0105-plugin-context.md
