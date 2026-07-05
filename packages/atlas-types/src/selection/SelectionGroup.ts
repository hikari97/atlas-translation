import type { ID, Nullable } from '../common';
import type { SelectionBounds } from './SelectionBounds';

/**
 * Named grouping of selected items.
 */
export interface SelectionGroup {
  readonly id: ID<'selection-group'>;
  readonly name: string;
  readonly itemIds: readonly ID<'selection-item'>[];
  readonly bounds: Nullable<SelectionBounds>;
}
