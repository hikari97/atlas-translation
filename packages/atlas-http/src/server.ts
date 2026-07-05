import type { HttpAttributes, HttpLifecycleRecord } from './shared';

export interface HttpServerConfiguration {
  readonly host: string;
  readonly port: number;
  readonly protocol: string;
  readonly environment: string;
}

export interface HttpServerMetadata {
  readonly id: string;
  readonly attributes: HttpAttributes;
}

export type HttpServerLifecycleState = 'initialized' | 'running' | 'stopping' | 'stopped';

export interface HttpServerLifecycle extends HttpLifecycleRecord<HttpServerLifecycleState> {}

export interface HttpServerProvider {
  readonly id: string;
  readonly name: string;
  start(): Promise<void>;
  stop(): Promise<void>;
}

export interface HttpServer {
  readonly configuration: HttpServerConfiguration;
  readonly lifecycle: HttpServerLifecycle;
  readonly metadata: HttpServerMetadata;
  readonly provider: HttpServerProvider;
}

export const createHttpServer = (
  configuration: HttpServerConfiguration,
  provider: HttpServerProvider,
  id: string,
  attributes: HttpAttributes = {},
  now: Date = new Date(),
): HttpServer => ({
  configuration,
  provider,
  metadata: { id, attributes },
  lifecycle: {
    state: 'initialized',
    transitions: ['initialized'],
    createdAt: now,
    updatedAt: now,
  },
});
