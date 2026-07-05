import type { MiddlewareContext } from '@atlas/atlas-middleware';
import type { RequestContext } from '@atlas/atlas-request';
import type { ResponseContext } from '@atlas/atlas-response';
import type { ControllerLifecycle } from './lifecycle';
import type { ControllerMetadata } from './metadata';
import type { ControllerMutableRegistry, ControllerRegistryEntry } from './shared';
import { InMemoryControllerRegistry } from './shared';

export interface ControllerContextState {
  readonly requestId: string | undefined;
  readonly responseId: string | undefined;
  readonly controllerId: string | undefined;
  readonly attributes: readonly ControllerRegistryEntry<unknown>[];
}

export interface ControllerContextMetadata extends ControllerMetadata {}

export interface ControllerContextStorage extends ControllerMutableRegistry<unknown> {}

export interface ControllerContextServices {
  readonly storage: ControllerContextStorage;
  get<TValue = unknown>(key: string): TValue | undefined;
  set<TValue>(key: string, name: string, value: TValue): void;
}

export interface ControllerContext {
  readonly request: RequestContext | undefined;
  readonly response: ResponseContext | undefined;
  readonly middleware: MiddlewareContext | undefined;
  readonly metadata: ControllerContextMetadata;
  readonly lifecycle: ControllerLifecycle;
  readonly state: ControllerContextState;
  readonly services: ControllerContextServices;
}

export const createControllerContextServices = (
  storage: ControllerContextStorage = new InMemoryControllerRegistry<unknown>(),
): ControllerContextServices => ({
  storage,
  get: <TValue = unknown>(key: string): TValue | undefined => storage.get(key)?.value as TValue | undefined,
  set: <TValue>(key: string, name: string, value: TValue): void => {
    storage.register({ id: key, name, value, attributes: {} });
  },
});

export const createControllerContext = (
  request: RequestContext | undefined,
  response: ResponseContext | undefined,
  middleware: MiddlewareContext | undefined,
  metadata: ControllerContextMetadata,
  lifecycle: ControllerLifecycle,
  state: ControllerContextState,
  services: ControllerContextServices = createControllerContextServices(),
): ControllerContext => ({ request, response, middleware, metadata, lifecycle, state, services });
