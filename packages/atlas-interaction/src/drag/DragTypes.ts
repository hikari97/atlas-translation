import type { BoundingBox, Point } from '@atlas/atlas-types';

export interface DragSession {
  readonly id: string;
  readonly origin: Point;
  readonly current: Point;
  readonly previewId?: string | undefined;
}

export interface DropSession {
  readonly id: string;
  readonly targetId: string | null;
  readonly position: Point;
}

export interface DragConstraints {
  readonly bounds?: BoundingBox | undefined;
  readonly axis?: 'x' | 'y' | 'both' | undefined;
}

export interface AutoScrollConfig {
  readonly threshold: number;
  readonly speed: number;
}

export function createDragPreview(id: string, label: string): { readonly id: string; readonly label: string } {
  return { id, label };
}

export function constrainDrag(point: Point, constraints: DragConstraints): Point {
  const bounds = constraints.bounds;
  if (bounds === undefined) {
    return point;
  }
  return {
    x: Math.min(Math.max(point.x, bounds.minX), bounds.maxX),
    y: Math.min(Math.max(point.y, bounds.minY), bounds.maxY)
  };
}
