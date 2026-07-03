import type { ID, Timestamp } from '../common';

/**
 * User permission assignment within a workspace.
 */
export interface WorkspacePermission {
  readonly userId: ID<'user'>;
  readonly role: 'owner' | 'admin' | 'editor' | 'reviewer' | 'viewer';
  readonly canCreateProjects: boolean;
  readonly canManageSettings: boolean;
  readonly canManageMembers: boolean;
  readonly grantedAt: Timestamp;
}
