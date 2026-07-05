import type { ID, JsonObject, Timestamp } from '@atlas/atlas-types';
import type { CollaborationUserId, SharedDocumentId } from './core';

export enum CollaborationWorkflowState {
  Open = 'open',
  Resolved = 'resolved',
  Rejected = 'rejected',
  Archived = 'archived'
}

export interface Comment {
  readonly id: ID<'collaboration-comment'>;
  readonly documentId: SharedDocumentId;
  readonly authorId: CollaborationUserId;
  readonly body: string;
  readonly state: CollaborationWorkflowState;
  readonly metadata: JsonObject;
  readonly createdAt: Timestamp;
}

export interface Suggestion {
  readonly id: ID<'collaboration-suggestion'>;
  readonly documentId: SharedDocumentId;
  readonly authorId: CollaborationUserId;
  readonly summary: string;
  readonly patch: JsonObject;
  readonly state: CollaborationWorkflowState;
  readonly createdAt: Timestamp;
}

export interface Review {
  readonly id: ID<'collaboration-review'>;
  readonly documentId: SharedDocumentId;
  readonly reviewerId: CollaborationUserId;
  readonly state: CollaborationWorkflowState;
  readonly commentIds: readonly ID<'collaboration-comment'>[];
  readonly suggestionIds: readonly ID<'collaboration-suggestion'>[];
}

export interface Annotation {
  readonly id: ID<'collaboration-annotation'>;
  readonly documentId: SharedDocumentId;
  readonly authorId: CollaborationUserId;
  readonly targetId: string;
  readonly body: string;
  readonly metadata: JsonObject;
  readonly createdAt: Timestamp;
}

export function createComment(id: ID<'collaboration-comment'>, documentId: SharedDocumentId, authorId: CollaborationUserId, body: string, metadata: JsonObject = {}): Comment {
  return { id, documentId, authorId, body, state: CollaborationWorkflowState.Open, metadata, createdAt: new Date().toISOString() as Timestamp };
}

export function createAnnotation(id: ID<'collaboration-annotation'>, documentId: SharedDocumentId, authorId: CollaborationUserId, targetId: string, body: string, metadata: JsonObject = {}): Annotation {
  return { id, documentId, authorId, targetId, body, metadata, createdAt: new Date().toISOString() as Timestamp };
}
