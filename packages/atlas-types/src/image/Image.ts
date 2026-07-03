import type { AssetReference } from '../asset';
import type { ID, Nullable } from '../common';
import type { ImageColorProfile } from './ImageColorProfile';
import type { ImageDimensions } from './ImageDimensions';
import type { ImageFormatMetadata } from './ImageFormat';
import type { ImageMetadata } from './ImageMetadata';
import type { ImageResolution } from './ImageResolution';
import type { ImageStatistics } from './ImageStatistics';
import type { ImageThumbnail } from './ImageThumbnail';

/**
 * Image metadata for original pages, processed images, previews, and exports.
 */
export interface Image {
  readonly id: ID<'image'>;
  readonly asset: AssetReference;
  readonly name: string;
  readonly role: Nullable<string>;
  readonly dimensions: ImageDimensions;
  readonly resolution: ImageResolution;
  readonly colorProfile: ImageColorProfile;
  readonly format: ImageFormatMetadata;
  readonly thumbnails: readonly ImageThumbnail[];
  readonly metadata: ImageMetadata;
  readonly statistics: ImageStatistics;
  readonly derivedFromImageId?: ID<'image'>;
}
