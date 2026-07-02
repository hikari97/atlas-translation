---
id: TASK-0132

title: Implement AssetManager

status: Ready

priority: Critical

story_points: 21

sprint: SPRINT-015-asset-management

epic: EPIC-014

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0132 — Implement AssetManager

## Summary

Implement `AssetManager`.

AssetManager coordinates asset providers and provides a unified interface for loading, resolving, registering, and unloading assets.

AssetManager is provider independent.

---

# Capability

After this task is complete, Atlas Translation Platform can manage assets through a centralized runtime.

---

# Goal

Provide centralized asset management.

---

# Business Value

Supports:

- Multiple asset providers
- Shared asset access
- Plugin-defined assets
- Future cloud assets

without changing Atlas Core.

---

# Background

Assets may come from different providers.

AssetManager coordinates providers and exposes a unified asset runtime.

---

# Scope

## Included

- Provider registration
- Asset lookup
- Asset loading
- Asset unloading

## Excluded

- Asset cache
- Asset indexing
- Asset editing
- Rendering

---

# Deliverables

```text
atlas-translation/

AssetManager.ts

AssetRegistry.ts

AssetProviderResolver.ts

index.ts
```

---

# Responsibilities

AssetManager is responsible for:

- registering providers
- resolving providers
- loading assets
- unloading assets
- exposing asset runtime

AssetManager is NOT responsible for:

- caching
- rendering
- editing
- UI

---

# Architecture

```text
AssetRequest

↓

AssetManager

↓

AssetProviderResolver

↓

AssetProvider

↓

Asset
```

---

# Public API

```ts
interface AssetManager {
  register(provider: AssetProvider): void;

  load(request: AssetRequest): Promise<Asset>;

  unload(id: string): Promise<void>;
}
```

---

# Supported Features

- Provider registration
- Asset lookup
- Multiple providers
- Plugin providers
- Runtime asset loading

---

# Dependency

Depends On

- TASK-0131 — AssetProvider
- TASK-0103 — PluginManager

---

# Risk

High

AssetManager becomes the centralized runtime for all asset operations.

---

# Files Allowed

```text
atlas-translation/**
```

---

# Files Forbidden

```text
None
```

---

# Acceptance Criteria

- [ ] AssetManager implemented.
- [ ] Supports provider registration.
- [ ] Provider independent.
- [ ] Platform independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Translation Platform manages assets through AssetManager using interchangeable AssetProviders.

---

# AI Constraints

Before implementation:

- Do not implement caching.
- Do not implement rendering.
- Do not implement editing.
- Focus only on asset coordination.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0103-plugin-manager.md
- TASK-0131-asset-provider.md

---

# Next Task

TASK-0133-asset-pipeline.md
