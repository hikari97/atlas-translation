# Contributing

## Rules

- Keep package dependencies limited to `@atlas/atlas-types` and `@atlas/atlas-document`.
- Do not add rendering, OCR, AI, events, or application workflows.
- Use TypeScript strict mode.
- Do not use `any`.
- Keep public API exports deliberate.

## Validation

```bash
npm run typecheck
npm run build
npm run test:types
```
