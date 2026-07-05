import type { JsonObject } from '@atlas/atlas-types';
import type { Command } from './Command';

/**
 * Marker contract for commands intended for asynchronous handlers.
 */
export interface AsyncCommand<TPayload extends JsonObject = JsonObject> extends Command<TPayload> {
  readonly async: true;
}
