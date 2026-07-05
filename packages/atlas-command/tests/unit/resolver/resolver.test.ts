import {
  DefaultCommandResolver,
  DefaultHandlerRegistry
} from '@atlas/atlas-command';
import { commandFixture } from '../command/command.test';
import { handlerFixture } from '../handler/handler.test';

const handlers = new DefaultHandlerRegistry();
handlers.register({
  commandName: commandFixture.name,
  handlerName: 'TestHandler',
  factory: {
    create: () => handlerFixture
  }
});

export const resolverResult = new DefaultCommandResolver(handlers).resolve(commandFixture);
