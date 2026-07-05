# Atlas Runtime API

Atlas Runtime exposes provider-independent contracts from `@atlas/atlas-runtime`.

## Foundation

- `RuntimeEvent`
- `RuntimeHook`
- `RuntimePipeline`
- `RuntimeRegistry`

## Operations

- `RuntimeDiscovery`
- `RuntimeDiagnostics`
- `RuntimeErrorHandler`

## Factories

- `createRuntimeEvent`
- `createRuntimeHook`
- `createRuntimePipeline`
- `createRuntimeRegistry`
- `createStaticRuntimeDiscovery`
- `createRuntimeDiagnostics`
- `createRuntimeError`
- `createRuntimeErrorHandler`

## Import Rule

Consumers should import from the package entry point only:

```ts
import type { RuntimeEvent } from '@atlas/atlas-runtime';
```

Do not import from internal source files.
