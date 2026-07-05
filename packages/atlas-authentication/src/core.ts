import type { AuthenticationContext } from './context';
import type { AuthenticationLifecycle } from './lifecycle';
import type { AuthenticationMetadata } from './metadata';
import type { AuthenticationMutableRegistry } from './shared';
import { InMemoryAuthenticationRegistry } from './shared';

export interface AuthenticationServices extends AuthenticationMutableRegistry<unknown> {}

export interface AuthenticationCore {
  readonly context: AuthenticationContext;
  readonly lifecycle: AuthenticationLifecycle;
  readonly metadata: AuthenticationMetadata;
  readonly services: AuthenticationServices;
}

export const createAuthenticationCore = (
  context: AuthenticationContext,
  lifecycle: AuthenticationLifecycle,
  metadata: AuthenticationMetadata,
  services: AuthenticationServices = new InMemoryAuthenticationRegistry<unknown>(),
): AuthenticationCore => ({ context, lifecycle, metadata, services });
