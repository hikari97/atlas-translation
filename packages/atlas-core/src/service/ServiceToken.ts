import type { Brand } from '@atlas/atlas-types';

export type ServiceToken<TService = unknown> = Brand<string, `ServiceToken:${string}`> & {
  readonly __service?: TService;
};
