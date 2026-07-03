# @atlas/atlas-types

Shared TypeScript contracts for Atlas Studio.

This package is the lowest-level package in the Atlas Studio dependency graph. It must remain framework-independent and free from runtime dependencies.

## Status

Initialized for `TASK-0001 — Initialize atlas-types Package`.

Domain models are intentionally not implemented in this task.

## Public API

The public API is exposed from:

```ts
import {} from '@atlas/atlas-types';
```

## Scripts

```bash
npm run typecheck
npm run build
```

## Package Rules

- No runtime dependencies.
- No React, browser, Node.js, or Atlas package dependencies.
- Export only through `src/index.ts`.
- Keep TypeScript strict mode enabled.
