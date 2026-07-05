import type { HttpAttributes } from './shared';
import type { HttpLifecycleRecord } from './shared';

export type HttpProtocolVersion = 'HTTP/1.0' | 'HTTP/1.1' | 'HTTP/2' | 'HTTP/3' | string;

export interface HttpProtocolCapabilities {
  readonly persistentConnections: boolean;
  readonly multiplexing: boolean;
  readonly headerCompression: boolean;
  readonly serverPush: boolean;
  readonly streamPriority: boolean;
}

export interface HttpProtocolMetadata {
  readonly attributes: HttpAttributes;
}

export interface HttpProtocolLifecycle extends HttpLifecycleRecord<'created' | 'active' | 'deprecated'> {}

export interface HttpProtocol {
  readonly version: HttpProtocolVersion;
  readonly capabilities: HttpProtocolCapabilities;
  readonly metadata: HttpProtocolMetadata;
  readonly lifecycle: HttpProtocolLifecycle;
}

export interface HttpProtocolRegistry {
  register(protocol: HttpProtocol): void;
  lookup(version: HttpProtocolVersion): HttpProtocol | undefined;
  entries(): readonly HttpProtocol[];
}

export class DefaultHttpProtocolRegistry implements HttpProtocolRegistry {
  private readonly protocols = new Map<HttpProtocolVersion, HttpProtocol>();

  public constructor(protocols: readonly HttpProtocol[] = STANDARD_HTTP_PROTOCOLS) {
    protocols.forEach((protocol) => this.register(protocol));
  }

  public register(protocol: HttpProtocol): void {
    this.protocols.set(protocol.version, protocol);
  }

  public lookup(version: HttpProtocolVersion): HttpProtocol | undefined {
    return this.protocols.get(version);
  }

  public entries(): readonly HttpProtocol[] {
    return Array.from(this.protocols.values());
  }
}

export const createHttpProtocol = (
  version: HttpProtocolVersion,
  capabilities: HttpProtocolCapabilities,
  attributes: HttpAttributes = {},
  now: Date = new Date(),
): HttpProtocol => ({
  version,
  capabilities,
  metadata: { attributes },
  lifecycle: {
    state: 'active',
    transitions: ['created', 'active'],
    createdAt: now,
    updatedAt: now,
  },
});

export const STANDARD_HTTP_PROTOCOLS: readonly HttpProtocol[] = [
  createHttpProtocol('HTTP/1.0', {
    persistentConnections: false,
    multiplexing: false,
    headerCompression: false,
    serverPush: false,
    streamPriority: false,
  }),
  createHttpProtocol('HTTP/1.1', {
    persistentConnections: true,
    multiplexing: false,
    headerCompression: false,
    serverPush: false,
    streamPriority: false,
  }),
  createHttpProtocol('HTTP/2', {
    persistentConnections: true,
    multiplexing: true,
    headerCompression: true,
    serverPush: true,
    streamPriority: true,
  }),
  createHttpProtocol('HTTP/3', {
    persistentConnections: true,
    multiplexing: true,
    headerCompression: true,
    serverPush: false,
    streamPriority: true,
  }),
];
