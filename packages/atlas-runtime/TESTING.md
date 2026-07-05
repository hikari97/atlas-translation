# Atlas Runtime Testing

Runtime validation is focused on type safety, public API stability, and provider independence.

## Commands

```sh
npm run typecheck
npm run test:types
```

## Coverage

- Runtime event type contracts
- Runtime hook type contracts
- Runtime pipeline type contracts
- Runtime registry type contracts
- Runtime discovery type contracts
- Runtime diagnostics type contracts
- Runtime error handling type contracts
- Public API entry point imports

## Forbidden Scope

Tests must not require applications, UI, databases, external providers, network servers, or hosting environments.

## Dependency Scan

Use `rg` to verify forbidden implementation dependencies:

```sh
rg "express|fastify|mongodb|mongoose|fetch\\(|createServer|listen\\(" src tests
```
