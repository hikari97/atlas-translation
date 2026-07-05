import type { HistoryCursor } from './HistoryCursor';
import type { HistoryFilter } from './HistoryFilter';

/**
 * Query for history entries.
 */
export interface HistoryQuery {
  readonly filter?: HistoryFilter;
  readonly cursor?: HistoryCursor;
}
