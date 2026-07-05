import type { Command } from '../command';
import type { CommandContext } from '../context';
import type { CommandResult } from '../result';

/**
 * Asynchronous command bus contract.
 */
export interface AsyncCommandBus {
  execute<TResult>(command: Command, context: CommandContext): Promise<CommandResult<TResult>>;
}
