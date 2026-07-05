# Performance

The core path is allocation-light and provider-neutral. Registry lookups are backed by in-memory maps and resolver execution performs a single descriptor lookup before invoking the strategy.

Run `benchmarks/engine.bench.ts` through a TypeScript runner after build tooling is available for local measurement.
