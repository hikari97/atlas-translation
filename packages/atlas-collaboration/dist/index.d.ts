import { ID, JsonObject, Timestamp } from '@atlas/atlas-types';

type CollaborationSessionId = ID<'collaboration-session'>;
type CollaborationUserId = ID<'collaboration-user'>;
type CollaborationServiceId = ID<'collaboration-service'>;
type SharedDocumentId = ID<'shared-document'>;
declare enum CollaborationLifecycle {
    Created = "created",
    Active = "active",
    Suspended = "suspended",
    Closed = "closed",
    Archived = "archived"
}
interface CollaborationMetadata {
    readonly id: string;
    readonly name: string;
    readonly createdAt: Timestamp;
    readonly metadata: JsonObject;
}
interface CollaborationContext {
    readonly sessionId: CollaborationSessionId | null;
    readonly actorId: CollaborationUserId | null;
    readonly metadata: JsonObject;
}
interface CollaborationService {
    readonly id: CollaborationServiceId;
    readonly capability: string;
    readonly metadata: JsonObject;
}
declare class CollaborationRegistry {
    private readonly services;
    register(service: CollaborationService): void;
    get(id: CollaborationServiceId): CollaborationService | null;
    list(): readonly CollaborationService[];
}
interface CollaborationCore {
    readonly registry: CollaborationRegistry;
    readonly context: CollaborationContext;
    readonly lifecycle: CollaborationLifecycle;
    readonly metadata: CollaborationMetadata;
}
declare function createCollaborationCore(metadata: CollaborationMetadata, context: CollaborationContext): CollaborationCore;
interface CollaborationSession {
    readonly id: CollaborationSessionId;
    readonly documentId: SharedDocumentId;
    readonly participantIds: readonly CollaborationUserId[];
    readonly lifecycle: CollaborationLifecycle;
    readonly metadata: JsonObject;
}
declare function createCollaborationSession(id: CollaborationSessionId, documentId: SharedDocumentId, metadata?: JsonObject): CollaborationSession;

interface CollaborationDeliverableContract {
    readonly id: string;
    readonly kind: CollaborationDeliverableName;
    readonly metadata: JsonObject;
}
declare const collaborationDeliverableNames: readonly ["FollowUserMetadata", "AnnotationAnchor", "AnnotationLifecycle", "AnnotationMetadata", "AnnotationRegistry", "AwarenessLifecycle", "AwarenessMetadata", "AwarenessRegistry", "AwarenessState", "CollaborationEventCategory", "CollaborationEventMetadata", "CollaborationEventRegistry", "CollaborationEvents", "CollaborationPermissionMetadata", "CollaborationPermissionPolicy", "CollaborationPermissionRegistry", "CollaborationSessionContext", "CollaborationSessionLifecycle", "CollaborationSessionMetadata", "CollaborationSessionParticipant", "CollaborationSynchronization", "CollaborationSynchronizationContext", "CollaborationSynchronizationLifecycle", "CollaborationSynchronizationMetadata", "CollaborationSynchronizationStrategy", "CollaborationUserCapabilities", "CollaborationUserMetadata", "CollaborationUserProfile", "CollaborationUserRole", "CommentLifecycle", "CommentMetadata", "CommentRegistry", "CommentThread", "Comments", "ConflictContext", "ConflictLifecycle", "ConflictMetadata", "PresenceLifecycle", "PresenceMetadata", "PresenceRegistry", "PresenceState", "RemoteCursorLifecycle", "RemoteCursorMetadata", "RemoteCursorRegistry", "RemoteCursorState", "RemoteSelectionLifecycle", "RemoteSelectionMetadata", "RemoteSelectionRange", "RemoteSelectionRegistry", "ReviewDecision", "ReviewLifecycle", "ReviewMetadata", "ReviewRegistry", "ReviewWorkflow", "SharedClipboardLifecycle", "SharedClipboardMetadata", "SharedClipboardRegistry", "SharedDocumentContext", "SharedDocumentLifecycle", "SharedDocumentMetadata", "SharedDocumentState", "SuggestionLifecycle", "SuggestionMetadata", "SuggestionRegistry", "SuggestionStatus", "Suggestions"];
type CollaborationDeliverableName = typeof collaborationDeliverableNames[number];
type CollaborationDeliverableMap = {
    readonly [TName in CollaborationDeliverableName]: CollaborationDeliverableContract;
};
declare function createCollaborationDeliverable(name: CollaborationDeliverableName, id: string, metadata?: JsonObject): CollaborationDeliverableContract;

