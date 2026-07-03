import type { JsonObject, Nullable } from '../common';

/**
 * Presentation data shared by editable layers.
 */
export interface LayerStyle {
  readonly opacity: number;
  readonly blendMode: Nullable<string>;
  readonly clipToPage: boolean;
  readonly color: Nullable<string>;
  readonly custom?: JsonObject;
}
