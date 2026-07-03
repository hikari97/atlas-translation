import type { Nullable } from '../common';

/**
 * Stroke data for text outlines.
 */
export interface TypographyStroke {
  readonly color: Nullable<string>;
  readonly width: number;
  readonly opacity: number;
  readonly lineJoin: 'miter' | 'round' | 'bevel';
  readonly lineCap: 'butt' | 'round' | 'square';
}
