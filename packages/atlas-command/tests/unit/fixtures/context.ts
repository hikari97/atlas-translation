import type { CommandContext, CommandContextId } from '@atlas/atlas-command';
import type { Timestamp } from '@atlas/atlas-types';

export const contextFixture = {
  id: 'context-1' as CommandContextId,
  document: null,
  userId: null,
  correlationId: 'correlation-1',
  startedAt: '2026-07-03T00:00:00.000Z' as Timestamp,
  options: {
    dryRun: false,
    collectDiagnostics: true
  }
} satisfies CommandContext;
