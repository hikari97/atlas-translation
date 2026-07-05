import type { SelectionItem } from '@atlas/atlas-types';

export interface SelectionRange {
  readonly anchorId: string;
  readonly focusId: string;
}

export function rangeSelection(items: readonly SelectionItem[], anchorId: string, focusId: string): readonly SelectionItem[] {
  const anchorIndex = items.findIndex((item) => item.id === anchorId);
  const focusIndex = items.findIndex((item) => item.id === focusId);
  if (anchorIndex < 0 || focusIndex < 0) {
    return [];
  }
  const start = Math.min(anchorIndex, focusIndex);
  const end = Math.max(anchorIndex, focusIndex);
  return items.slice(start, end + 1);
}

export function expandRange(range: SelectionRange, focusId: string): SelectionRange {
  return { ...range, focusId };
}

export function shiftSelection(items: readonly SelectionItem[], anchorId: string, focusId: string): readonly SelectionItem[] {
  return rangeSelection(items, anchorId, focusId);
}
