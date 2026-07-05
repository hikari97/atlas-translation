import type { Point, Size } from '../geometry';

/**
 * Canvas viewport transform state.
 */
export interface CanvasViewport {
  readonly size: Size;
  readonly zoom: number;
  readonly pan: Point;
  readonly rotation: number;
}
