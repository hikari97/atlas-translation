import type { ID, Nullable } from '@atlas/atlas-types';
import type { AIProviderType } from '@atlas/atlas-types';

/**
 * Provider metadata for a translation document.
 */
export interface TranslationProvider {
  readonly providerType: Nullable<AIProviderType>;
  readonly providerId: Nullable<ID<'plugin'>>;
  readonly model: Nullable<string>;
}
