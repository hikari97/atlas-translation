import type { JsonObject, Nullable } from '../common';
import type { ExportFormat } from '../enums';

/**
 * Project-level export preferences.
 */
export interface ProjectExportSettings {
  readonly formats: readonly ExportFormat[];
  readonly defaultFormat: ExportFormat;
  readonly outputName: Nullable<string>;
  readonly includeOriginalPages: boolean;
  readonly includeMetadata: boolean;
  readonly compressionEnabled: boolean;
  readonly quality: number;
  readonly custom?: JsonObject;
}
