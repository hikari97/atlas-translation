import type { JsonObject } from '@atlas/atlas-types';

/**
 * Runtime options for command execution.
 */
export interface CommandContextOptions {
  readonly dryRun: boolean;
  readonly collectDiagnostics: boolean;
  readonly custom?: JsonObject;
}
