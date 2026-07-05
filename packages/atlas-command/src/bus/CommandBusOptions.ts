import type { JsonObject } from '@atlas/atlas-types';

/**
 * Command bus runtime options.
 */
export interface CommandBusOptions {
  readonly enabled: boolean;
  readonly custom?: JsonObject;
}
