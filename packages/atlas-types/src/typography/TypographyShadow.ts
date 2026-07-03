import type { Nullable } from '../common';
import type { Vector } from '../geometry';

/**
 * Shadow data for text rendering.
 */
export interface TypographyShadow {
  readonly color: Nullable<string>;
  readonly offset: Vector;
  readonly blur: number;
  readonly spread: number;
  readonly opacity: number;
}
