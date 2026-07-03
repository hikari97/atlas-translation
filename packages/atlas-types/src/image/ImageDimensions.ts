import type { Size } from '../geometry';

/**
 * Pixel dimensions and aspect ratio metadata for an image.
 */
export interface ImageDimensions {
  readonly size: Size;
  readonly aspectRatio: number;
  readonly orientation: 'portrait' | 'landscape' | 'square';
}
