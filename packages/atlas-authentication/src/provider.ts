import type { AuthenticationLifecycle } from './lifecycle';
import type { AuthenticationMetadata } from './metadata';
import type { AuthenticationEngine } from './engine';
import type { AuthenticationRegistry } from './registry';
import type { AuthenticationResolver } from './resolver';
import type { AuthenticationMutableRegistry } from './shared';
import { InMemoryAuthenticationRegistry } from './shared';

export interface AuthenticationProviderCapabilities {
  readonly registration: boolean;
  readonly resolution: boolean;
  readonly execution: boolean;
}

export interface AuthenticationProviderMetadata extends AuthenticationMetadata {}

export interface AuthenticationProviderLifecycle extends AuthenticationLifecycle {}

export interface AuthenticationProviderHealth {
  readonly healthy: boolean;
  readonly checkedAt: Date;
  readonly message: string | undefined;
}

export interface AuthenticationProvider {
  readonly metadata: AuthenticationProviderMetadata;
  readonly lifecycle: AuthenticationProviderLifecycle;
  readonly capabilities: AuthenticationProviderCapabilities;
  readonly registry: AuthenticationRegistry;
  readonly resolver: AuthenticationResolver;
  readonly engine: AuthenticationEngine;
  createEngine(): AuthenticationEngine;
  initialize(): Promise<void>;
  shutdown(): Promise<void>;
  healthCheck(): Promise<AuthenticationProviderHealth>;
}

export interface AuthenticationProviderRegistry extends AuthenticationMutableRegistry<AuthenticationProvider> {}

export const createAuthenticationProviderRegistry = (): AuthenticationProviderRegistry =>
  new InMemoryAuthenticationRegistry<AuthenticationProvider>();

export const createAuthenticationProvider = (
  metadata: AuthenticationProviderMetadata,
  lifecycle: AuthenticationProviderLifecycle,
  capabilities: AuthenticationProviderCapabilities,
  registry: AuthenticationRegistry,
  resolver: AuthenticationResolver,
  engine: AuthenticationEngine,
): AuthenticationProvider => ({
  metadata,
  lifecycle,
  capabilities,
  registry,
  resolver,
  engine,
  createEngine(): AuthenticationEngine {
    return engine;
  },
  async initialize(): Promise<void> {
    lifecycle.transition('registered');
  },
  async shutdown(): Promise<void> {
    lifecycle.transition('disposed');
  },
  async healthCheck(): Promise<AuthenticationProviderHealth> {
    return { healthy: true, checkedAt: new Date(), message: undefined };
  },
});
