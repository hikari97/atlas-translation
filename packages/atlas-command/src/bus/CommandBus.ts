import type { Command } from '../command';
import type { CommandContext } from '../context';
import type { CommandResult } from '../result';

/**
 * Synchronous command bus contract.
 */
export interface CommandBus {
  execute<TResult>(command: Command, context: CommandContext): CommandResult<TResult>;
}
