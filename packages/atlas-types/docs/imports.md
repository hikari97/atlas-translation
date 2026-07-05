# Import Conventions

Use type-only imports for contracts:

```ts
import type { Canvas } from '@atlas/atlas-types/editor';
```

Use value imports for enums:

```ts
import { WorkflowState } from '@atlas/atlas-types';
```

Prefer grouped imports in package code to make dependencies visible:

```ts
import type { Asset } from '@atlas/atlas-types/resource';
import type { WorkflowDefinition } from '@atlas/atlas-types/platform';
```

Avoid importing from internal source files outside this package. Public consumers should use the root or grouped entry points only.
