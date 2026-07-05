import type { SelectionItem } from '@atlas/atlas-types';

export interface SelectionTreeNode {
  readonly item: SelectionItem;
  readonly children: readonly SelectionTreeNode[];
}

export function parentSelection(node: SelectionTreeNode, childId: string): SelectionItem | null {
  return node.children.some((child) => child.item.id === childId) ? node.item : null;
}

export function childSelection(node: SelectionTreeNode): readonly SelectionItem[] {
  return node.children.map((child) => child.item);
}

export function recursiveSelection(node: SelectionTreeNode): readonly SelectionItem[] {
  return [node.item, ...node.children.flatMap((child) => recursiveSelection(child))];
}

export function groupSelection(name: string, items: readonly SelectionItem[]): { readonly name: string; readonly items: readonly SelectionItem[] } {
  return { name, items: items.slice() };
}
