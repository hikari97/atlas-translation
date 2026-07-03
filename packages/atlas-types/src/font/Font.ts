import type { ID, Nullable } from '../common';
import type { FontFallback } from './FontFallback';
import type { FontFamily } from './FontFamily';
import type { FontLicense } from './FontLicense';
import type { FontMetadata } from './FontMetadata';
import type { FontVariant } from './FontVariant';

/**
 * Font metadata and variants used by typography, rendering, and export workflows.
 */
export interface Font {
  readonly id: ID<'font'>;
  readonly family: FontFamily;
  readonly variants: readonly FontVariant[];
  readonly defaultVariantId: ID<'font-variant'>;
  readonly license: FontLicense;
  readonly fallback: FontFallback;
  readonly metadata: FontMetadata;
  readonly previewText: Nullable<string>;
}
