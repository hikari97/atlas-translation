import type { ID, Timestamp } from '../common';

/**
 * Lightweight reference to a canvas.
 */
export interface CanvasReference {
  readonly id: ID<'canvas'>;
  readonly editorId: ID<'editor'>;
  readonly pageId: ID<'page'>;
  readonly updatedAt: Timestamp;
}