declare enum CollaborationEventType {
    SessionStarted = "session-started",
    UserJoined = "user-joined",
    UserLeft = "user-left",
    PresenceChanged = "presence-changed",
    DocumentSynchronized = "document-synchronized",
    ConflictResolved = "conflict-resolved",
    CommentCreated = "comment-created",
    SuggestionCreated = "suggestion-created",
    ReviewCompleted = "review-completed",
    AnnotationCreated = "annotation-created",
    PermissionChanged = "permission-changed"
}
interface CollaborationEvent {
    readonly id: ID<'collaboration-event'>;
    readonly type: CollaborationEventType;
    readonly sessionId: CollaborationSessionId;
    readonly actorId: CollaborationUserId | null;
    readonly metadata: JsonObject;
    readonly occurredAt: Timestamp;
}
declare function createCollaborationEvent(id: ID<'collaboration-event'>, type: CollaborationEventType, sessionId: CollaborationSessionId, actorId: CollaborationUserId | null, metadata?: JsonObject): CollaborationEvent;

interface HistoryMetadata {
    readonly sessionId: CollaborationSessionId;
    readonly metadata: JsonObject;
}
interface HistoryEntry {
    readonly id: ID<'collaboration-history-entry'>;
    readonly event: CollaborationEvent;
    readonly recordedAt: Timestamp;
}
interface HistoryTimeline {
    readonly entries: readonly HistoryEntry[];
}
interface CollaborationHistory {
    readonly timeline: HistoryTimeline;
    readonly lifecycle: CollaborationLifecycle;
    readonly metadata: HistoryMetadata;
}
type HistoryLifecycle = CollaborationLifecycle;
declare function createHistoryEntry(id: ID<'collaboration-history-entry'>, event: CollaborationEvent): HistoryEntry;
declare function appendHistory(timeline: HistoryTimeline, entry: HistoryEntry): HistoryTimeline;

declare enum PresenceStatus {
    Online = "online",
    Away = "away",
    Busy = "busy",
    Offline = "offline"
}
interface CollaborationUser {
    readonly id: CollaborationUserId;
    readonly displayName: string;
    readonly color: string;
    readonly metadata: JsonObject;
}
interface Presence {
    readonly userId: CollaborationUserId;
    readonly status: PresenceStatus;
    readonly lastSeenAt: Timestamp;
    readonly metadata: JsonObject;
}
interface Awareness {
    readonly userId: CollaborationUserId;
    readonly focus: string | null;
    readonly activity: string | null;
    readonly metadata: JsonObject;
    readonly updatedAt: Timestamp;
}
interface RemoteCursor {
    readonly userId: CollaborationUserId;
    readonly x: number;
    readonly y: number;
    readonly viewportId: string | null;
    readonly updatedAt: Timestamp;
}
interface RemoteSelection {
    readonly userId: CollaborationUserId;
    readonly selectionIds: readonly string[];
    readonly metadata: JsonObject;
    readonly updatedAt: Timestamp;
}
interface FollowUser {
    readonly followerId: CollaborationUserId;
    readonly targetId: CollaborationUserId;
    readonly enabled: boolean;
    readonly metadata: JsonObject;
}
interface ParticipantPresence {
    readonly user: CollaborationUser;
    readonly presence: Presence;
    readonly awareness: Awareness | null;
}
declare function createCollaborationUser(id: CollaborationUserId, displayName: string, color: string, metadata?: JsonObject): CollaborationUser;
declare function createPresence(userId: CollaborationUserId, status: PresenceStatus, metadata?: JsonObject): Presence;
declare function createRemoteCursor(userId: CollaborationUserId, x: number, y: number, viewportId?: string | null): RemoteCursor;

declare enum CollaborationPermission {
    View = "view",
    Comment = "comment",
    Suggest = "suggest",
    Edit = "edit",
    Review = "review",
    Manage = "manage"
}
interface CollaborationPermissions {
    readonly userId: CollaborationUserId;
    readonly permissions: readonly CollaborationPermission[];
    readonly metadata: JsonObject;
}
declare function canCollaborate(grant: CollaborationPermissions, permission: CollaborationPermission): boolean;

