import type { JsonObject, Nullable } from '../common';
import type { HistoryAction as HistoryActionKind } from '../enums';

/**
 * Descriptive action recorded in history.
 */
export interface HistoryActionRecord {
  readonly type: HistoryActionKind;
  readonly label: string;
  readonly description: Nullable<string>;
  readonly metadata?: JsonObject;
}
