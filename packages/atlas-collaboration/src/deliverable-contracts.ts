import type { JsonObject } from '@atlas/atlas-types';

export interface CollaborationDeliverableContract {
  readonly id: string;
  readonly kind: CollaborationDeliverableName;
  readonly metadata: JsonObject;
}

export const collaborationDeliverableNames = [
  'FollowUserMetadata',
  'AnnotationAnchor',
  'AnnotationLifecycle',
  'AnnotationMetadata',
  'AnnotationRegistry',
  'AwarenessLifecycle',
  'AwarenessMetadata',
  'AwarenessRegistry',
  'AwarenessState',
  'CollaborationEventCategory',
  'CollaborationEventMetadata',
  'CollaborationEventRegistry',
  'CollaborationEvents',
  'CollaborationPermissionMetadata',
  'CollaborationPermissionPolicy',
  'CollaborationPermissionRegistry',
  'CollaborationSessionContext',
  'CollaborationSessionLifecycle',
  'CollaborationSessionMetadata',
  'CollaborationSessionParticipant',
  'CollaborationSynchronization',
  'CollaborationSynchronizationContext',
  'CollaborationSynchronizationLifecycle',
  'CollaborationSynchronizationMetadata',
  'CollaborationSynchronizationStrategy',
  'CollaborationUserCapabilities',
  'CollaborationUserMetadata',
  'CollaborationUserProfile',
  'CollaborationUserRole',
  'CommentLifecycle',
  'CommentMetadata',
  'CommentRegistry',
  'CommentThread',
  'Comments',
  'ConflictContext',
  'ConflictLifecycle',
  'ConflictMetadata',
  'PresenceLifecycle',
  'PresenceMetadata',
  'PresenceRegistry',
  'PresenceState',
  'RemoteCursorLifecycle',
  'RemoteCursorMetadata',
  'RemoteCursorRegistry',
  'RemoteCursorState',
  'RemoteSelectionLifecycle',
  'RemoteSelectionMetadata',
  'RemoteSelectionRange',
  'RemoteSelectionRegistry',
  'ReviewDecision',
  'ReviewLifecycle',
  'ReviewMetadata',
  'ReviewRegistry',
  'ReviewWorkflow',
  'SharedClipboardLifecycle',
  'SharedClipboardMetadata',
  'SharedClipboardRegistry',
  'SharedDocumentContext',
  'SharedDocumentLifecycle',
  'SharedDocumentMetadata',
  'SharedDocumentState',
  'SuggestionLifecycle',
  'SuggestionMetadata',
  'SuggestionRegistry',
  'SuggestionStatus',
  'Suggestions',
] as const;

export type CollaborationDeliverableName = typeof collaborationDeliverableNames[number];

export type CollaborationDeliverableMap = {
  readonly [TName in CollaborationDeliverableName]: CollaborationDeliverableContract;
};

export function createCollaborationDeliverable(name: CollaborationDeliverableName, id: string, metadata: JsonObject = {}): CollaborationDeliverableContract {
  return { id, kind: name, metadata };
}
