import {
  DefaultBehaviorExecutor,
  CommandResultStatus
} from '@atlas/atlas-command';
import { commandFixture } from '../command/command.test';
import { contextFixture } from '../fixtures/context';
import { handlerFixture } from '../handler/handler.test';

const executor = new DefaultBehaviorExecutor([], handlerFixture);

export const pipelineResult = {
  expected: CommandResultStatus.Success,
  actual: executor.execute(commandFixture, contextFixture)
};
