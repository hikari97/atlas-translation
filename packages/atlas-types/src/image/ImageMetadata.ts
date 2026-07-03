import type { ID, JsonObject, Nullable, Timestamp } from '../common';

/**
 * Descriptive and audit metadata for an image.
 */
export interface ImageMetadata {
  readonly createdBy: ID<'user'>;
  readonly updatedBy?: ID<'user'>;
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;
  readonly title: Nullable<string>;
  readonly description: Nullable<string>;
  readonly altText: Nullable<string>;
  readonly custom?: JsonObject;
}
