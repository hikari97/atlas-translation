import type { Timestamp } from '../common';

/**
 * Image usage and processing metadata.
 */
export interface ImageStatistics {
  readonly sizeBytes: number;
  readonly usageCount: number;
  readonly lastAccessedAt?: Timestamp;
  readonly lastProcessedAt?: Timestamp;
}
