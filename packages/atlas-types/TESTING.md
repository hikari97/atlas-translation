# Testing

`atlas-types` uses TypeScript itself as the validation layer. The package contains no runtime behavior, so QA focuses on declaration generation, public API imports, strict type compatibility, and package exports.

## Commands

```bash
npm run typecheck
npm run build
npx tsc -p tsconfig.test.json
```

## Validation Files

- `tests/api.test-d.ts`: root public API smoke test.
- `tests/imports.test-d.ts`: grouped subpath import test.
- `tests/exports.test-d.ts`: enum/type naming collision test.
- `tests/compatibility.test-d.ts`: cross-domain compatibility test.
- `tests/public-api.test-d.ts`: stable public API entry-point test.

## Release Checks

Before release, run build, strict typecheck, declaration tests, dependency verification, and package dry-run.
