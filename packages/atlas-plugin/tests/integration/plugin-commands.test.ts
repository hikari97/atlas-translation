import type { Timestamp } from '@atlas/atlas-types';
import type { CommandId, CommandName, CommandResult } from '@atlas/atlas-command';
import { CommandResultStatus } from '@atlas/atlas-command';
import { DefaultPluginContext } from '@atlas/atlas-plugin';

const context = new DefaultPluginContext();
const result: CommandResult<unknown> = await context.execute({
  id: 'command-1' as CommandId,
  name: 'atlas.test.command' as CommandName,
  payload: {},
  createdAt: new Date().toISOString() as Timestamp
});

const commandStatus: CommandResultStatus = result.status;

export { commandStatus };
