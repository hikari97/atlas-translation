import type { BoundingBox } from './BoundingBox';
import type { Circle } from './Circle';
import type { Line } from './Line';
import type { Matrix } from './Matrix';
import type { Point } from './Point';
import type { Polygon } from './Polygon';
import type { Rectangle } from './Rectangle';
import type { Size } from './Size';
import type { Transform } from './Transform';
import type { Vector } from './Vector';

/**
 * Shared geometry data model used by Atlas Studio packages.
 */
export type Geometry =
  | Point
  | Size
  | Rectangle
  | BoundingBox
  | Polygon
  | Circle
  | Line
  | Matrix
  | Transform
  | Vector;
