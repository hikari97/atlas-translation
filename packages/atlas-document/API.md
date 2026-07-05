# Public API

## Root

```ts
import { AtlasDocument, WorkspaceDocument } from '@atlas/atlas-document';
```

## Subpaths

```ts
import { ProjectDocument } from '@atlas/atlas-document/project';
import { PageDocument } from '@atlas/atlas-document/page';
import { LayerDocument } from '@atlas/atlas-document/layer';
import { BubbleDocument } from '@atlas/atlas-document/bubble';
import { TranslationDocument } from '@atlas/atlas-document/translation';
import { DocumentCollection } from '@atlas/atlas-document/collection';
import { DocumentTraverser } from '@atlas/atlas-document/traversal';
```

## Frameworks

```ts
import type { Serializer } from '@atlas/atlas-document/serialization';
import { SnapshotFactory } from '@atlas/atlas-document/snapshot';
import { DocumentDiffer } from '@atlas/atlas-document/diff';
import { MutationPipeline } from '@atlas/atlas-document/mutation';
```

## Naming

The implemented package name is `@atlas/atlas-document`. Some roadmap examples use `@atlas/document`; package metadata and tests follow the implemented monorepo naming pattern.
