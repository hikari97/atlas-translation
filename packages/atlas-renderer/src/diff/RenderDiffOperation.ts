import type { RenderNode } from '../tree';

export enum RenderDiffOperationType {
  Add = 'add',
  Remove = 'remove',
  Update = 'update'
}

export interface RenderDiffOperation {
  readonly type: RenderDiffOperationType;
  readonly sourceId: string;
  readonly node?: RenderNode | undefined;
}
