import type { ID, JsonObject, Nullable } from '../common';
import type { AIProviderType } from '../enums';

/**
 * Provider metadata for machine or assisted translations.
 */
export interface TranslationProvider {
  readonly providerId: Nullable<ID<'plugin'>>;
  readonly providerType: AIProviderType;
  readonly providerName: string;
  readonly model: Nullable<string>;
  readonly version: Nullable<string>;
  readonly isMachineGenerated: boolean;
  readonly metadata?: JsonObject;
}
