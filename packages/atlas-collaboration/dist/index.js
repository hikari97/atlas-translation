// src/core.ts
var CollaborationLifecycle = /* @__PURE__ */ ((CollaborationLifecycle2) => {
  CollaborationLifecycle2["Created"] = "created";
  CollaborationLifecycle2["Active"] = "active";
  CollaborationLifecycle2["Suspended"] = "suspended";
  CollaborationLifecycle2["Closed"] = "closed";
  CollaborationLifecycle2["Archived"] = "archived";
  return CollaborationLifecycle2;
})(CollaborationLifecycle || {});
var CollaborationRegistry = class {
  services = /* @__PURE__ */ new Map();
  register(service) {
    this.services.set(service.id, service);
  }
  get(id) {
    return this.services.get(id) ?? null;
  }
  list() {
    return [...this.services.values()];
  }
};
function createCollaborationCore(metadata, context) {
  return {
    registry: new CollaborationRegistry(),
    context,
    lifecycle: "created" /* Created */,
    metadata
  };
}
function createCollaborationSession(id, documentId, metadata = {}) {
  return { id, documentId, participantIds: [], lifecycle: "created" /* Created */, metadata };
}

// src/deliverable-contracts.ts
var collaborationDeliverableNames = [
  "FollowUserMetadata",
  "AnnotationAnchor",
  "AnnotationLifecycle",
  "AnnotationMetadata",
  "AnnotationRegistry",
  "AwarenessLifecycle",
  "AwarenessMetadata",
  "AwarenessRegistry",
  "AwarenessState",
  "CollaborationEventCategory",
  "CollaborationEventMetadata",
  "CollaborationEventRegistry",
  "CollaborationEvents",
  "CollaborationPermissionMetadata",
  "CollaborationPermissionPolicy",
  "CollaborationPermissionRegistry",
  "CollaborationSessionContext",
  "CollaborationSessionLifecycle",
  "CollaborationSessionMetadata",
  "CollaborationSessionParticipant",
  "CollaborationSynchronization",
  "CollaborationSynchronizationContext",
  "CollaborationSynchronizationLifecycle",
  "CollaborationSynchronizationMetadata",
  "CollaborationSynchronizationStrategy",
  "CollaborationUserCapabilities",
  "CollaborationUserMetadata",
  "CollaborationUserProfile",
  "CollaborationUserRole",
  "CommentLifecycle",
  "CommentMetadata",
  "CommentRegistry",
  "CommentThread",
  "Comments",
  "ConflictContext",
  "ConflictLifecycle",
  "ConflictMetadata",
  "PresenceLifecycle",
  "PresenceMetadata",
  "PresenceRegistry",
  "PresenceState",
  "RemoteCursorLifecycle",
  "RemoteCursorMetadata",
  "RemoteCursorRegistry",
  "RemoteCursorState",
  "RemoteSelectionLifecycle",
  "RemoteSelectionMetadata",
  "RemoteSelectionRange",
  "RemoteSelectionRegistry",
  "ReviewDecision",
  "ReviewLifecycle",
  "ReviewMetadata",
  "ReviewRegistry",
  "ReviewWorkflow",
  "SharedClipboardLifecycle",
  "SharedClipboardMetadata",
  "SharedClipboardRegistry",
  "SharedDocumentContext",
  "SharedDocumentLifecycle",
  "SharedDocumentMetadata",
  "SharedDocumentState",
  "SuggestionLifecycle",
  "SuggestionMetadata",
  "SuggestionRegistry",
  "SuggestionStatus",
  "Suggestions"
];
function createCollaborationDeliverable(name, id, metadata = {}) {
  return { id, kind: name, metadata };
}

// src/events.ts
var CollaborationEventType = /* @__PURE__ */ ((CollaborationEventType2) => {
  CollaborationEventType2["SessionStarted"] = "session-started";
  CollaborationEventType2["UserJoined"] = "user-joined";
  CollaborationEventType2["UserLeft"] = "user-left";
  CollaborationEventType2["PresenceChanged"] = "presence-changed";
  CollaborationEventType2["DocumentSynchronized"] = "document-synchronized";
  CollaborationEventType2["ConflictResolved"] = "conflict-resolved";
  CollaborationEventType2["CommentCreated"] = "comment-created";
  CollaborationEventType2["SuggestionCreated"] = "suggestion-created";
  CollaborationEventType2["ReviewCompleted"] = "review-completed";
  CollaborationEventType2["AnnotationCreated"] = "annotation-created";
  CollaborationEventType2["PermissionChanged"] = "permission-changed";
  return CollaborationEventType2;
})(CollaborationEventType || {});
function createCollaborationEvent(id, type, sessionId, actorId, metadata = {}) {
  return { id, type, sessionId, actorId, metadata, occurredAt: (/* @__PURE__ */ new Date()).toISOString() };
}

