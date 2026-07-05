# Examples

## Collection

```ts
import { DocumentCollection } from '@atlas/atlas-document/collection';
import type { IdentifiableDocument } from '@atlas/atlas-document/collection';

declare const document: IdentifiableDocument;

const collection = new DocumentCollection([document]);
const exists = collection.has(document.id);
```

## Traversal

```ts
import { DocumentTraverser, TraversalStrategy } from '@atlas/atlas-document/traversal';

const traverser = new DocumentTraverser();

const result = traverser.traverse(
  { id: 'root' as never, children: [] },
  { visit: () => undefined },
  { strategy: TraversalStrategy.DepthFirst, includeRoot: true }
);
```

## Snapshot

```ts
import { SnapshotFactory } from '@atlas/atlas-document/snapshot';

const factory = new SnapshotFactory();
```
