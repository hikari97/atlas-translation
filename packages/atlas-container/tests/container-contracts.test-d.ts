import {
  asyncFactoryProvider,
  classProvider,
  createContainer,
  createContainerToken,
  factoryProvider,
  type ContainerProvider,
} from '../src';

interface Logger {
  log(message: string): void;
}

class Service {
  public readonly logger: Logger;

  public constructor(logger: Logger) {
    this.logger = logger;
  }
}

const loggerToken = createContainerToken<Logger>('logger');
const serviceToken = createContainerToken<Service>('service');
const container = createContainer();

container.registerValue(loggerToken, {
  log(message) {
    message.toUpperCase();
  },
});

container.register(serviceToken, classProvider(Service, [loggerToken]));
container.resolve(serviceToken).logger.log('ready');

const numberProvider: ContainerProvider<number> = factoryProvider(() => 1);
container.register(createContainerToken<number>('number'), numberProvider);
container.register(createContainerToken<string>('async-string'), asyncFactoryProvider(async () => 'ready'));
