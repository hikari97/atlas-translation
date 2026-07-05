import type { Command } from '../command';
import type { CommandContext } from '../context';
import type { CommandResult } from '../result';

/**
 * Command execution pipeline contract.
 */
export interface CommandPipeline<TCommand extends Command = Command, TResult = unknown> {
  execute(command: TCommand, context: CommandContext): Promise<CommandResult<TResult>>;
}
