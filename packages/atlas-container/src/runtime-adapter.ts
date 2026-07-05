import { type AtlasContainer, createContainer } from './container';
import { applyContainerModules, type ContainerModule } from './module';

export interface RuntimeContainerBootstrap {
  readonly container?: AtlasContainer;
  readonly modules?: readonly ContainerModule[];
}

export const createRuntimeContainer = (bootstrap: RuntimeContainerBootstrap = {}): AtlasContainer => {
  const container = bootstrap.container ?? createContainer();
  return applyContainerModules(container, bootstrap.modules ?? []);
};
