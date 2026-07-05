import type { AtlasContainer } from './container';
import type { ContainerRegisterOptions, ContainerToken } from './types';

export interface PluginContainerFacade {
  readonly pluginId: string;
  register<TService>(token: ContainerToken<TService>, value: TService, options?: ContainerRegisterOptions): void;
  resolve<TService>(token: ContainerToken<TService>): TService;
  resolveAsync<TService>(token: ContainerToken<TService>): Promise<TService>;
}

export const createPluginContainer = (root: AtlasContainer, pluginId: string): PluginContainerFacade => {
  const scope = root.createScope(`plugin:${pluginId}`);
  return {
    pluginId,
    register(token, value, options = {}) {
      scope.registerValue(token, value, { ...options, source: `plugin:${pluginId}` });
    },
    resolve(token) {
      return scope.resolve(token);
    },
    resolveAsync(token) {
      return scope.resolveAsync(token);
    },
  };
};
