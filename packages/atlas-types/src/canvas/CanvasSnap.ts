/**
 * Snapping configuration for canvas positioning.
 */
export interface CanvasSnap {
  readonly enabled: boolean;
  readonly snapToGrid: boolean;
  readonly snapToGuides: boolean;
  readonly snapToObjects: boolean;
  readonly tolerance: number;
}
