import type { TranslationStatus } from '@atlas/atlas-types';

/**
 * Lifecycle state for a translation document.
 */
export interface TranslationState {
  readonly status: TranslationStatus;
  readonly revision: number;
}
