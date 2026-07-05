import type { SelectionMode } from '../enums';
import type { SelectionFilter } from './SelectionFilter';
import type { SelectionGroup } from './SelectionGroup';
import type { SelectionItem } from './SelectionItem';

/**
 * Current selected items and grouping mode.
 */
export interface SelectionState {
  readonly mode: SelectionMode;
  readonly primaryItem: SelectionItem | null;
  readonly items: readonly SelectionItem[];
  readonly groups: readonly SelectionGroup[];
  readonly filter: SelectionFilter;
}
