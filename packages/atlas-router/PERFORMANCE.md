# Performance

Atlas Router keeps the base contracts lightweight:

- Registry lookup uses `Map` by route identity.
- Collections copy route arrays for immutable views.
- Resolver candidate evaluation is explicit and deterministic.
- Providers remain outside this package.
