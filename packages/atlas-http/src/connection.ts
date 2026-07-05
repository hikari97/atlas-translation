import type { HttpAttributes, HttpLifecycleRecord } from './shared';

export type HttpConnectionState = 'open' | 'active' | 'idle' | 'closing' | 'closed';

export interface HttpConnectionCapabilities {
  readonly persistent: boolean;
  readonly keepAlive: boolean;
  readonly multiplexing: boolean;
  readonly streams: boolean;
}

export interface HttpConnectionMetadata {
  readonly id: string;
  readonly attributes: HttpAttributes;
}

export interface HttpConnectionLifecycle extends HttpLifecycleRecord<HttpConnectionState> {}

export interface HttpConnection {
  readonly state: HttpConnectionState;
  readonly lifecycle: HttpConnectionLifecycle;
  readonly metadata: HttpConnectionMetadata;
  readonly capabilities: HttpConnectionCapabilities;
}

export const createHttpConnection = (
  id: string,
  capabilities: HttpConnectionCapabilities,
  state: HttpConnectionState = 'open',
  attributes: HttpAttributes = {},
  now: Date = new Date(),
): HttpConnection => ({
  state,
  capabilities,
  metadata: { id, attributes },
  lifecycle: {
    state,
    transitions: [state],
    createdAt: now,
    updatedAt: now,
  },
});
