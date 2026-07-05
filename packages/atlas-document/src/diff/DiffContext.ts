import type { ID, JsonObject } from '@atlas/atlas-types';
import type { DiffOptions } from './DiffOptions';

/**
 * Context passed to document differs.
 */
export interface DiffContext {
  readonly requestId: ID<'diff-request'>;
  readonly options: DiffOptions;
  readonly custom?: JsonObject;
}
