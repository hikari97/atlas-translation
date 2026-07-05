import type { ID, JsonObject, Nullable } from '../common';
import type { SelectionBounds } from './SelectionBounds';

/**
 * One selected entity in the editor.
 */
export interface SelectionItem {
  readonly id: ID<'selection-item'>;
  readonly entityId: ID;
  readonly entityType: string;
  readonly bounds: Nullable<SelectionBounds>;
  readonly metadata?: JsonObject;
}
