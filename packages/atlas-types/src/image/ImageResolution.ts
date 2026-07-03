/**
 * Pixel density metadata for an image.
 */
export interface ImageResolution {
  readonly dpiX: number;
  readonly dpiY: number;
  readonly unit: 'dpi' | 'dpcm';
}
