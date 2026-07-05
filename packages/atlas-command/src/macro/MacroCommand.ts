import type { CompositeCommand } from '../composite';
import type { MacroMetadata } from './MacroMetadata';

/**
 * Replayable composite command recorded as a macro.
 */
export interface MacroCommand extends CompositeCommand {
  readonly macroMetadata: MacroMetadata;
}
