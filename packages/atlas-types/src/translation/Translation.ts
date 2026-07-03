import type { ID } from '../common';
import type { TranslationConfidence } from './TranslationConfidence';
import type { TranslationContent } from './TranslationContent';
import type { TranslationGlossaryReference } from './TranslationGlossaryReference';
import type { TranslationHistory } from './TranslationHistory';
import type { TranslationMetadata } from './TranslationMetadata';
import type { TranslationProvider } from './TranslationProvider';
import type { TranslationReview } from './TranslationReview';

/**
 * Provider-independent translation data associated with a bubble.
 */
export interface Translation {
  readonly id: ID<'translation'>;
  readonly projectId: ID<'project'>;
  readonly pageId: ID<'page'>;
  readonly bubbleId: ID<'bubble'>;
  readonly content: TranslationContent;
  readonly provider: TranslationProvider;
  readonly review: TranslationReview;
  readonly history: TranslationHistory;
  readonly confidence: TranslationConfidence;
  readonly glossaryReferences: readonly TranslationGlossaryReference[];
  readonly metadata: TranslationMetadata;
}
