import type { CommandHandler } from '@atlas/atlas-command';
import { CommandResultStatus } from '@atlas/atlas-command';
import { commandFixture } from '../command/command.test';
import { contextFixture } from '../fixtures/context';

export const handlerFixture: CommandHandler = {
  handle: () => ({
    status: CommandResultStatus.Success,
    value: null,
    errors: []
  })
};

export const handlerResult = handlerFixture.handle(commandFixture, contextFixture);
