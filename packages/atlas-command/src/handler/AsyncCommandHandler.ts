import type { Command } from '../command';
import type { CommandContext } from '../context';
import type { CommandResult } from '../result';

/**
 * Asynchronous command handler contract.
 */
export interface AsyncCommandHandler<TCommand extends Command = Command, TResult = unknown> {
  handle(command: TCommand, context: CommandContext): Promise<CommandResult<TResult>>;
}
