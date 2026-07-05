import type { Timestamp } from '@atlas/atlas-types';
import type { RenderNode } from './RenderNode';

export interface RenderTree {
  readonly root: RenderNode;
  readonly createdAt: Timestamp;
}
