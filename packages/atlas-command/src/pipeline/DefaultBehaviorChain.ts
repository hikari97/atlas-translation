import type { Command } from '../command';
import type { CommandContext } from '../context';
import type { CommandResult } from '../result';
import type { BehaviorChain } from './BehaviorChain';
import type { PipelineBehavior } from './PipelineBehavior';
import type { PipelineDelegate } from './PipelineDelegate';

/**
 * Default nested behavior chain implementation.
 */
export class DefaultBehaviorChain<TCommand extends Command = Command, TResult = unknown>
  implements BehaviorChain<TCommand, TResult>
{
  public execute(
    command: TCommand,
    context: CommandContext,
    behaviors: readonly PipelineBehavior<TCommand, TResult>[],
    finalDelegate: PipelineDelegate<TResult>
  ): Promise<CommandResult<TResult>> {
    const behaviorContext = { command, context };
    const delegate = behaviors
      .slice()
      .reverse()
      .reduce<PipelineDelegate<TResult>>(
        (next, behavior) => () => behavior.handle(behaviorContext, next),
        finalDelegate
      );

    return delegate();
  }
}
