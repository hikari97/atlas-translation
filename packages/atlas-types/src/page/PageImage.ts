import type { ID, Nullable } from '../common';
import type { ImageFormat } from '../enums';
import type { PageDimensions } from './PageDimensions';

/**
 * Image asset reference associated with a page.
 */
export interface PageImage {
  readonly id: ID<'page-image'>;
  readonly assetId: ID<'asset'>;
  readonly fileName: string;
  readonly format: ImageFormat;
  readonly dimensions: PageDimensions;
  readonly checksum: Nullable<string>;
  readonly colorProfile: Nullable<string>;
}
