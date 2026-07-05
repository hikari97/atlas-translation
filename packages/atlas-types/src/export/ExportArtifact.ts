import type { ID, Nullable, Timestamp } from '../common';
import type { AssetReference } from '../asset';

/**
 * Generated artifact produced by an export operation.
 */
export interface ExportArtifact {
  readonly id: ID<'export-artifact'>;
  readonly asset: Nullable<AssetReference>;
  readonly fileName: string;
  readonly mimeType: string;
  readonly sizeBytes: number;
  readonly checksum: Nullable<string>;
  readonly createdAt: Timestamp;
}
