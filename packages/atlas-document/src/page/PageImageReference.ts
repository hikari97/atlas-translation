import type { ImageReference } from '@atlas/atlas-types';

/**
 * Original image referenced by a page.
 */
export interface PageImageReference {
  readonly image: ImageReference | null;
}
