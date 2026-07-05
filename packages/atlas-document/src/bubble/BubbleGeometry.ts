import type { BoundingBox, Polygon } from '@atlas/atlas-types';

/**
 * Geometry for an editable bubble region.
 */
export interface BubbleGeometry {
  readonly bounds: BoundingBox;
  readonly outline: Polygon | null;
}
