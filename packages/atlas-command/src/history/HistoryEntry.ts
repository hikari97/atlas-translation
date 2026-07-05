import type { ID, JsonObject, Timestamp } from '@atlas/atlas-types';
import type { CommandId, CommandName } from '../command';
import type { CommandResultStatus } from '../result';

/**
 * Immutable command execution history entry.
 */
export interface HistoryEntry {
  readonly id: ID<'command-history-entry'>;
  readonly commandId: CommandId;
  readonly commandName: CommandName;
  readonly status: CommandResultStatus;
  readonly executedAt: Timestamp;
  readonly durationMs: number;
  readonly correlationId: string | null;
  readonly userId: ID<'user'> | null;
  readonly metadata?: JsonObject;
}
