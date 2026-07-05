import type { AuthenticationContract } from './interface';
import type { AuthenticationLifecycle } from './lifecycle';
import type { AuthenticationMetadata } from './metadata';
import type { AuthenticationDescriptor } from './registry';

export interface AuthenticationFactoryCapabilities {
  readonly lazyCreation: boolean;
  readonly strategyCreation: boolean;
}

export interface AuthenticationFactoryMetadata extends AuthenticationMetadata {}

export interface AuthenticationFactoryLifecycle extends AuthenticationLifecycle {}

export interface AuthenticationFactory {
  readonly metadata: AuthenticationFactoryMetadata;
  readonly lifecycle: AuthenticationFactoryLifecycle;
  readonly capabilities: AuthenticationFactoryCapabilities;
  supports(descriptor: AuthenticationDescriptor): boolean;
  create(descriptor?: AuthenticationDescriptor): AuthenticationContract | undefined;
}

export const createAuthenticationFactory = (
  metadata: AuthenticationFactoryMetadata,
  lifecycle: AuthenticationFactoryLifecycle,
  capabilities: AuthenticationFactoryCapabilities,
  create: (descriptor?: AuthenticationDescriptor) => AuthenticationContract | undefined,
  supports: (descriptor: AuthenticationDescriptor) => boolean = () => true,
): AuthenticationFactory => ({ metadata, lifecycle, capabilities, supports, create });
