# Public API

## Root Import

```ts
import type { Bubble, Project, WorkflowDefinition } from '@atlas/atlas-types';
import { BubbleType, PluginType, WorkflowState } from '@atlas/atlas-types';
```

The root import is useful for application code that coordinates several Atlas domains.

## Group Imports

```ts
import type { ID, Rectangle } from '@atlas/atlas-types/foundation';
import type { Project, Workspace } from '@atlas/atlas-types/workspace';
import type { Canvas, Selection } from '@atlas/atlas-types/editor';
import type { Translation } from '@atlas/atlas-types/translation';
import type { Asset, Image } from '@atlas/atlas-types/resource';
import type { Plugin, WorkflowDefinition } from '@atlas/atlas-types/platform';
```

## Runtime Enums

Enums are exported as runtime values:

```ts
import { ExportFormat, PluginType, WorkflowState } from '@atlas/atlas-types';
```

## Naming Notes

Some domain files intentionally avoid names that would collide with shared enums:

- `WorkflowStateDefinition` is the workflow-state model; `WorkflowState` is the enum.
- `HistoryActionRecord` is the history-action model; `HistoryAction` is the enum.
- `EditorModeState` is the editor-mode model; `EditorMode` is the enum.
- `ExportFormatOptions` is the export-format model; `ExportFormat` is the enum.

## Package Name

The package is published as `@atlas/atlas-types`.
