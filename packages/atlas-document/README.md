# @atlas/atlas-document

Document Object Model foundation for Atlas Studio.

This package builds on `@atlas/atlas-types` and provides framework-independent document classes, collection utilities, and infrastructure contracts for serialization, traversal, snapshots, diffs, and mutations.

## Responsibilities

- Represent the Atlas Studio document hierarchy.
- Encapsulate child document collections.
- Provide format-agnostic infrastructure contracts.
- Stay independent from rendering, OCR, AI providers, persistence, commands, and events.

## Imports

```ts
import { AtlasDocument } from '@atlas/atlas-document';
import { ProjectDocument } from '@atlas/atlas-document/project';
import { DocumentCollection } from '@atlas/atlas-document/collection';
```

## Scripts

```bash
npm run typecheck
npm run build
npm run test:types
```

The package name is `@atlas/atlas-document`.
