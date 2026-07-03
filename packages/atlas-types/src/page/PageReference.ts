import type { ID, Timestamp } from '../common';

/**
 * Lightweight reference to a page.
 */
export interface PageReference {
  readonly id: ID<'page'>;
  readonly projectId: ID<'project'>;
  readonly index: number;
  readonly name: string;
  readonly thumbnailAssetId?: ID<'asset'>;
  readonly updatedAt: Timestamp;
}
