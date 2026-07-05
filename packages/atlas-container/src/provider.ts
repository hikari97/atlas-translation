import type {
  ContainerAsyncFactoryProvider,
  ContainerClassProvider,
  ContainerDependencyList,
  ContainerFactoryProvider,
  ContainerProvider,
  ContainerValueProvider,
} from './types';

export const valueProvider = <TService>(value: TService): ContainerValueProvider<TService> => ({
  kind: 'value',
  value,
});

export const classProvider = <TService>(
  useClass: new (...dependencies: never[]) => TService,
  dependencies: ContainerDependencyList = [],
): ContainerClassProvider<TService> => ({
  kind: 'class',
  useClass: useClass as new (...dependencies: readonly unknown[]) => TService,
  dependencies,
});

export const factoryProvider = <TService>(
  factory: (...dependencies: readonly unknown[]) => TService,
  dependencies: ContainerDependencyList = [],
): ContainerFactoryProvider<TService> => ({
  kind: 'factory',
  factory,
  dependencies,
});

export const asyncFactoryProvider = <TService>(
  factory: (...dependencies: readonly unknown[]) => Promise<TService>,
  dependencies: ContainerDependencyList = [],
): ContainerAsyncFactoryProvider<TService> => ({
  kind: 'asyncFactory',
  factory,
  dependencies,
});

export const providerDependencies = (provider: ContainerProvider<unknown>): ContainerDependencyList => {
  if (provider.kind === 'value') {
    return [];
  }
  return provider.dependencies;
};
