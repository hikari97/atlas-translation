import {
  DefaultCommandBus,
  DefaultCommandDispatcher,
  DefaultCommandResolver,
  DefaultHandlerRegistry
} from '@atlas/atlas-command';
import { commandFixture } from '../../unit/command/command.test';
import { contextFixture } from '../../unit/fixtures/context';
import { handlerFixture } from '../../unit/handler/handler.test';

const handlers = new DefaultHandlerRegistry();
handlers.register({
  commandName: commandFixture.name,
  handlerName: 'TestHandler',
  factory: { create: () => handlerFixture }
});

export const lifecycleResult = new DefaultCommandBus(
  new DefaultCommandDispatcher(new DefaultCommandResolver(handlers))
).execute(commandFixture, contextFixture);
