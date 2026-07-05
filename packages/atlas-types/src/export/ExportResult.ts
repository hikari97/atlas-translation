import type { JsonObject, Nullable } from '../common';
import type { ExportArtifact } from './ExportArtifact';

/**
 * Result summary for an export operation.
 */
export interface ExportResult {
  readonly success: boolean;
  readonly artifacts: readonly ExportArtifact[];
  readonly errorCode: Nullable<string>;
  readonly message: Nullable<string>;
  readonly metadata?: JsonObject;
}
