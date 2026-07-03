/**
 * Font metric metadata used by layout and rendering systems.
 */
export interface FontMetrics {
  readonly unitsPerEm: number;
  readonly ascent: number;
  readonly descent: number;
  readonly lineGap: number;
  readonly capHeight?: number;
  readonly xHeight?: number;
  readonly averageCharacterWidth?: number;
}
