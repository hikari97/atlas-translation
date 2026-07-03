import type { ID, Timestamp } from '../common';

/**
 * Lightweight reference to a typography preset or assignment.
 */
export interface TypographyReference {
  readonly id: ID<'typography'>;
  readonly projectId?: ID<'project'>;
  readonly bubbleId?: ID<'bubble'>;
  readonly layerId?: ID<'layer'>;
  readonly name: string;
  readonly updatedAt: Timestamp;
}
