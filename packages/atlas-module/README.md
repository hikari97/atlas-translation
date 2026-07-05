# @atlas/atlas-module

Provider-independent module system contracts for Atlas Studio.

## Overview

The `atlas-module` package provides the module system foundation for Atlas Studio.

It defines module manifests, definitions, registries, loaders, dependency graphs, cycle detection, lifecycle management, and integration bindings.

## Public API

All contracts are exported from the package entry point:

```ts
import {
  defineModule,
  createModuleManifest,
  createModuleRegistry,
  loadModules,
  createModuleGraph,
  detectModuleCycles,
} from '@atlas/atlas-module';
```

## Concepts

- **Module Manifest** — declarative module identity, version, capabilities, and dependencies.
- **Module Definition** — explicit module declaration with lifecycle hooks.
- **Module Registry** — isolated registry storing module definitions by ID.
- **Module Loader** — deterministic loader resolving dependency order.
- **Module Graph** — dependency graph with topological sort.
- **Module Lifecycle** — phase-based lifecycle (created → registered → loaded → initialized → active → disposed).

## Design Principles

- Framework-independent.
- Provider-independent.
- No filesystem or network assumptions.
- Immutable contracts.
- TypeScript strict mode.
