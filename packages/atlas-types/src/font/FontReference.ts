import type { ID } from '../common';

/**
 * Lightweight reference to a font and selected variant.
 */
export interface FontReference {
  readonly id: ID<'font'>;
  readonly familyId: ID<'font-family'>;
  readonly variantId: ID<'font-variant'>;
  readonly familyName: string;
  readonly variantName: string;
  readonly weight: number;
  readonly style: 'normal' | 'italic' | 'oblique';
}
