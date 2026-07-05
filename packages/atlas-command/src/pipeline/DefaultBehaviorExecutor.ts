import type { Command } from '../command';
import type { CommandContext } from '../context';
import type { AsyncCommandHandler, CommandHandler } from '../handler';
import type { CommandResult } from '../result';
import type { BehaviorExecutor } from './BehaviorExecutor';
import { DefaultBehaviorChain } from './DefaultBehaviorChain';
import type { PipelineBehavior } from './PipelineBehavior';

/**
 * Executes behaviors and then invokes a handler.
 */
export class DefaultBehaviorExecutor<TCommand extends Command = Command, TResult = unknown>
  implements BehaviorExecutor<TCommand, TResult>
{
  private readonly chain = new DefaultBehaviorChain<TCommand, TResult>();

  public constructor(
    private readonly behaviors: readonly PipelineBehavior<TCommand, TResult>[],
    private readonly handler: CommandHandler<TCommand, TResult> | AsyncCommandHandler<TCommand, TResult>
  ) {}

  public execute(command: TCommand, context: CommandContext): Promise<CommandResult<TResult>> {
    return this.chain.execute(command, context, this.behaviors, async () => this.handler.handle(command, context));
  }
}
