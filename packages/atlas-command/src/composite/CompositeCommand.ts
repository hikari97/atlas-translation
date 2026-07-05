import type { Command } from '../command';
import type { CompositeCommandEntry } from './CompositeCommandEntry';
import type { CompositeExecutionMode } from './CompositeExecutionMode';

/**
 * Command that groups child commands into one logical operation.
 */
export interface CompositeCommand extends Command {
  readonly entries: readonly CompositeCommandEntry[];
  readonly mode: CompositeExecutionMode;
}
