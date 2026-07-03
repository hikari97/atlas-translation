import type { ID, Nullable, Timestamp } from '../common';
import type { ImageFormat } from '../enums';
import type { ImageDimensions } from './ImageDimensions';

/**
 * Lightweight reference to an image resource.
 */
export interface ImageReference {
  readonly id: ID<'image'>;
  readonly assetId: ID<'asset'>;
  readonly name: string;
  readonly format: ImageFormat;
  readonly dimensions: ImageDimensions;
  readonly role: Nullable<string>;
  readonly updatedAt: Timestamp;
}
