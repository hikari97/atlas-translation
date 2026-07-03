import type { BoundingBox, Matrix, Transform } from '../geometry';

/**
 * Positioning and bounds data for a layer.
 */
export interface LayerTransform {
  readonly transform: Transform;
  readonly matrix?: Matrix;
  readonly bounds?: BoundingBox;
}
