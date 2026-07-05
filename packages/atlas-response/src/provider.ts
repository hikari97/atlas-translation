import type { HttpResponse } from './http-response';
import type { ResponseLifecycle } from './lifecycle';
import type { ResponseMetadata } from './metadata';
import type { ResponseAttributes, ResponseMutableRegistry } from './shared';
import { InMemoryResponseRegistry } from './shared';

export interface ResponseProviderCapabilities {
  readonly responseDelivery: boolean;
  readonly headerDelivery: boolean;
  readonly cookieDelivery: boolean;
  readonly attachmentDelivery: boolean;
}

export interface ResponseProviderMetadata extends ResponseMetadata {
  readonly id: string;
  readonly name: string;
  readonly version: string;
  readonly attributes: ResponseAttributes;
}

export interface ResponseProviderLifecycle extends ResponseLifecycle {}

export interface ResponseProviderHealth {
  readonly healthy: boolean;
  readonly checkedAt: Date;
  readonly message: string | undefined;
}

export interface ResponseProvider {
  readonly metadata: ResponseProviderMetadata;
  readonly lifecycle: ResponseProviderLifecycle;
  readonly capabilities: ResponseProviderCapabilities;
  initialize(): Promise<void>;
  shutdown(): Promise<void>;
  healthCheck(): Promise<ResponseProviderHealth>;
  send(response: HttpResponse): Promise<void>;
}

export interface ResponseProviderRegistry extends ResponseMutableRegistry<ResponseProvider> {}

export const createResponseProviderRegistry = (): ResponseProviderRegistry =>
  new InMemoryResponseRegistry<ResponseProvider>();

export const createResponseProviderMetadata = (
  metadata: ResponseMetadata,
  id: string,
  name: string,
  version: string,
  attributes: ResponseAttributes = {},
): ResponseProviderMetadata => Object.assign(metadata, {
  id,
  name,
  version,
  attributes,
});

export const createResponseProvider = (
  metadata: ResponseProviderMetadata,
  lifecycle: ResponseProviderLifecycle,
  capabilities: ResponseProviderCapabilities,
  send: (response: HttpResponse) => Promise<void> = async () => {},
): ResponseProvider => ({
  metadata,
  lifecycle,
  capabilities,
  async initialize(): Promise<void> {},
  async shutdown(): Promise<void> {},
  async healthCheck(): Promise<ResponseProviderHealth> {
    return {
      healthy: true,
      checkedAt: new Date(),
      message: undefined,
    };
  },
  send,
});
