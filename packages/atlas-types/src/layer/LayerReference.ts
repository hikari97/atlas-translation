import type { ID, Timestamp } from '../common';
import type { LayerType } from '../enums';

/**
 * Lightweight reference to a layer.
 */
export interface LayerReference {
  readonly id: ID<'layer'>;
  readonly pageId: ID<'page'>;
  readonly name: string;
  readonly type: LayerType;
  readonly index: number;
  readonly isVisible: boolean;
  readonly updatedAt: Timestamp;
}
