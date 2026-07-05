import type { ID, JsonObject, Timestamp } from '@atlas/atlas-types';
import type { CollaborationSessionId, CollaborationUserId } from './core';

export enum CollaborationEventType {
  SessionStarted = 'session-started',
  UserJoined = 'user-joined',
  UserLeft = 'user-left',
  PresenceChanged = 'presence-changed',
  DocumentSynchronized = 'document-synchronized',
  ConflictResolved = 'conflict-resolved',
  CommentCreated = 'comment-created',
  SuggestionCreated = 'suggestion-created',
  ReviewCompleted = 'review-completed',
  AnnotationCreated = 'annotation-created',
  PermissionChanged = 'permission-changed'
}

export interface CollaborationEvent {
  readonly id: ID<'collaboration-event'>;
  readonly type: CollaborationEventType;
  readonly sessionId: CollaborationSessionId;
  readonly actorId: CollaborationUserId | null;
  readonly metadata: JsonObject;
  readonly occurredAt: Timestamp;
}

export function createCollaborationEvent(
  id: ID<'collaboration-event'>,
  type: CollaborationEventType,
  sessionId: CollaborationSessionId,
  actorId: CollaborationUserId | null,
  metadata: JsonObject = {}
): CollaborationEvent {
  return { id, type, sessionId, actorId, metadata, occurredAt: new Date().toISOString() as Timestamp };
}
