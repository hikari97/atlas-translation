import type { ControllerContext } from '@atlas/atlas-controller';
import type { RequestContext } from '@atlas/atlas-request';
import type { AuthenticationCredential } from './credential';
import type { AuthenticationLifecycle } from './lifecycle';
import type { AuthenticationMetadata } from './metadata';
import type { AuthenticationMutableRegistry, AuthenticationRegistryEntry } from './shared';
import { InMemoryAuthenticationRegistry } from './shared';

export interface AuthenticationContextState {
  readonly authenticationId: string | undefined;
  readonly scheme: string | undefined;
  readonly attributes: readonly AuthenticationRegistryEntry<unknown>[];
}

export interface AuthenticationContextMetadata extends AuthenticationMetadata {}

export interface AuthenticationContextStorage extends AuthenticationMutableRegistry<unknown> {}

export interface AuthenticationContextServices {
  readonly storage: AuthenticationContextStorage;
  get<TValue = unknown>(key: string): TValue | undefined;
  set<TValue>(key: string, name: string, value: TValue): void;
}

export interface AuthenticationContext {
  readonly credential: AuthenticationCredential;
  readonly request: RequestContext | undefined;
  readonly controller: ControllerContext | undefined;
  readonly metadata: AuthenticationContextMetadata;
  readonly lifecycle: AuthenticationLifecycle;
  readonly state: AuthenticationContextState;
  readonly services: AuthenticationContextServices;
}

export const createAuthenticationContextServices = (
  storage: AuthenticationContextStorage = new InMemoryAuthenticationRegistry<unknown>(),
): AuthenticationContextServices => ({
  storage,
  get: <TValue = unknown>(key: string): TValue | undefined => storage.get(key)?.value as TValue | undefined,
  set: <TValue>(key: string, name: string, value: TValue): void => {
    storage.register({ id: key, name, value, attributes: {} });
  },
});

export const createAuthenticationContext = (
  credential: AuthenticationCredential,
  request: RequestContext | undefined,
  controller: ControllerContext | undefined,
  metadata: AuthenticationContextMetadata,
  lifecycle: AuthenticationLifecycle,
  state: AuthenticationContextState,
  services: AuthenticationContextServices = createAuthenticationContextServices(),
): AuthenticationContext => ({ credential, request, controller, metadata, lifecycle, state, services });
