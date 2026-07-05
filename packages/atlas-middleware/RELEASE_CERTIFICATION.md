# Atlas Middleware Release Certification

Release checks:

- TypeScript strict typecheck passes.
- Type contract test project passes.
- Package build passes.
- Dry-run package contents include only release files.
- Source scan has no loose top types, unsafe casts, or pending-work markers.
- Runtime scan confirms no web framework, networking, server adapter, parser, validation, routing runtime, or dependency injection implementation.
