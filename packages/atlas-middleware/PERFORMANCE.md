# Atlas Middleware Performance

Atlas Middleware keeps execution lightweight:

- Registries use map-backed lookup.
- Pipelines are immutable values produced by builder operations.
- Chains use indexed cursors for ordered traversal.
- Executor dispatch is async and context-preserving.
- No framework adapter, network server, dependency injection container, or transport runtime runs inside this package.

The benchmark in `benchmarks/pipeline.bench.ts` exercises repeated pipeline execution with context service mutation.
