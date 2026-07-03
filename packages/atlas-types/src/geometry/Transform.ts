import type { Point } from './Point';
import type { Vector } from './Vector';

/**
 * Serializable transform data for positioning, scaling, rotation, and skew.
 */
export interface Transform {
  readonly position: Point;
  readonly scale: Vector;
  readonly rotation: number;
  readonly skew?: Vector;
  readonly origin?: Point;
}
