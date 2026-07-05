import type { Command } from '../command';
import type { CommandContext } from '../context';
import type { CommandResult } from '../result';

/**
 * Synchronous command handler contract.
 */
export interface CommandHandler<TCommand extends Command = Command, TResult = unknown> {
  handle(command: TCommand, context: CommandContext): CommandResult<TResult>;
}
