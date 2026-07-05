import type { ID, Timestamp } from '../common';

/**
 * Lightweight reference to an editor instance.
 */
export interface EditorReference {
  readonly id: ID<'editor'>;
  readonly workspaceId: ID<'workspace'>;
  readonly projectId: ID<'project'>;
  readonly sessionId: ID<'editor-session'>;
  readonly updatedAt: Timestamp;
}
