import type { Timestamp } from '../common';

/**
 * Aggregated page counters and processing timestamps.
 */
export interface PageStatistics {
  readonly layerCount: number;
  readonly bubbleCount: number;
  readonly ocrRegionCount: number;
  readonly translationCount: number;
  readonly translatedBubbleCount: number;
  readonly reviewedBubbleCount: number;
  readonly assetCount: number;
  readonly lastRenderedAt?: Timestamp;
  readonly lastExportedAt?: Timestamp;
}
