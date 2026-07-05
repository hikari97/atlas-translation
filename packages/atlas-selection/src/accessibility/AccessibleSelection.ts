import type { SelectionItem } from '@atlas/atlas-types';

export interface ScreenReaderSelectionMetadata {
  readonly label: string;
  readonly position: number;
  readonly total: number;
}

export function createScreenReaderMetadata(item: SelectionItem, position: number, total: number): ScreenReaderSelectionMetadata {
  return {
    label: `${item.entityType} ${String(item.entityId)}`,
    position,
    total
  };
}

export function validateAccessibleSelection(metadata: ScreenReaderSelectionMetadata): boolean {
  return metadata.label.trim().length > 0 && metadata.position >= 1 && metadata.total >= metadata.position;
}

export function keyboardAccessibleSelection(items: readonly SelectionItem[]): boolean {
  return items.every((item) => item.entityType.trim().length > 0);
}
