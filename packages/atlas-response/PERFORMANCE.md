# Atlas Response Performance

Atlas Response keeps response contracts lightweight:

- Header and cookie lookups use normalized map keys.
- Builders reuse mutable construction state until `build()` returns a response aggregate.
- Metadata and lifecycle collections are in-memory and bounded by caller usage.
- No runtime delivery, compression, streaming, or storage work happens inside the package.

The benchmark in `benchmarks/collection.bench.ts` exercises repeated header and cookie collection access.
