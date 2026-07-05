import type { Command } from '../command';
import type { CommandContext } from '../context';
import type { CommandResult } from '../result';

/**
 * One executable command pipeline stage.
 */
export interface PipelineStage<TCommand extends Command = Command, TResult = unknown> {
  execute(command: TCommand, context: CommandContext): CommandResult<TResult> | Promise<CommandResult<TResult>>;
}
