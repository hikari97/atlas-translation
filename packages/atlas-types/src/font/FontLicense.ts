import type { Nullable } from '../common';

/**
 * Licensing metadata for a font.
 */
export interface FontLicense {
  readonly name: string;
  readonly url: Nullable<string>;
  readonly copyright: Nullable<string>;
  readonly allowsEmbedding: boolean;
  readonly allowsCommercialUse: boolean;
  readonly requiresAttribution: boolean;
}
