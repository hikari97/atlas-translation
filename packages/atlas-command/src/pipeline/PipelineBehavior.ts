import type { Command } from '../command';
import type { CommandResult } from '../result';
import type { PipelineBehaviorContext } from './PipelineBehaviorContext';
import type { PipelineDelegate } from './PipelineDelegate';

/**
 * Decorator-style command pipeline behavior.
 */
export interface PipelineBehavior<TCommand extends Command = Command, TResult = unknown> {
  handle(
    context: PipelineBehaviorContext<TCommand>,
    next: PipelineDelegate<TResult>
  ): Promise<CommandResult<TResult>>;
}
