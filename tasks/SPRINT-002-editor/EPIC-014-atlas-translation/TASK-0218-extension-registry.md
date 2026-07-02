---
id: TASK-0218

title: Implement ExtensionRegistry

status: Ready

priority: Critical

story_points: 21

sprint: SPRINT-023-extension-platform

epic: EPIC-018

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0218 — Implement ExtensionRegistry

## Summary

Implement `ExtensionRegistry`.

ExtensionRegistry provides the provider-independent catalog responsible for registering, indexing, discovering, and resolving Atlas extensions through immutable manifests.

The registry is the canonical source of extension metadata and dependency resolution.

---

# Capability

After this task is complete, Atlas Translation Platform can discover and resolve extensions through a centralized registry.

---

# Goal

Provide centralized extension catalog.

---

# Business Value

Supports

- Extension discovery
- Dependency resolution
- Capability lookup
- Version lookup
- Marketplace integration
- Future enterprise registries

without modifying ExtensionManager.

---

# Background

Extensions may exist before they are activated.

ExtensionRegistry tracks all known extensions independently from runtime lifecycle.

---

# Scope

## Included

- Registry contract
- Registration
- Discovery
- Dependency lookup
- Manifest lookup

## Excluded

- Extension execution
- Installation
- Marketplace implementation
- UI

---

# Deliverables

```text
atlas-translation/

ExtensionRegistry.ts

ExtensionRegistryEntry.ts

ExtensionRegistryQuery.ts

ExtensionRegistryResult.ts

ExtensionRegistryMetadata.ts

index.ts
```

---

# Responsibilities

ExtensionRegistry is responsible for

- registering manifests
- indexing extensions
- resolving dependencies
- discovering extensions
- exposing registry metadata

ExtensionRegistry is NOT responsible for

- activation
- runtime execution
- installation
- UI

---

# Architecture

```text
ExtensionManifest

↓

ExtensionRegistry

↓

ExtensionManager

↓

ExtensionRuntime
```

---

# Public API

```ts
interface ExtensionRegistry {
  register(manifest: ExtensionManifest): void;

  unregister(extensionId: string): void;

  resolve(query: ExtensionRegistryQuery): Promise<ExtensionRegistryResult>;
}
```

---

# Supported Features

Registry

- Registration
- Lookup
- Search
- Filtering

Resolution

- Dependency Resolution
- Version Resolution
- Capability Lookup

Future

- Organization Registry
- Remote Registry
- Marketplace Registry

---

# Dependency

Depends On

- TASK-0212 — ExtensionManager
- TASK-0217 — ExtensionManifest

---

# Risk

High

ExtensionRegistry becomes the centralized metadata catalog for every Atlas extension.

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

- [ ] ExtensionRegistry implemented.
- [ ] Supports registration and lookup.
- [ ] Supports dependency resolution.
- [ ] Provider independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Translation Platform manages extension metadata through a reusable ExtensionRegistry.

---

# AI Constraints

Before implementation

- Do not implement marketplace synchronization.
- Do not implement installation.
- Do not implement UI.
- Focus only on the ExtensionRegistry abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0212-extension-manager.md
- TASK-0217-extension-manifest.md

---

# Next Task

TASK-0219-extension-dependency-resolver.md
