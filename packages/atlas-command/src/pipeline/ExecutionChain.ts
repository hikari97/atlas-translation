import type { Command } from '../command';
import type { CommandContext } from '../context';
import type { CommandResult } from '../result';
import { CommandResultStatus } from '../result';
import type { PipelineStage } from './PipelineStage';

/**
 * Sequential execution chain for pipeline stages.
 */
export class ExecutionChain<TCommand extends Command = Command, TResult = unknown> {
  private readonly stages: PipelineStage<TCommand, TResult>[];

  public constructor(stages: readonly PipelineStage<TCommand, TResult>[] = []) {
    this.stages = [...stages];
  }

  public add(stage: PipelineStage<TCommand, TResult>): void {
    this.stages.push(stage);
  }

  public async execute(command: TCommand, context: CommandContext): Promise<CommandResult<TResult>> {
    let lastResult: CommandResult<TResult> | null = null;
    for (const stage of this.stages) {
      lastResult = await stage.execute(command, context);
      if (lastResult.errors.length > 0) {
        return lastResult;
      }
    }

    if (lastResult === null) {
      return {
        status: CommandResultStatus.Skipped,
        value: null,
        errors: []
      };
    }

    return lastResult;
  }
}
