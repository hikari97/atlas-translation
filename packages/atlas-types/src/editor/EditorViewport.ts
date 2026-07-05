import type { Point, Size } from '../geometry';

/**
 * Visible editor viewport and transform state.
 */
export interface EditorViewport {
  readonly size: Size;
  readonly zoom: number;
  readonly pan: Point;
  readonly rotation: number;
}
