import type { JsonObject, Timestamp } from '@atlas/atlas-types';
import type { CommandId, CommandName } from '../command';
import type { CompositeCommandEntry, CompositeExecutionMode } from '../composite';
import { DefaultCompositeCommand } from '../composite';
import type { MacroCommand } from './MacroCommand';
import type { MacroMetadata } from './MacroMetadata';

/**
 * Immutable macro command.
 */
export class DefaultMacroCommand extends DefaultCompositeCommand implements MacroCommand {
  public constructor(
    id: CommandId,
    name: CommandName,
    entries: readonly CompositeCommandEntry[],
    mode: CompositeExecutionMode,
    createdAt: Timestamp,
    public readonly macroMetadata: MacroMetadata,
    payload: JsonObject = {}
  ) {
    super(id, name, entries, mode, createdAt, payload);
  }
}
