import type { JsonObject } from '@atlas/atlas-types';

/**
 * Layer editing settings.
 */
export interface LayerSettings {
  readonly opacity: number;
  readonly blendMode: string;
  readonly custom?: JsonObject;
}
