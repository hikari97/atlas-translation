import type { Command } from '../../command';
import type { PipelineBehavior } from '../../pipeline';

/**
 * Records successful command executions into history.
 */
export interface HistoryRecordingBehavior<TCommand extends Command = Command, TResult = unknown>
  extends PipelineBehavior<TCommand, TResult> {}
