import type { JsonObject } from '@atlas/atlas-types';

export interface RuntimeOptions {
  readonly name: string;
  readonly custom?: JsonObject;
}
