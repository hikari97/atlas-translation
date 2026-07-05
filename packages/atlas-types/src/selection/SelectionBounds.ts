import type { BoundingBox, Point } from '../geometry';

/**
 * Geometric bounds describing the selected area.
 */
export interface SelectionBounds {
  readonly bounds: BoundingBox;
  readonly anchor: Point;
  readonly handles: readonly Point[];
}
