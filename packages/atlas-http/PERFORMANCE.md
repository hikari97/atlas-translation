# Performance

Atlas HTTP keeps runtime work small by using simple maps for registries and immutable value objects for protocol descriptions.

## Baseline

- Method lookup: `Map` lookup by normalized name
- Status lookup: `Map` lookup by numeric code
- Header lookup: normalized lower-case key
- Pipeline ordering: explicit sort by stage order

Run the local benchmark with:

```sh
npx tsx benchmarks/registry.bench.ts
```
