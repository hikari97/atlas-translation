import type { Timestamp } from '../common';

/**
 * Aggregated workspace counters.
 */
export interface WorkspaceStatistics {
  readonly projectCount: number;
  readonly pageCount: number;
  readonly assetCount: number;
  readonly bubbleCount: number;
  readonly translatedBubbleCount: number;
  readonly totalStorageBytes: number;
  readonly lastOpenedAt?: Timestamp;
}
