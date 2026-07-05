import type { Command } from '../command';
import type { PipelineBehavior } from '../pipeline';

/**
 * Pipeline behavior contract for validation.
 */
export interface ValidationBehavior<TCommand extends Command = Command, TResult = unknown>
  extends PipelineBehavior<TCommand, TResult> {}
