# @atlas/atlas-types

Shared TypeScript contracts for Atlas Studio, the AI comic localization platform.

This package is the lowest-level package in the Atlas Studio dependency graph. It contains framework-independent data models only: no React, Next.js, Express, browser APIs, Node.js APIs, persistence, rendering, or AI provider logic.

## Installation

```bash
npm install @atlas/atlas-types
```

## Public API

Use the root entry point for broad access:

```ts
import type { Project, Bubble, WorkflowDefinition } from '@atlas/atlas-types';
import { PluginType, WorkflowState } from '@atlas/atlas-types';
```

Use grouped entry points when a package only needs one area of the model:

```ts
import type { Project } from '@atlas/atlas-types/workspace';
import type { Canvas } from '@atlas/atlas-types/editor';
import type { Asset } from '@atlas/atlas-types/resource';
import type { WorkflowDefinition } from '@atlas/atlas-types/platform';
```

The published package name is `@atlas/atlas-types`.

## Domain Groups

- `foundation`: common primitives, geometry, and shared enums.
- `workspace`: workspace, project, and page models.
- `editor`: editor, layer, bubble, typography, font, selection, and canvas models.
- `translation`: translation models.
- `resource`: asset and image models.
- `platform`: plugin, workflow, history, and export models.

## Scripts

```bash
npm run typecheck
npm run build
```

## Rules

- Interfaces and type aliases only for domain models.
- Runtime enums are allowed only in `src/enums`.
- No runtime dependencies.
- No `any`.
- Public exports must flow through barrel files.
- Canvas is a renderer concern elsewhere; JSON-compatible data remains the source of truth.

See [ARCHITECTURE.md](./ARCHITECTURE.md), [API.md](./API.md), and [TESTING.md](./TESTING.md) for package details.
