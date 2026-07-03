import type { Point } from './Point';

/**
 * Circle represented by its center coordinate and radius.
 */
export interface Circle {
  readonly center: Point;
  readonly radius: number;
}
