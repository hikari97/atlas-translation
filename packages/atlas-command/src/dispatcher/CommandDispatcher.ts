import type { Command } from '../command';
import type { CommandContext } from '../context';
import type { CommandResult } from '../result';

/**
 * Dispatches commands into the command execution pipeline.
 */
export interface CommandDispatcher {
  dispatch<TResult>(command: Command, context: CommandContext): Promise<CommandResult<TResult>>;
}
