import { PresenceStatus, createCollaborationSession, createCollaborationUser, createPresence } from '../../src';
import type { ID } from '@atlas/atlas-types';

export const user = createCollaborationUser('user:example' as ID<'collaboration-user'>, 'Reviewer', '#2f855a');

export const session = createCollaborationSession(
  'session:example' as ID<'collaboration-session'>,
  'document:example' as ID<'shared-document'>
);

export const presence = createPresence(user.id, PresenceStatus.Online);
