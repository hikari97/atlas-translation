import type { JsonObject } from '@atlas/atlas-types';

/**
 * Project-level document settings.
 */
export interface ProjectSettings {
  readonly sourceLanguage: string;
  readonly targetLanguage: string;
  readonly custom?: JsonObject;
}
