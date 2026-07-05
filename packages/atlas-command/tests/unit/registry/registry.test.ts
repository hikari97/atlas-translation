import {
  DefaultCommandRegistry,
  DefaultHandlerRegistry
} from '@atlas/atlas-command';
import { commandFixture } from '../command/command.test';
import { handlerFixture } from '../handler/handler.test';

const commands = new DefaultCommandRegistry();
commands.register({
  name: commandFixture.name,
  description: 'Test command',
  version: '0.1.0'
});

const handlers = new DefaultHandlerRegistry();
handlers.register({
  commandName: commandFixture.name,
  handlerName: 'TestHandler',
  factory: {
    create: () => handlerFixture
  }
});

export const registryResult = {
  commandCount: commands.list().length,
  handlerCount: handlers.list().length
};
