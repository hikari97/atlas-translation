import type { Command, CommandId, CommandName } from '@atlas/atlas-command';
import type { Timestamp } from '@atlas/atlas-types';

export const commandFixture = {
  id: 'command-1' as CommandId,
  name: 'test.command' as CommandName,
  payload: {},
  createdAt: '2026-07-03T00:00:00.000Z' as Timestamp
} satisfies Command;
