import type { ValidationLifecycle } from './lifecycle';
import type { ValidationMetadata } from './metadata';
import type { ValidationMutableRegistry } from './shared';
import { InMemoryValidationRegistry } from './shared';

export interface ValidationProviderCapabilities {
  readonly registration: boolean;
  readonly resolution: boolean;
  readonly execution: boolean;
}

export interface ValidationProviderMetadata extends ValidationMetadata {}

export interface ValidationProviderLifecycle extends ValidationLifecycle {}

export interface ValidationProviderHealth {
  readonly healthy: boolean;
  readonly checkedAt: Date;
  readonly message: string | undefined;
}

export interface ValidationProvider {
  readonly metadata: ValidationProviderMetadata;
  readonly lifecycle: ValidationProviderLifecycle;
  readonly capabilities: ValidationProviderCapabilities;
  initialize(): Promise<void>;
  shutdown(): Promise<void>;
  healthCheck(): Promise<ValidationProviderHealth>;
}

export interface ValidationProviderRegistry extends ValidationMutableRegistry<ValidationProvider> {}

export const createValidationProviderRegistry = (): ValidationProviderRegistry =>
  new InMemoryValidationRegistry<ValidationProvider>();

export const createValidationProvider = (
  metadata: ValidationProviderMetadata,
  lifecycle: ValidationProviderLifecycle,
  capabilities: ValidationProviderCapabilities,
): ValidationProvider => ({
  metadata,
  lifecycle,
  capabilities,
  async initialize(): Promise<void> {
    lifecycle.transition('registered');
  },
  async shutdown(): Promise<void> {
    lifecycle.transition('disposed');
  },
  async healthCheck(): Promise<ValidationProviderHealth> {
    return { healthy: true, checkedAt: new Date(), message: undefined };
  },
});
