import type { CommandName } from '../command';
import type { CommandResultStatus } from '../result';

/**
 * Filters for history queries.
 */
export interface HistoryFilter {
  readonly commandName?: CommandName;
  readonly status?: CommandResultStatus;
}
