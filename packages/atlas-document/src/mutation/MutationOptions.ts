import type { JsonObject } from '@atlas/atlas-types';

/**
 * Options for mutation execution.
 */
export interface MutationOptions {
  readonly dryRun: boolean;
  readonly collectDiagnostics: boolean;
  readonly custom?: JsonObject;
}
