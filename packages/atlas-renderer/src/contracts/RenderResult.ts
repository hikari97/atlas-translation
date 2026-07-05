import type { RenderTree } from '../tree';

export enum RenderResultStatus {
  Success = 'success',
  Failed = 'failed',
  Skipped = 'skipped'
}

export interface RenderResult {
  readonly status: RenderResultStatus;
  readonly tree: RenderTree | null;
  readonly errors: readonly string[];
}
