import type { ExportFormat as ExportFormatKind } from '../enums';

/**
 * Format-specific export configuration.
 */
export interface ExportFormatOptions {
  readonly format: ExportFormatKind;
  readonly mimeType: string;
  readonly extension: string;
  readonly quality: number | null;
}
