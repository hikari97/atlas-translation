import type { JsonObject, Timestamp } from '@atlas/atlas-types';
import type { CommandId, CommandName } from '../command';
import type { CompositeCommand } from './CompositeCommand';
import type { CompositeCommandEntry } from './CompositeCommandEntry';
import type { CompositeExecutionMode } from './CompositeExecutionMode';
import { EmptyCompositeError } from './errors/EmptyCompositeError';

/**
 * Immutable composite command.
 */
export class DefaultCompositeCommand implements CompositeCommand {
  public readonly payload: JsonObject;
  public readonly entries: readonly CompositeCommandEntry[];

  public constructor(
    public readonly id: CommandId,
    public readonly name: CommandName,
    entries: readonly CompositeCommandEntry[],
    public readonly mode: CompositeExecutionMode,
    public readonly createdAt: Timestamp,
    payload: JsonObject = {}
  ) {
    if (entries.length === 0) {
      throw new EmptyCompositeError();
    }
    this.entries = [...entries].sort((left, right) => left.order - right.order);
    this.payload = payload;
  }
}
