import type { HttpAttributes, HttpLifecycleRecord, HttpMutableRegistry } from './shared';
import { InMemoryHttpRegistry } from './shared';

export interface HttpProviderCapabilities {
  readonly server: boolean;
  readonly client: boolean;
  readonly streaming: boolean;
  readonly multiplexing: boolean;
  readonly edgeRuntime: boolean;
}

export interface HttpProviderMetadata {
  readonly id: string;
  readonly name: string;
  readonly version: string;
  readonly attributes: HttpAttributes;
}

export type HttpProviderLifecycleState = 'created' | 'initialized' | 'healthy' | 'shutting-down' | 'stopped';

export interface HttpProviderLifecycle extends HttpLifecycleRecord<HttpProviderLifecycleState> {}

export interface HttpProvider {
  readonly metadata: HttpProviderMetadata;
  readonly lifecycle: HttpProviderLifecycle;
  readonly capabilities: HttpProviderCapabilities;
  initialize(): Promise<void>;
  shutdown(): Promise<void>;
  healthCheck(): Promise<HttpProviderHealth>;
}

export interface HttpProviderHealth {
  readonly healthy: boolean;
  readonly checkedAt: Date;
  readonly message: string | undefined;
}

export interface HttpProviderRegistry extends HttpMutableRegistry<HttpProvider> {}

export const createHttpProvider = (
  metadata: HttpProviderMetadata,
  capabilities: HttpProviderCapabilities,
  now: Date = new Date(),
): HttpProvider => ({
  metadata,
  capabilities,
  lifecycle: {
    state: 'created',
    transitions: ['created'],
    createdAt: now,
    updatedAt: now,
  },
  async initialize(): Promise<void> {},
  async shutdown(): Promise<void> {},
  async healthCheck(): Promise<HttpProviderHealth> {
    return {
      healthy: true,
      checkedAt: new Date(),
      message: undefined,
    };
  },
});

export const createHttpProviderRegistry = (): HttpProviderRegistry =>
  new InMemoryHttpRegistry<HttpProvider>();
