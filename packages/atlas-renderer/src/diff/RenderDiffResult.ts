import type { RenderDiffOperation } from './RenderDiffOperation';

export interface RenderDiffResult {
  readonly operations: readonly RenderDiffOperation[];
  readonly changed: boolean;
}
