/**
 * Visibility flags for editor, render, and export surfaces.
 */
export interface LayerVisibility {
  readonly isVisible: boolean;
  readonly isRenderable: boolean;
  readonly isExportable: boolean;
  readonly isSelectable: boolean;
}
