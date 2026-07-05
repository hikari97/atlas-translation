import { createCollaborationUser } from '../src';
import type { ID } from '@atlas/atlas-types';

export const benchmarkUsers = Array.from({ length: 1_000 }, (_, index) =>
  createCollaborationUser(`user:${index}` as ID<'collaboration-user'>, `User ${index}`, '#334155')
);
