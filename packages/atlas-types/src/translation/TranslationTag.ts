import type { ID, Nullable } from '../common';

/**
 * Label assigned to a translation for review and workflow filtering.
 */
export interface TranslationTag {
  readonly id: ID<'translation-tag'>;
  readonly name: string;
  readonly color: Nullable<string>;
}
