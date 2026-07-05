import type { JsonObject } from '../common';

/**
 * Declarative filter for selectable entity categories.
 */
export interface SelectionFilter {
  readonly entityTypes: readonly string[];
  readonly includeLocked: boolean;
  readonly includeHidden: boolean;
  readonly metadata?: JsonObject;
}
