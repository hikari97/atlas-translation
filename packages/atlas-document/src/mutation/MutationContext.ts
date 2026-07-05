import type { ID, JsonObject } from '@atlas/atlas-types';
import type { MutationOptions } from './MutationOptions';

/**
 * Context passed to document mutations.
 */
export interface MutationContext {
  readonly requestId: ID<'mutation-request'>;
  readonly options: MutationOptions;
  readonly custom?: JsonObject;
}
