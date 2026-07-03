import type { ID, Timestamp } from '../common';
import type { PageDimensions } from './PageDimensions';

/**
 * Compact page data for lists, strips, and navigation.
 */
export interface PageSummary {
  readonly id: ID<'page'>;
  readonly projectId: ID<'project'>;
  readonly index: number;
  readonly name: string;
  readonly dimensions: PageDimensions;
  readonly bubbleCount: number;
  readonly translatedBubbleCount: number;
  readonly thumbnailAssetId?: ID<'asset'>;
  readonly updatedAt: Timestamp;
}
