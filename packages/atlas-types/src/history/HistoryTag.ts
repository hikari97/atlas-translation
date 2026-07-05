import type { ID, Nullable } from '../common';

/**
 * Label used to classify history entries.
 */
export interface HistoryTag {
  readonly id: ID<'history-tag'>;
  readonly label: string;
  readonly color: Nullable<string>;
}
