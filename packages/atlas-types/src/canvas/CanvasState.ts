import type { CanvasBounds } from './CanvasBounds';
import type { CanvasGrid } from './CanvasGrid';
import type { CanvasGuide } from './CanvasGuide';
import type { CanvasOverlay } from './CanvasOverlay';
import type { CanvasRuler } from './CanvasRuler';
import type { CanvasSnap } from './CanvasSnap';
import type { CanvasViewport } from './CanvasViewport';

/**
 * Current canvas configuration state.
 */
export interface CanvasState {
  readonly viewport: CanvasViewport;
  readonly bounds: CanvasBounds;
  readonly grid: CanvasGrid;
  readonly guides: readonly CanvasGuide[];
  readonly ruler: CanvasRuler;
  readonly overlays: readonly CanvasOverlay[];
  readonly snap: CanvasSnap;
}
