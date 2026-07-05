# Contributing

## Scope

Only add data contracts to this package. Do not add runtime behavior, framework imports, persistence, rendering, command execution, or provider-specific integrations.

## Development Workflow

1. Read the task file and package architecture.
2. Add or update small domain files.
3. Export new public models from the domain barrel.
4. Export new public modules from the root or group barrel when appropriate.
5. Run `npm run typecheck` and `npm run build`.

## Coding Rules

- Use TypeScript strict mode.
- Prefer `interface` for object contracts.
- Use `readonly` properties.
- Use `import type` for type-only imports.
- Do not use `any`.
- Do not introduce runtime dependencies.
- Keep public naming stable.

## Reviews

Reviewers should check domain boundaries, naming consistency, declaration output, package exports, and whether the change belongs in `atlas-types` at all.
