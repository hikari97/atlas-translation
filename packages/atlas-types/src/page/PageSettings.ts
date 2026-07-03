import type { JsonObject } from '../common';
import type { ExportFormat, LanguageDirection, OCRDirection } from '../enums';

/**
 * Page-level workflow and export preferences.
 */
export interface PageSettings {
  readonly languageDirection: LanguageDirection;
  readonly ocrDirection: OCRDirection;
  readonly includeInExport: boolean;
  readonly visible: boolean;
  readonly locked: boolean;
  readonly defaultExportFormat?: ExportFormat;
  readonly custom?: JsonObject;
}
