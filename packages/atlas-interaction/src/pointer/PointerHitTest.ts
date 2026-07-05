import type { Point } from '@atlas/atlas-types';
import type { HitTestTarget } from './PointerTypes';

export class PointerHitTest {
  public hitTest(point: Point, targets: readonly HitTestTarget[]): HitTestTarget | undefined {
    return targets.find((target) => (
      point.x >= target.bounds.minX &&
      point.x <= target.bounds.maxX &&
      point.y >= target.bounds.minY &&
      point.y <= target.bounds.maxY
    ));
  }
}
