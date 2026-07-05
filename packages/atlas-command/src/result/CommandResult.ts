import type { JsonObject } from '@atlas/atlas-types';
import type { CommandError } from './CommandError';
import type { CommandResultStatus } from './CommandResultStatus';

/**
 * Immutable result returned by command execution.
 */
export interface CommandResult<TResult = unknown> {
  readonly status: CommandResultStatus;
  readonly value: TResult | null;
  readonly errors: readonly CommandError[];
  readonly metadata?: JsonObject;
}
