import { rangeSelection, toggleSelection, validateSelection } from '@atlas/atlas-selection';
import { firstItem, secondItem, selectableItems } from '../fixtures/items';

const toggled = toggleSelection([firstItem], secondItem);
const ranged = rangeSelection(selectableItems, firstItem.id, secondItem.id);
const valid: boolean = validateSelection(toggled);

const toggledCount: number = toggled.length;
const rangedCount: number = ranged.length;

export { rangedCount, toggledCount, valid };
