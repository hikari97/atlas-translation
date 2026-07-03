/**
 * Axis-aligned bounds represented by minimum and maximum coordinates.
 */
export interface BoundingBox {
  readonly minX: number;
  readonly minY: number;
  readonly maxX: number;
  readonly maxY: number;
}
