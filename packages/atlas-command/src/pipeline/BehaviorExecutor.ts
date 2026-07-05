import type { Command } from '../command';
import type { CommandContext } from '../context';
import type { CommandResult } from '../result';

/**
 * Executes a configured behavior chain.
 */
export interface BehaviorExecutor<TCommand extends Command = Command, TResult = unknown> {
  execute(command: TCommand, context: CommandContext): Promise<CommandResult<TResult>>;
}
