import type { ID, Nullable, Timestamp } from '../common';
import type { FileType } from '../enums';

/**
 * Lightweight reference to an asset.
 */
export interface AssetReference {
  readonly id: ID<'asset'>;
  readonly workspaceId?: ID<'workspace'>;
  readonly projectId?: ID<'project'>;
  readonly name: string;
  readonly fileType: FileType;
  readonly mimeType: Nullable<string>;
  readonly updatedAt: Timestamp;
}
