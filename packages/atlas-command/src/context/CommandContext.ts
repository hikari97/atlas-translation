import type { AtlasDocument } from '@atlas/atlas-document';
import type { ID, JsonObject, Timestamp } from '@atlas/atlas-types';
import type { CommandContextId } from './CommandContextId';
import type { CommandContextOptions } from './CommandContextOptions';

/**
 * Immutable runtime context for command execution.
 */
export interface CommandContext {
  readonly id: CommandContextId;
  readonly document: AtlasDocument | null;
  readonly userId: ID<'user'> | null;
  readonly correlationId: string | null;
  readonly startedAt: Timestamp;
  readonly options: CommandContextOptions;
  readonly metadata?: JsonObject;
}
