# Atlas Config Testing

## Commands

```sh
npm run typecheck
npm run test
npm run test:types
npm run build
```

## Coverage

- Config types
- Schema defaults
- Static sources
- Parser and validator contracts
- Normalization and merge
- Environment overlays
- Secret redaction
- Safe serialization
- Diagnostic formatting
- Source failure diagnostics
- Runtime and plugin integration contracts
- Watch subscription contracts
- Public API imports

Tests must not use application code, UI, filesystem loading, network loading, databases, or provider integrations.
