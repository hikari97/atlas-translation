import type { SelectionItem } from '@atlas/atlas-types';

export function singleSelection(item: SelectionItem): readonly SelectionItem[] {
  return [item];
}

export function multiSelection(items: readonly SelectionItem[]): readonly SelectionItem[] {
  return [...new Map(items.map((item) => [item.id, item])).values()];
}

export function toggleSelection(items: readonly SelectionItem[], item: SelectionItem): readonly SelectionItem[] {
  const exists = items.some((current) => current.id === item.id);
  return exists ? items.filter((current) => current.id !== item.id) : [...items, item];
}

export function invertSelection(allItems: readonly SelectionItem[], selectedItems: readonly SelectionItem[]): readonly SelectionItem[] {
  const selectedIds = new Set(selectedItems.map((item) => item.id));
  return allItems.filter((item) => !selectedIds.has(item.id));
}

export function validateSelection(items: readonly SelectionItem[]): boolean {
  return new Set(items.map((item) => item.id)).size === items.length;
}
