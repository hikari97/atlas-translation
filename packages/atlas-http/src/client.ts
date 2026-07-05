import type { HttpAttributes, HttpLifecycleRecord } from './shared';
import type { HttpHeader } from './headers';

export interface HttpClientConfiguration {
  readonly baseUrl: string | undefined;
  readonly timeoutMs: number | undefined;
  readonly defaultHeaders: readonly HttpHeader[];
}

export interface HttpClientMetadata {
  readonly id: string;
  readonly attributes: HttpAttributes;
}

export type HttpClientLifecycleState = 'initialized' | 'ready' | 'busy' | 'closed';

export interface HttpClientLifecycle extends HttpLifecycleRecord<HttpClientLifecycleState> {}

export interface HttpClientProvider<TRequest = unknown, TResponse = unknown> {
  readonly id: string;
  readonly name: string;
  send(request: TRequest): Promise<TResponse>;
  cancel(id: string): Promise<void>;
  close(): Promise<void>;
}

export interface HttpClient<TRequest = unknown, TResponse = unknown> {
  readonly configuration: HttpClientConfiguration;
  readonly lifecycle: HttpClientLifecycle;
  readonly metadata: HttpClientMetadata;
  readonly provider: HttpClientProvider<TRequest, TResponse>;
}

export const createHttpClient = <TRequest = unknown, TResponse = unknown>(
  configuration: HttpClientConfiguration,
  provider: HttpClientProvider<TRequest, TResponse>,
  id: string,
  attributes: HttpAttributes = {},
  now: Date = new Date(),
): HttpClient<TRequest, TResponse> => ({
  configuration,
  provider,
  metadata: { id, attributes },
  lifecycle: {
    state: 'ready',
    transitions: ['initialized', 'ready'],
    createdAt: now,
    updatedAt: now,
  },
});
