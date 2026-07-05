/**
 * Capacity policy for undo stack.
 */
export interface UndoPolicy {
  readonly maxEntries: number;
}
