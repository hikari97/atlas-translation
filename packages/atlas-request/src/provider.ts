import type { RequestLifecycle } from './lifecycle';
import type { RequestMetadata } from './metadata';
import type { RequestAttributes, RequestMutableRegistry } from './shared';
import { InMemoryRequestRegistry } from './shared';

export interface RequestProviderCapabilities {
  readonly requestAggregation: boolean;
  readonly bodyAccess: boolean;
  readonly cookieAccess: boolean;
  readonly fileAccess: boolean;
  readonly sessionAccess: boolean;
}

export interface RequestProviderMetadata extends RequestMetadata {
  readonly id: string;
  readonly name: string;
  readonly version: string;
  readonly attributes: RequestAttributes;
}

export interface RequestProviderLifecycle extends RequestLifecycle {}

export interface RequestProviderHealth {
  readonly healthy: boolean;
  readonly checkedAt: Date;
  readonly message: string | undefined;
}

export interface RequestProvider {
  readonly metadata: RequestProviderMetadata;
  readonly lifecycle: RequestProviderLifecycle;
  readonly capabilities: RequestProviderCapabilities;
  initialize(): Promise<void>;
  shutdown(): Promise<void>;
  healthCheck(): Promise<RequestProviderHealth>;
}

export interface RequestProviderRegistry extends RequestMutableRegistry<RequestProvider> {}

export const createRequestProviderRegistry = (): RequestProviderRegistry =>
  new InMemoryRequestRegistry<RequestProvider>();

export const createRequestProviderMetadata = (
  metadata: RequestMetadata,
  id: string,
  name: string,
  version: string,
  attributes: RequestAttributes = {},
): RequestProviderMetadata => Object.assign(metadata, {
  id,
  name,
  version,
  attributes,
});

export const createRequestProvider = (
  metadata: RequestProviderMetadata,
  lifecycle: RequestProviderLifecycle,
  capabilities: RequestProviderCapabilities,
): RequestProvider => ({
  metadata,
  lifecycle,
  capabilities,
  async initialize(): Promise<void> {},
  async shutdown(): Promise<void> {},
  async healthCheck(): Promise<RequestProviderHealth> {
    return {
      healthy: true,
      checkedAt: new Date(),
      message: undefined,
    };
  },
});