// src/history.ts
function createHistoryEntry(id, event) {
  return { id, event, recordedAt: (/* @__PURE__ */ new Date()).toISOString() };
}
function appendHistory(timeline, entry) {
  return { entries: [...timeline.entries, entry] };
}

// src/participants.ts
var PresenceStatus = /* @__PURE__ */ ((PresenceStatus2) => {
  PresenceStatus2["Online"] = "online";
  PresenceStatus2["Away"] = "away";
  PresenceStatus2["Busy"] = "busy";
  PresenceStatus2["Offline"] = "offline";
  return PresenceStatus2;
})(PresenceStatus || {});
function createCollaborationUser(id, displayName, color, metadata = {}) {
  return { id, displayName, color, metadata };
}
function createPresence(userId, status, metadata = {}) {
  return { userId, status, lastSeenAt: (/* @__PURE__ */ new Date()).toISOString(), metadata };
}
function createRemoteCursor(userId, x, y, viewportId = null) {
  return { userId, x, y, viewportId, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
}

// src/security.ts
var CollaborationPermission = /* @__PURE__ */ ((CollaborationPermission2) => {
  CollaborationPermission2["View"] = "view";
  CollaborationPermission2["Comment"] = "comment";
  CollaborationPermission2["Suggest"] = "suggest";
  CollaborationPermission2["Edit"] = "edit";
  CollaborationPermission2["Review"] = "review";
  CollaborationPermission2["Manage"] = "manage";
  return CollaborationPermission2;
})(CollaborationPermission || {});
function canCollaborate(grant, permission) {
  return grant.permissions.includes(permission);
}

// src/shared.ts
var SynchronizationState = /* @__PURE__ */ ((SynchronizationState2) => {
  SynchronizationState2["Idle"] = "idle";
  SynchronizationState2["Syncing"] = "syncing";
  SynchronizationState2["Synchronized"] = "synchronized";
  SynchronizationState2["Conflicted"] = "conflicted";
  SynchronizationState2["Failed"] = "failed";
  return SynchronizationState2;
})(SynchronizationState || {});
var ConflictResolutionStrategy = /* @__PURE__ */ ((ConflictResolutionStrategy2) => {
  ConflictResolutionStrategy2["Manual"] = "manual";
  ConflictResolutionStrategy2["LocalWins"] = "local-wins";
  ConflictResolutionStrategy2["RemoteWins"] = "remote-wins";
  ConflictResolutionStrategy2["Merge"] = "merge";
  return ConflictResolutionStrategy2;
})(ConflictResolutionStrategy || {});
function createSharedDocument(id, checksum, metadata = {}) {
  return { id, version: 1, checksum, metadata };
}
function createSynchronizationSnapshot(document, state) {
  return {
    documentId: document.id,
    state,
    version: document.version,
    synchronizedAt: state === "synchronized" /* Synchronized */ ? (/* @__PURE__ */ new Date()).toISOString() : null,
    metadata: {}
  };
}

// src/workflow.ts
var CollaborationWorkflowState = /* @__PURE__ */ ((CollaborationWorkflowState2) => {
  CollaborationWorkflowState2["Open"] = "open";
  CollaborationWorkflowState2["Resolved"] = "resolved";
  CollaborationWorkflowState2["Rejected"] = "rejected";
  CollaborationWorkflowState2["Archived"] = "archived";
  return CollaborationWorkflowState2;
})(CollaborationWorkflowState || {});
function createComment(id, documentId, authorId, body, metadata = {}) {
  return { id, documentId, authorId, body, state: "open" /* Open */, metadata, createdAt: (/* @__PURE__ */ new Date()).toISOString() };
}
function createAnnotation(id, documentId, authorId, targetId, body, metadata = {}) {
  return { id, documentId, authorId, targetId, body, metadata, createdAt: (/* @__PURE__ */ new Date()).toISOString() };
}
export {
  CollaborationEventType,
  CollaborationLifecycle,
  CollaborationPermission,
  CollaborationRegistry,
  CollaborationWorkflowState,
  ConflictResolutionStrategy,
  PresenceStatus,
  SynchronizationState,
  appendHistory,
  canCollaborate,
  collaborationDeliverableNames,
  createAnnotation,
  createCollaborationCore,
  createCollaborationDeliverable,
  createCollaborationEvent,
  createCollaborationSession,
  createCollaborationUser,
  createComment,
  createHistoryEntry,
  createPresence,
  createRemoteCursor,
  createSharedDocument,
  createSynchronizationSnapshot
};
//# sourceMappingURL=index.js.map