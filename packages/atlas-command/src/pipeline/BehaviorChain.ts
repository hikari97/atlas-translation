import type { Command } from '../command';
import type { CommandContext } from '../context';
import type { CommandResult } from '../result';
import type { PipelineBehavior } from './PipelineBehavior';
import type { PipelineDelegate } from './PipelineDelegate';

/**
 * Behavior chain composition contract.
 */
export interface BehaviorChain<TCommand extends Command = Command, TResult = unknown> {
  execute(
    command: TCommand,
    context: CommandContext,
    behaviors: readonly PipelineBehavior<TCommand, TResult>[],
    finalDelegate: PipelineDelegate<TResult>
  ): Promise<CommandResult<TResult>>;
}
