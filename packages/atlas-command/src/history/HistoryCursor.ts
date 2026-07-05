/**
 * Cursor for history pagination.
 */
export interface HistoryCursor {
  readonly offset: number;
  readonly limit: number;
}
