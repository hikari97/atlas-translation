import type { ID, JsonObject, Timestamp } from '../common';
import type { BubbleTag } from './BubbleTag';

/**
 * Ownership, detection, and audit metadata for a bubble.
 */
export interface BubbleMetadata {
  readonly createdBy: ID<'user'>;
  readonly updatedBy?: ID<'user'>;
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;
  readonly detectedBy?: ID<'plugin'>;
  readonly detectedAt?: Timestamp;
  readonly source: 'manual' | 'detected' | 'imported';
  readonly tags: readonly BubbleTag[];
  readonly custom?: JsonObject;
}
