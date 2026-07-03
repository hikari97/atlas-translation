import type { Point } from './Point';

/**
 * Closed shape represented by an ordered collection of points.
 */
export interface Polygon {
  readonly points: readonly Point[];
}
