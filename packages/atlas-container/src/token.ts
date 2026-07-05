import type { ContainerToken } from './types';

export interface ContainerTokenOptions {
  readonly description?: string;
}

export const createContainerToken = <TService>(
  name: string,
  options: ContainerTokenOptions = {},
): ContainerToken<TService> => ({
  id: Symbol(name),
  name,
  description: options.description,
});

export const tokenLabel = (token: ContainerToken<unknown>): string => token.name;

export const tokensEqual = (left: ContainerToken<unknown>, right: ContainerToken<unknown>): boolean => left.id === right.id;
