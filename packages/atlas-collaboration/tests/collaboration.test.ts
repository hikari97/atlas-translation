import {
  CollaborationEventType,
  CollaborationLifecycle,
  CollaborationPermission,
  PresenceStatus,
  SynchronizationState,
  canCollaborate,
  createCollaborationEvent,
  createCollaborationSession,
  createCollaborationUser,
  createPresence,
  createRemoteCursor,
  createSharedDocument,
  createSynchronizationSnapshot
} from '../src';
import type { ID } from '@atlas/atlas-types';

const userId = 'user:test' as ID<'collaboration-user'>;
const documentId = 'document:test' as ID<'shared-document'>;
const sessionId = 'session:test' as ID<'collaboration-session'>;

const user = createCollaborationUser(userId, 'Makki', '#3366ff');
user.id satisfies ID<'collaboration-user'>;

const session = createCollaborationSession(sessionId, documentId);
session.lifecycle satisfies CollaborationLifecycle;

const presence = createPresence(userId, PresenceStatus.Online);
presence.status satisfies PresenceStatus;

const cursor = createRemoteCursor(userId, 10, 20);
cursor.x satisfies number;

const document = createSharedDocument(documentId, 'checksum');
const snapshot = createSynchronizationSnapshot(document, SynchronizationState.Synchronized);
snapshot.state satisfies SynchronizationState;

const event = createCollaborationEvent('event:test' as ID<'collaboration-event'>, CollaborationEventType.UserJoined, sessionId, userId);
event.type satisfies CollaborationEventType;

canCollaborate({ userId, permissions: [CollaborationPermission.View], metadata: {} }, CollaborationPermission.View) satisfies boolean;
