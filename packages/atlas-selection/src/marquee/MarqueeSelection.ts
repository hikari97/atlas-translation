import type { BoundingBox, SelectionItem } from '@atlas/atlas-types';

export interface MarqueeSession {
  readonly id: string;
  readonly rectangle: BoundingBox;
}

export interface MarqueeAutoScroll {
  readonly threshold: number;
  readonly speed: number;
}

export function marqueeHitTest(rectangle: BoundingBox, items: readonly SelectionItem[]): readonly SelectionItem[] {
  return items.filter((item) => {
    const bounds = item.bounds?.bounds;
    if (bounds === undefined) {
      return false;
    }
    return bounds.minX <= rectangle.maxX && bounds.maxX >= rectangle.minX && bounds.minY <= rectangle.maxY && bounds.maxY >= rectangle.minY;
  });
}

export function filterMarqueeItems(items: readonly SelectionItem[], entityTypes: readonly string[]): readonly SelectionItem[] {
  if (entityTypes.length === 0) {
    return items;
  }
  return items.filter((item) => entityTypes.includes(item.entityType));
}
