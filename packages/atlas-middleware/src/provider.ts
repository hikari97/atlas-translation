import type { MiddlewareLifecycle } from './lifecycle';
import type { MiddlewareMetadata } from './metadata';
import type { MiddlewareMutableRegistry } from './shared';
import { InMemoryMiddlewareRegistry } from './shared';

export interface MiddlewareProviderCapabilities {
  readonly registration: boolean;
  readonly resolution: boolean;
  readonly execution: boolean;
}

export interface MiddlewareProviderMetadata extends MiddlewareMetadata {}

export interface MiddlewareProviderLifecycle extends MiddlewareLifecycle {}

export interface MiddlewareProviderHealth {
  readonly healthy: boolean;
  readonly checkedAt: Date;
  readonly message: string | undefined;
}

export interface MiddlewareProvider {
  readonly metadata: MiddlewareProviderMetadata;
  readonly lifecycle: MiddlewareProviderLifecycle;
  readonly capabilities: MiddlewareProviderCapabilities;
  initialize(): Promise<void>;
  shutdown(): Promise<void>;
  healthCheck(): Promise<MiddlewareProviderHealth>;
}

export interface MiddlewareProviderRegistry extends MiddlewareMutableRegistry<MiddlewareProvider> {}

export const createMiddlewareProviderRegistry = (): MiddlewareProviderRegistry =>
  new InMemoryMiddlewareRegistry<MiddlewareProvider>();

export const createMiddlewareProvider = (
  metadata: MiddlewareProviderMetadata,
  lifecycle: MiddlewareProviderLifecycle,
  capabilities: MiddlewareProviderCapabilities,
): MiddlewareProvider => ({
  metadata,
  lifecycle,
  capabilities,
  async initialize(): Promise<void> {
    lifecycle.transition('ready');
  },
  async shutdown(): Promise<void> {
    lifecycle.transition('disposed');
  },
  async healthCheck(): Promise<MiddlewareProviderHealth> {
    return {
      healthy: true,
      checkedAt: new Date(),
      message: undefined,
    };
  },
});
