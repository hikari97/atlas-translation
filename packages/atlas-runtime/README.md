# Atlas Runtime

Provider-independent runtime contracts for Atlas Studio backend components.

This package contains runtime abstractions only. It does not implement HTTP servers, dependency injection, databases, external providers, networking, UI, or application routes.

## Public API

Import runtime contracts from the package entry point:

```ts
import {
  createRuntimeEvent,
  createRuntimeRegistry,
  createStaticRuntimeDiscovery,
  type RuntimeEvent,
  type RuntimeRegistry,
} from '@atlas/atlas-runtime';
```

## Included

- Runtime events, hooks, pipelines, and registries
- Runtime discovery contracts
- Runtime diagnostics contracts
- Runtime error handling contracts
- Type-only validation for public API consumers

## Excluded

- HTTP servers
- Network listeners
- Dependency injection containers
- Database integrations
- External provider integrations
- UI or application route code

## Validation

```sh
npm run typecheck
npm run test:types
```
