import type { Size } from '../geometry';

/**
 * Grid configuration for canvas alignment.
 */
export interface CanvasGrid {
  readonly visible: boolean;
  readonly size: Size;
  readonly color: string;
  readonly opacity: number;
}
