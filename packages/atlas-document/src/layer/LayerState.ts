import type { LayerType } from '@atlas/atlas-types';

/**
 * Lifecycle state for a layer document.
 */
export interface LayerState {
  readonly type: LayerType;
  readonly visible: boolean;
  readonly locked: boolean;
}
