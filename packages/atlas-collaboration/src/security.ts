import type { JsonObject } from '@atlas/atlas-types';
import type { CollaborationUserId } from './core';

export enum CollaborationPermission {
  View = 'view',
  Comment = 'comment',
  Suggest = 'suggest',
  Edit = 'edit',
  Review = 'review',
  Manage = 'manage'
}

export interface CollaborationPermissions {
  readonly userId: CollaborationUserId;
  readonly permissions: readonly CollaborationPermission[];
  readonly metadata: JsonObject;
}

export function canCollaborate(grant: CollaborationPermissions, permission: CollaborationPermission): boolean {
  return grant.permissions.includes(permission);
}
