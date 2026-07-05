import type { JsonObject } from '@atlas/atlas-types';

/**
 * Page editing settings.
 */
export interface PageSettings {
  readonly readingOrder: number;
  readonly locked: boolean;
  readonly custom?: JsonObject;
}
