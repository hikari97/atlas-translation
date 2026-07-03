import type { ID } from '../common';

/**
 * Ordering data for a layer within a page hierarchy.
 */
export interface LayerOrder {
  readonly index: number;
  readonly zIndex: number;
  readonly parentLayerId?: ID<'layer'>;
  readonly previousLayerId?: ID<'layer'>;
  readonly nextLayerId?: ID<'layer'>;
}
