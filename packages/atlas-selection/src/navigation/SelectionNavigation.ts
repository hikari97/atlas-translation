import type { SelectionItem } from '@atlas/atlas-types';

export enum SelectionDirection {
  Previous = 'previous',
  Next = 'next'
}

export interface SelectionCursor {
  readonly index: number;
}

export function focusNavigation(items: readonly SelectionItem[], cursor: SelectionCursor): SelectionItem | null {
  return items[cursor.index] ?? null;
}

export function directionNavigation(items: readonly SelectionItem[], cursor: SelectionCursor, direction: SelectionDirection): SelectionCursor {
  const delta = direction === SelectionDirection.Next ? 1 : -1;
  const index = Math.min(Math.max(cursor.index + delta, 0), Math.max(items.length - 1, 0));
  return { index };
}

export function traverseSelection(items: readonly SelectionItem[]): Iterable<SelectionItem> {
  return items.values();
}

export function selectAll(items: readonly SelectionItem[]): readonly SelectionItem[] {
  return items.slice();
}
