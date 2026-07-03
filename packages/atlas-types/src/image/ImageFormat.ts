import type { ImageFormat as ImageFormatKind } from '../enums';

/**
 * File format metadata for an image.
 */
export interface ImageFormatMetadata {
  readonly format: ImageFormatKind;
  readonly mimeType: string;
  readonly extension: string;
  readonly supportsTransparency: boolean;
  readonly supportsAnimation: boolean;
  readonly isLossless: boolean;
}
