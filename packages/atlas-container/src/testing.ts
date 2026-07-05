import { type AtlasContainer, createContainer } from './container';
import type { ContainerRegisterOptions, ContainerToken } from './types';

export const createTestContainer = (): AtlasContainer => createContainer();

export const overrideService = <TService>(
  container: AtlasContainer,
  token: ContainerToken<TService>,
  value: TService,
  options: ContainerRegisterOptions = {},
): AtlasContainer => container.registerValue(token, value, { ...options, override: true, source: options.source ?? 'test' });
