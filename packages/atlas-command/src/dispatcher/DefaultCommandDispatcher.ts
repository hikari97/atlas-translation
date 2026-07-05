import type { Command } from '../command';
import type { CommandContext } from '../context';
import type { AsyncCommandHandler, CommandHandler } from '../handler';
import { DefaultBehaviorExecutor, type PipelineBehavior } from '../pipeline';
import type { CommandResolver } from '../resolver';
import type { CommandResult } from '../result';
import type { CommandDispatcher } from './CommandDispatcher';

/**
 * Resolver-backed command dispatcher.
 */
export class DefaultCommandDispatcher implements CommandDispatcher {
  public constructor(
    private readonly resolver: CommandResolver,
    private readonly behaviors: readonly PipelineBehavior[] = []
  ) {}

  public dispatch<TResult>(command: Command, context: CommandContext): Promise<CommandResult<TResult>> {
    const descriptor = this.resolver.resolve(command);
    const handler = descriptor.factory.create() as CommandHandler<Command, TResult> | AsyncCommandHandler<Command, TResult>;
    const behaviors = this.behaviors as readonly PipelineBehavior<Command, TResult>[];
    const executor = new DefaultBehaviorExecutor<Command, TResult>(behaviors, handler);
    return executor.execute(command, context);
  }
}
