import type { ControllerLifecycle } from './lifecycle';
import type { ControllerMetadata } from './metadata';
import type { ControllerMutableRegistry } from './shared';
import { InMemoryControllerRegistry } from './shared';

export interface ControllerProviderCapabilities {
  readonly registration: boolean;
  readonly resolution: boolean;
  readonly execution: boolean;
}

export interface ControllerProviderMetadata extends ControllerMetadata {}

export interface ControllerProviderLifecycle extends ControllerLifecycle {}

export interface ControllerProviderHealth {
  readonly healthy: boolean;
  readonly checkedAt: Date;
  readonly message: string | undefined;
}

export interface ControllerProvider {
  readonly metadata: ControllerProviderMetadata;
  readonly lifecycle: ControllerProviderLifecycle;
  readonly capabilities: ControllerProviderCapabilities;
  initialize(): Promise<void>;
  shutdown(): Promise<void>;
  healthCheck(): Promise<ControllerProviderHealth>;
}

export interface ControllerProviderRegistry extends ControllerMutableRegistry<ControllerProvider> {}

export const createControllerProviderRegistry = (): ControllerProviderRegistry =>
  new InMemoryControllerRegistry<ControllerProvider>();

export const createControllerProvider = (
  metadata: ControllerProviderMetadata,
  lifecycle: ControllerProviderLifecycle,
  capabilities: ControllerProviderCapabilities,
): ControllerProvider => ({
  metadata,
  lifecycle,
  capabilities,
  async initialize(): Promise<void> {
    lifecycle.transition('registered');
  },
  async shutdown(): Promise<void> {
    lifecycle.transition('disposed');
  },
  async healthCheck(): Promise<ControllerProviderHealth> {
    return { healthy: true, checkedAt: new Date(), message: undefined };
  },
});
