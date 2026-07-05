import type { Command } from '../command';
import type { CommandContext } from '../context';

/**
 * Context visible to pipeline behaviors.
 */
export interface PipelineBehaviorContext<TCommand extends Command = Command> {
  readonly command: TCommand;
  readonly context: CommandContext;
}
