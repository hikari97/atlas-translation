# Contributing

## Scope

Only add document model or framework code that belongs in the document layer. Rendering, OCR, AI provider logic, persistence, commands, events, and UI behavior belong in later packages.

## Rules

- Use TypeScript strict mode.
- Keep mutable collections encapsulated.
- Expose stable public APIs through barrels.
- Depend only on `@atlas/atlas-types`.
- Do not use `any`.
- Prefer small files with one responsibility.

## Validation

Run:

```bash
npm run typecheck
npm run build
npm run test:types
```
