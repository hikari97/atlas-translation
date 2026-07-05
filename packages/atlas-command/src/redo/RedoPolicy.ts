/**
 * Capacity policy for redo stack.
 */
export interface RedoPolicy {
  readonly maxEntries: number;
}
