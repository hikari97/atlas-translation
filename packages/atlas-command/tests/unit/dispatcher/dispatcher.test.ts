import {
  DefaultCommandDispatcher,
  DefaultCommandResolver,
  DefaultHandlerRegistry
} from '@atlas/atlas-command';
import { commandFixture } from '../command/command.test';
import { contextFixture } from '../fixtures/context';
import { handlerFixture } from '../handler/handler.test';

const handlers = new DefaultHandlerRegistry();
handlers.register({
  commandName: commandFixture.name,
  handlerName: 'TestHandler',
  factory: {
    create: () => handlerFixture
  }
});

export const dispatcherResult = new DefaultCommandDispatcher(
  new DefaultCommandResolver(handlers)
).dispatch(commandFixture, contextFixture);