declare enum SynchronizationState {
    Idle = "idle",
    Syncing = "syncing",
    Synchronized = "synchronized",
    Conflicted = "conflicted",
    Failed = "failed"
}
interface SharedDocument {
    readonly id: SharedDocumentId;
    readonly version: number;
    readonly checksum: string;
    readonly metadata: JsonObject;
}
interface SynchronizationSnapshot {
    readonly documentId: SharedDocumentId;
    readonly state: SynchronizationState;
    readonly version: number;
    readonly synchronizedAt: Timestamp | null;
    readonly metadata: JsonObject;
}
declare enum ConflictResolutionStrategy {
    Manual = "manual",
    LocalWins = "local-wins",
    RemoteWins = "remote-wins",
    Merge = "merge"
}
interface ConflictResolution {
    readonly id: ID<'collaboration-conflict'>;
    readonly documentId: SharedDocumentId;
    readonly strategy: ConflictResolutionStrategy;
    readonly resolvedBy: CollaborationUserId | null;
    readonly metadata: JsonObject;
}
interface SharedClipboardItem {
    readonly id: ID<'shared-clipboard-item'>;
    readonly ownerId: CollaborationUserId;
    readonly mimeType: string;
    readonly payload: JsonObject;
    readonly createdAt: Timestamp;
}
interface SharedClipboard {
    readonly items: readonly SharedClipboardItem[];
}
declare function createSharedDocument(id: SharedDocumentId, checksum: string, metadata?: JsonObject): SharedDocument;
declare function createSynchronizationSnapshot(document: SharedDocument, state: SynchronizationState): SynchronizationSnapshot;

declare enum CollaborationWorkflowState {
    Open = "open",
    Resolved = "resolved",
    Rejected = "rejected",
    Archived = "archived"
}
interface Comment {
    readonly id: ID<'collaboration-comment'>;
    readonly documentId: SharedDocumentId;
    readonly authorId: CollaborationUserId;
    readonly body: string;
    readonly state: CollaborationWorkflowState;
    readonly metadata: JsonObject;
    readonly createdAt: Timestamp;
}
interface Suggestion {
    readonly id: ID<'collaboration-suggestion'>;
    readonly documentId: SharedDocumentId;
    readonly authorId: CollaborationUserId;
    readonly summary: string;
    readonly patch: JsonObject;
    readonly state: CollaborationWorkflowState;
    readonly createdAt: Timestamp;
}
interface Review {
    readonly id: ID<'collaboration-review'>;
    readonly documentId: SharedDocumentId;
    readonly reviewerId: CollaborationUserId;
    readonly state: CollaborationWorkflowState;
    readonly commentIds: readonly ID<'collaboration-comment'>[];
    readonly suggestionIds: readonly ID<'collaboration-suggestion'>[];
}
interface Annotation {
    readonly id: ID<'collaboration-annotation'>;
    readonly documentId: SharedDocumentId;
    readonly authorId: CollaborationUserId;
    readonly targetId: string;
    readonly body: string;
    readonly metadata: JsonObject;
    readonly createdAt: Timestamp;
}
declare function createComment(id: ID<'collaboration-comment'>, documentId: SharedDocumentId, authorId: CollaborationUserId, body: string, metadata?: JsonObject): Comment;
declare function createAnnotation(id: ID<'collaboration-annotation'>, documentId: SharedDocumentId, authorId: CollaborationUserId, targetId: string, body: string, metadata?: JsonObject): Annotation;

export { type Annotation, type Awareness, type CollaborationContext, type CollaborationCore, type CollaborationDeliverableContract, type CollaborationDeliverableMap, type CollaborationDeliverableName, type CollaborationEvent, CollaborationEventType, type CollaborationHistory, CollaborationLifecycle, type CollaborationMetadata, CollaborationPermission, type CollaborationPermissions, CollaborationRegistry, type CollaborationService, type CollaborationServiceId, type CollaborationSession, type CollaborationSessionId, type CollaborationUser, type CollaborationUserId, CollaborationWorkflowState, type Comment, type ConflictResolution, ConflictResolutionStrategy, type FollowUser, type HistoryEntry, type HistoryLifecycle, type HistoryMetadata, type HistoryTimeline, type ParticipantPresence, type Presence, PresenceStatus, type RemoteCursor, type RemoteSelection, type Review, type SharedClipboard, type SharedClipboardItem, type SharedDocument, type SharedDocumentId, type Suggestion, type SynchronizationSnapshot, SynchronizationState, appendHistory, canCollaborate, collaborationDeliverableNames, createAnnotation, createCollaborationCore, createCollaborationDeliverable, createCollaborationEvent, createCollaborationSession, createCollaborationUser, createComment, createHistoryEntry, createPresence, createRemoteCursor, createSharedDocument, createSynchronizationSnapshot };
