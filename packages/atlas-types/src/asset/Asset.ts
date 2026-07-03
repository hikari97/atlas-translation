import type { ID, Nullable } from '../common';
import type { FileType } from '../enums';
import type { AssetChecksum } from './AssetChecksum';
import type { AssetLocation } from './AssetLocation';
import type { AssetMetadata } from './AssetMetadata';
import type { AssetPermission } from './AssetPermission';
import type { AssetSource } from './AssetSource';
import type { AssetVersion } from './AssetVersion';

/**
 * Reusable resource managed by Atlas Studio.
 */
export interface Asset {
  readonly id: ID<'asset'>;
  readonly workspaceId?: ID<'workspace'>;
  readonly projectId?: ID<'project'>;
  readonly name: string;
  readonly fileName: Nullable<string>;
  readonly fileType: FileType;
  readonly mimeType: Nullable<string>;
  readonly sizeBytes: number;
  readonly location: AssetLocation;
  readonly source: AssetSource;
  readonly version: AssetVersion;
  readonly checksum: AssetChecksum;
  readonly permissions: readonly AssetPermission[];
  readonly metadata: AssetMetadata;
  readonly relatedAssetIds: readonly ID<'asset'>[];
}
