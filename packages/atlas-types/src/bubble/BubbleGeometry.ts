import type { BoundingBox, Point, Polygon, Rectangle } from '../geometry';

/**
 * Geometry data describing a bubble region and its editable text area.
 */
export interface BubbleGeometry {
  readonly bounds: BoundingBox;
  readonly polygon?: Polygon;
  readonly textBounds?: Rectangle;
  readonly tailPoints: readonly Point[];
  readonly rotation: number;
}
