import type { Transform } from '../geometry';

/**
 * Transform data for text placement.
 */
export interface TypographyTransform {
  readonly transform: Transform;
  readonly baselineShift: number;
  readonly textRotation: number;
}
