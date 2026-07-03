import type { ID, Nullable } from '../common';

/**
 * Reference to a glossary entry used by a translation.
 */
export interface TranslationGlossaryReference {
  readonly glossaryId: ID<'glossary'>;
  readonly entryId: ID<'glossary-entry'>;
  readonly sourceTerm: string;
  readonly targetTerm: string;
  readonly note: Nullable<string>;
}
