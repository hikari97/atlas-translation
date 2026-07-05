import type { JsonObject } from '../common';

/**
 * Visual overlay configuration for the canvas surface.
 */
export interface CanvasOverlay {
  readonly id: string;
  readonly visible: boolean;
  readonly opacity: number;
  readonly metadata?: JsonObject;
}
