import type { ID, Nullable, Timestamp } from '../common';
import type { WorkspaceStatus } from '../enums';

/**
 * Lightweight reference to a workspace.
 */
export interface WorkspaceReference {
  readonly id: ID<'workspace'>;
  readonly name: string;
  readonly description: Nullable<string>;
  readonly status: WorkspaceStatus;
  readonly updatedAt: Timestamp;
}
