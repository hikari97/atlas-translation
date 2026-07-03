import type { Point } from './Point';

/**
 * Line segment represented by start and end coordinates.
 */
export interface Line {
  readonly start: Point;
  readonly end: Point;
}
