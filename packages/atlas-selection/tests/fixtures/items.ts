import { createSelectionItem } from '@atlas/atlas-selection';
import type { ID } from '@atlas/atlas-types';

export const firstItem = createSelectionItem('selection-item-1', 'entity-1' as ID, 'bubble');
export const secondItem = createSelectionItem('selection-item-2', 'entity-2' as ID, 'bubble');
export const thirdItem = createSelectionItem('selection-item-3', 'entity-3' as ID, 'layer');

export const selectableItems = [firstItem, secondItem, thirdItem] as const;
