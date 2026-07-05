# Atlas Validation Performance

Atlas Validation keeps execution lightweight:

- Registries use map-backed lookup.
- Resolvers use descriptor-first lookup with optional lazy factory fallback.
- Rule collections are immutable values.
- Executors aggregate rule issues without schema runtime dependencies.
- No parser, web framework, network server, dependency injection container, or response generator runs inside this package.

The benchmark in `benchmarks/executor.bench.ts` exercises repeated validation execution.
