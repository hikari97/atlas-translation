import type { JsonObject } from '../common';
import type { ExportFormatOptions } from './ExportFormat';

/**
 * User-selected options for an export request.
 */
export interface ExportOptions {
  readonly format: ExportFormatOptions;
  readonly includeMetadata: boolean;
  readonly includeSourceImages: boolean;
  readonly includeTranslations: boolean;
  readonly pageIds: readonly string[];
  readonly custom?: JsonObject;
}
