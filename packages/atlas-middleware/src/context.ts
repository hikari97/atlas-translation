import type { RequestContext } from '@atlas/atlas-request';
import type { ResponseContext } from '@atlas/atlas-response';
import type { MiddlewareLifecycle } from './lifecycle';
import type { MiddlewareMetadata } from './metadata';
import type { MiddlewareMutableRegistry, MiddlewareRegistryEntry } from './shared';
import { InMemoryMiddlewareRegistry } from './shared';

export interface MiddlewareContextState {
  readonly requestId: string | undefined;
  readonly responseId: string | undefined;
  readonly middlewareId: string | undefined;
  readonly attributes: readonly MiddlewareRegistryEntry<unknown>[];
}

export interface MiddlewareContextMetadata extends MiddlewareMetadata {}

export interface MiddlewareContextStorage extends MiddlewareMutableRegistry<unknown> {}

export interface MiddlewareContextServices {
  readonly storage: MiddlewareContextStorage;
  get<TValue = unknown>(key: string): TValue | undefined;
  set<TValue>(key: string, name: string, value: TValue): void;
}

export interface MiddlewareContext {
  readonly request: RequestContext | undefined;
  readonly response: ResponseContext | undefined;
  readonly metadata: MiddlewareContextMetadata;
  readonly lifecycle: MiddlewareLifecycle;
  readonly state: MiddlewareContextState;
  readonly services: MiddlewareContextServices;
}

export const createMiddlewareContextServices = (
  storage: MiddlewareContextStorage = new InMemoryMiddlewareRegistry<unknown>(),
): MiddlewareContextServices => ({
  storage,
  get: <TValue = unknown>(key: string): TValue | undefined => storage.get(key)?.value as TValue | undefined,
  set: <TValue>(key: string, name: string, value: TValue): void => {
    storage.register({ id: key, name, value, attributes: {} });
  },
});

export const createMiddlewareContext = (
  request: RequestContext | undefined,
  response: ResponseContext | undefined,
  metadata: MiddlewareContextMetadata,
  lifecycle: MiddlewareLifecycle,
  state: MiddlewareContextState,
  services: MiddlewareContextServices = createMiddlewareContextServices(),
): MiddlewareContext => ({
  request,
  response,
  metadata,
  lifecycle,
  state,
  services,
});
