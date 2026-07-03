import type { Rectangle, Size } from '../geometry';

/**
 * Physical and logical dimensions for a page.
 */
export interface PageDimensions {
  readonly size: Size;
  readonly cropBox?: Rectangle;
  readonly contentBox?: Rectangle;
  readonly bleedBox?: Rectangle;
}
