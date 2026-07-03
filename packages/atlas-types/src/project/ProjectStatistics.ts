import type { Timestamp } from '../common';

/**
 * Aggregated project counters and progress data.
 */
export interface ProjectStatistics {
  readonly pageCount: number;
  readonly assetCount: number;
  readonly bubbleCount: number;
  readonly translatedBubbleCount: number;
  readonly reviewedBubbleCount: number;
  readonly approvedBubbleCount: number;
  readonly completionPercentage: number;
  readonly totalStorageBytes: number;
  readonly lastOpenedAt?: Timestamp;
}
