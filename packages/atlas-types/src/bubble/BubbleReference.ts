import type { ID, Timestamp } from '../common';
import type { BubbleType } from '../enums';
import type { BoundingBox } from '../geometry';

/**
 * Lightweight reference to a bubble.
 */
export interface BubbleReference {
  readonly id: ID<'bubble'>;
  readonly pageId: ID<'page'>;
  readonly layerId?: ID<'layer'>;
  readonly type: BubbleType;
  readonly bounds: BoundingBox;
  readonly updatedAt: Timestamp;
}
