import type { Command } from '../command';
import type { CommandContext } from '../context';
import type { CommandResult } from '../result';
import type { CommandPipeline } from './CommandPipeline';
import { ExecutionChain } from './ExecutionChain';
import type { PipelineStage } from './PipelineStage';

/**
 * Stage-backed command pipeline.
 */
export class DefaultCommandPipeline<TCommand extends Command = Command, TResult = unknown>
  implements CommandPipeline<TCommand, TResult>
{
  private readonly chain: ExecutionChain<TCommand, TResult>;

  public constructor(stages: readonly PipelineStage<TCommand, TResult>[] = []) {
    this.chain = new ExecutionChain(stages);
  }

  public execute(command: TCommand, context: CommandContext): Promise<CommandResult<TResult>> {
    return this.chain.execute(command, context);
  }
}
