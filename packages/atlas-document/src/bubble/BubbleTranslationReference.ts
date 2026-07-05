import type { ID } from '@atlas/atlas-types';

/**
 * Translation reference used by a bubble.
 */
export interface BubbleTranslationReference {
  readonly translationId: ID<'translation'> | null;
}
