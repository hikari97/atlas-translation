import type { ID, JsonObject, Timestamp } from '@atlas/atlas-types';
import type { CollaborationUserId } from './core';

export enum PresenceStatus {
  Online = 'online',
  Away = 'away',
  Busy = 'busy',
  Offline = 'offline'
}

export interface CollaborationUser {
  readonly id: CollaborationUserId;
  readonly displayName: string;
  readonly color: string;
  readonly metadata: JsonObject;
}

export interface Presence {
  readonly userId: CollaborationUserId;
  readonly status: PresenceStatus;
  readonly lastSeenAt: Timestamp;
  readonly metadata: JsonObject;
}

export interface Awareness {
  readonly userId: CollaborationUserId;
  readonly focus: string | null;
  readonly activity: string | null;
  readonly metadata: JsonObject;
  readonly updatedAt: Timestamp;
}

export interface RemoteCursor {
  readonly userId: CollaborationUserId;
  readonly x: number;
  readonly y: number;
  readonly viewportId: string | null;
  readonly updatedAt: Timestamp;
}

export interface RemoteSelection {
  readonly userId: CollaborationUserId;
  readonly selectionIds: readonly string[];
  readonly metadata: JsonObject;
  readonly updatedAt: Timestamp;
}

export interface FollowUser {
  readonly followerId: CollaborationUserId;
  readonly targetId: CollaborationUserId;
  readonly enabled: boolean;
  readonly metadata: JsonObject;
}

export interface ParticipantPresence {
  readonly user: CollaborationUser;
  readonly presence: Presence;
  readonly awareness: Awareness | null;
}

export function createCollaborationUser(id: CollaborationUserId, displayName: string, color: string, metadata: JsonObject = {}): CollaborationUser {
  return { id, displayName, color, metadata };
}

export function createPresence(userId: CollaborationUserId, status: PresenceStatus, metadata: JsonObject = {}): Presence {
  return { userId, status, lastSeenAt: new Date().toISOString() as Timestamp, metadata };
}

export function createRemoteCursor(userId: CollaborationUserId, x: number, y: number, viewportId: string | null = null): RemoteCursor {
  return { userId, x, y, viewportId, updatedAt: new Date().toISOString() as Timestamp };
}
