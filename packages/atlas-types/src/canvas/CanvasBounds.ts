import type { Rectangle, Size } from '../geometry';

/**
 * Workspace limits and safe drawing area for a canvas.
 */
export interface CanvasBounds {
  readonly size: Size;
  readonly workspace: Rectangle;
  readonly safeArea: Rectangle;
}
