import type { ID, Timestamp } from '../common';
import type { TranslationStatus } from '../enums';

/**
 * Lightweight reference to a translation.
 */
export interface TranslationReference {
  readonly id: ID<'translation'>;
  readonly projectId: ID<'project'>;
  readonly pageId: ID<'page'>;
  readonly bubbleId: ID<'bubble'>;
  readonly sourceLanguage: string;
  readonly targetLanguage: string;
  readonly status: TranslationStatus;
  readonly updatedAt: Timestamp;
}
