import type { JsonObject } from '@atlas/atlas-types';

/**
 * Global document settings.
 */
export interface AtlasDocumentSettings {
  readonly locale: string;
  readonly timezone: string;
  readonly custom?: JsonObject;
}
