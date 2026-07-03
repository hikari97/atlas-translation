import type { Nullable } from '../common';

/**
 * Color profile metadata for an image.
 */
export interface ImageColorProfile {
  readonly name: Nullable<string>;
  readonly colorSpace: 'srgb' | 'display-p3' | 'cmyk' | 'grayscale' | 'unknown';
  readonly bitDepth: number;
  readonly hasAlpha: boolean;
}
