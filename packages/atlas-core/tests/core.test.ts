import {
  ApplicationBuilder,
  DefaultServiceRegistry,
  DependencyResolver,
  Environment,
  ResourceManager,
  ServiceLifetime
} from '@atlas/atlas-core';
import type { Module, ServiceToken } from '@atlas/atlas-core';
import type { ID, Timestamp } from '@atlas/atlas-types';

const token = 'logger' as ServiceToken<{ readonly name: string }>;
const registry = new DefaultServiceRegistry();
registry.register({
  token,
  lifetime: ServiceLifetime.Singleton,
  factory: () => ({ name: 'logger' })
});

const module: Module = {
  name: 'test',
  registerServices: () => undefined,
  start: async () => undefined,
  stop: async () => undefined
};

const app = new ApplicationBuilder()
  .addModule(module)
  .build('Atlas', 'runtime-1' as ID<'runtime-context'>, '2026-07-03T00:00:00.000Z' as Timestamp);

const resources = new ResourceManager();
resources.add({ dispose: () => undefined });

export const coreTest = {
  service: new DependencyResolver(registry).resolve(token),
  environment: Environment.Test,
  app,
  resources
};
