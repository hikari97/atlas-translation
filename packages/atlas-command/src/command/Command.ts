import type { JsonObject, Timestamp } from '@atlas/atlas-types';
import type { CommandId } from './CommandId';
import type { CommandMetadata } from './CommandMetadata';
import type { CommandName } from './CommandName';

/**
 * Synchronous command contract representing an executable intention.
 */
export interface Command<TPayload extends JsonObject = JsonObject> {
  readonly id: CommandId;
  readonly name: CommandName;
  readonly payload: TPayload;
  readonly createdAt: Timestamp;
  readonly metadata?: CommandMetadata;
}
