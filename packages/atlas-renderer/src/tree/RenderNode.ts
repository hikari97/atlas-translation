import type { ID, JsonObject } from '@atlas/atlas-types';

export enum RenderNodeKind {
  Root = 'root',
  Workspace = 'workspace',
  Project = 'project',
  Page = 'page',
  Layer = 'layer',
  Bubble = 'bubble',
  Primitive = 'primitive'
}

export interface RenderNode {
  readonly id: ID<'render-node'>;
  readonly sourceId: string;
  readonly kind: RenderNodeKind;
  readonly props: JsonObject;
  readonly children: readonly RenderNode[];
}

export function createRenderNode(
  id: ID<'render-node'>,
  sourceId: string,
  kind: RenderNodeKind,
  props: JsonObject,
  children: readonly RenderNode[] = []
): RenderNode {
  return Object.freeze({
    id,
    sourceId,
    kind,
    props,
    children: children.slice()
  });
}
