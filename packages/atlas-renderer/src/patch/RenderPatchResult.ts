import type { RenderTree } from '../tree';

export interface RenderPatchResult {
  readonly tree: RenderTree;
  readonly applied: number;
}
