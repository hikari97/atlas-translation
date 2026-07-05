import type { ID, Timestamp } from '../common';
import type { SelectionMode } from '../enums';

/**
 * Lightweight reference to a selection state.
 */
export interface SelectionReference {
  readonly id: ID<'selection'>;
  readonly editorId: ID<'editor'>;
  readonly mode: SelectionMode;
  readonly itemCount: number;
  readonly updatedAt: Timestamp;
}
