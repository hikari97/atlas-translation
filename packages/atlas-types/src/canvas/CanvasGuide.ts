import type { ID, Nullable } from '../common';

/**
 * Positional guide line on the canvas.
 */
export interface CanvasGuide {
  readonly id: ID<'canvas-guide'>;
  readonly axis: 'x' | 'y';
  readonly position: number;
  readonly color: Nullable<string>;
  readonly locked: boolean;
}
