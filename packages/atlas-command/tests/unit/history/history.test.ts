import {
  CommandResultStatus,
  DefaultHistoryStore
} from '@atlas/atlas-command';
import type { ID, Timestamp } from '@atlas/atlas-types';
import { commandFixture } from '../command/command.test';

const store = new DefaultHistoryStore();
store.record({
  id: 'history-1' as ID<'command-history-entry'>,
  commandId: commandFixture.id,
  commandName: commandFixture.name,
  status: CommandResultStatus.Success,
  executedAt: '2026-07-03T00:00:00.000Z' as Timestamp,
  durationMs: 1,
  correlationId: null,
  userId: null
});

export const historyResult = store.query();
