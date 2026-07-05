# Examples

## Project Reference

```ts
import type { ProjectReference } from '@atlas/atlas-types/workspace';

const project: ProjectReference = {
  id: 'project-1' as ProjectReference['id'],
  workspaceId: 'workspace-1' as ProjectReference['workspaceId'],
  name: 'Chapter 1',
  status: 'active',
  updatedAt: '2026-07-03T00:00:00.000Z' as ProjectReference['updatedAt']
};
```

## Workflow State

```ts
import type { WorkflowDefinition } from '@atlas/atlas-types/platform';
import { WorkflowState } from '@atlas/atlas-types';

declare const workflow: WorkflowDefinition;

const isRunning = workflow.state === WorkflowState.Running;
```

## Editor Canvas

```ts
import type { Canvas } from '@atlas/atlas-types/editor';

declare const canvas: Canvas;

const zoom = canvas.state.viewport.zoom;
```
