import type { BubbleType } from '@atlas/atlas-types';

/**
 * Lifecycle state for a bubble document.
 */
export interface BubbleState {
  readonly type: BubbleType;
  readonly locked: boolean;
  readonly visible: boolean;
}
