import type { AtlasContainer } from './container';

export interface ContainerModule {
  readonly id: string;
  register(container: AtlasContainer): void;
}

export const createContainerModule = (id: string, register: (container: AtlasContainer) => void): ContainerModule => ({
  id,
  register,
});

export const applyContainerModules = (container: AtlasContainer, modules: readonly ContainerModule[]): AtlasContainer => {
  modules.forEach((module) => module.register(container));
  return container;
};
