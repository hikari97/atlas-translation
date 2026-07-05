# Atlas Controller Performance

Atlas Controller keeps execution lightweight:

- Registries use map-backed lookup.
- Resolvers use descriptor-first lookup with optional lazy factory fallback.
- Dispatchers delegate to executors without framework adapters.
- Executors run a single async controller and preserve context.
- No route matcher, network server, dependency injection container, validator, parser, or serializer runs inside this package.

The benchmark in `benchmarks/executor.bench.ts` exercises repeated controller execution with context service mutation.
