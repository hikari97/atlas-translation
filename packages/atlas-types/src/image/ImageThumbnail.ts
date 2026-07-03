import type { ID } from '../common';
import type { ImageDimensions } from './ImageDimensions';

/**
 * Thumbnail image reference and metadata.
 */
export interface ImageThumbnail {
  readonly imageId: ID<'image'>;
  readonly assetId: ID<'asset'>;
  readonly dimensions: ImageDimensions;
}
