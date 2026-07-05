import type { WebSocketExtensions, WebSocketLifecycle, WebSocketMetadata } from './common';
import { createWebSocketLifecycle, createWebSocketMetadata } from './common';

export interface WebSocketCoreConfiguration {
  readonly namespace: string;
  readonly capabilities: readonly string[];
}

export interface WebSocketCoreMetadata extends WebSocketMetadata {}
export interface WebSocketCoreLifecycle extends WebSocketLifecycle {}
export interface WebSocketCoreExtension {
  readonly name: string;
  readonly value: WebSocketExtensions[string];
}

export interface WebSocketCore {
  readonly configuration: WebSocketCoreConfiguration;
  readonly metadata: WebSocketCoreMetadata;
  readonly lifecycle: WebSocketCoreLifecycle;
  readonly extensions: readonly WebSocketCoreExtension[];
}

export type WebSocketConnectionState = 'connecting' | 'open' | 'closing' | 'closed';
export type WebSocketConnectionCapability = 'send' | 'receive' | 'broadcast' | 'heartbeat' | 'binary';
export interface WebSocketConnectionMetadata extends WebSocketMetadata {}
export interface WebSocketConnectionLifecycle extends WebSocketLifecycle {}

export interface WebSocketConnection {
  readonly id: string;
  readonly state: WebSocketConnectionState;
  readonly metadata: WebSocketConnectionMetadata;
  readonly lifecycle: WebSocketConnectionLifecycle;
  readonly capabilities: readonly WebSocketConnectionCapability[];
}

export type WebSocketSessionState = 'created' | 'active' | 'suspended' | 'closed';
export type WebSocketSessionAttributes = ReadonlyMap<string, unknown>;
export interface WebSocketSessionMetadata extends WebSocketMetadata {}
export interface WebSocketSessionLifecycle extends WebSocketLifecycle {}

export interface WebSocketSession {
  readonly id: string;
  readonly state: WebSocketSessionState;
  readonly attributes: WebSocketSessionAttributes;
  readonly metadata: WebSocketSessionMetadata;
  readonly lifecycle: WebSocketSessionLifecycle;
}

export type WebSocketEndpointCapability = 'request-response' | 'events' | 'channels' | 'middleware' | 'security';
export interface WebSocketEndpointMetadata extends WebSocketMetadata {}
export interface WebSocketEndpointLifecycle extends WebSocketLifecycle {}
export interface WebSocketEndpointExtension {
  readonly name: string;
  readonly value: WebSocketExtensions[string];
}

export interface WebSocketEndpoint {
  readonly path: string;
  readonly metadata: WebSocketEndpointMetadata;
  readonly lifecycle: WebSocketEndpointLifecycle;
  readonly capabilities: readonly WebSocketEndpointCapability[];
  readonly extensions: readonly WebSocketEndpointExtension[];
}

export type WebSocketMessageIdentifier = string;
export interface WebSocketMessageHeader {
  readonly name: string;
  readonly value: string;
}
export interface WebSocketMessageMetadata extends WebSocketMetadata {}
export interface WebSocketMessageExtension {
  readonly name: string;
  readonly value: WebSocketExtensions[string];
}

export interface WebSocketMessage {
  readonly id: WebSocketMessageIdentifier;
  readonly headers: ReadonlyMap<string, string>;
  readonly payload: unknown;
  readonly metadata: WebSocketMessageMetadata;
  readonly extensions: readonly WebSocketMessageExtension[];
}

export interface WebSocketRequestMetadata extends WebSocketMetadata {}
export interface WebSocketRequestContext {
  readonly correlationId?: string;
  readonly attributes: WebSocketExtensions;
}
export interface WebSocketRequestLifecycle extends WebSocketLifecycle {}
export interface WebSocketRequestExtension {
  readonly name: string;
  readonly value: WebSocketExtensions[string];
}

export interface WebSocketRequest {
  readonly id: string;
  readonly route: string;
  readonly payload: unknown;
  readonly metadata: WebSocketRequestMetadata;
  readonly context: WebSocketRequestContext;
  readonly lifecycle: WebSocketRequestLifecycle;
  readonly extensions: readonly WebSocketRequestExtension[];
}

export type WebSocketResponseStatus = 'ok' | 'accepted' | 'rejected' | 'error' | 'timeout';
export interface WebSocketResponseMetadata extends WebSocketMetadata {}
export interface WebSocketResponseLifecycle extends WebSocketLifecycle {}
export interface WebSocketResponseExtension {
  readonly name: string;
  readonly value: WebSocketExtensions[string];
}

export interface WebSocketResponse {
  readonly id: string;
  readonly correlationId: string;
  readonly status: WebSocketResponseStatus;
  readonly payload: unknown;
  readonly metadata: WebSocketResponseMetadata;
  readonly lifecycle: WebSocketResponseLifecycle;
  readonly extensions: readonly WebSocketResponseExtension[];
}

export type WebSocketEventCategory = 'system' | 'domain' | 'user' | 'integration' | 'custom';
export interface WebSocketEventMetadata extends WebSocketMetadata {}
export interface WebSocketEventLifecycle extends WebSocketLifecycle {}
export interface WebSocketEventExtension {
  readonly name: string;
  readonly value: WebSocketExtensions[string];
}

export interface WebSocketEvent {
  readonly id: string;
  readonly type: string;
  readonly category: WebSocketEventCategory;
  readonly payload: unknown;
  readonly metadata: WebSocketEventMetadata;
  readonly lifecycle: WebSocketEventLifecycle;
  readonly extensions: readonly WebSocketEventExtension[];
}

export type WebSocketChannelScope = 'global' | 'tenant' | 'workspace' | 'document' | 'session' | 'custom';
export interface WebSocketChannelMetadata extends WebSocketMetadata {}
export interface WebSocketChannelLifecycle extends WebSocketLifecycle {}
export interface WebSocketChannelExtension {
  readonly name: string;
  readonly value: WebSocketExtensions[string];
}

export interface WebSocketChannel {
  readonly name: string;
  readonly scope: WebSocketChannelScope;
  readonly metadata: WebSocketChannelMetadata;
  readonly lifecycle: WebSocketChannelLifecycle;
  readonly extensions: readonly WebSocketChannelExtension[];
}

export interface WebSocketSubscriptionFilter {
  readonly field: string;
  readonly operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'exists';
  readonly value?: WebSocketExtensions[string];
}
export interface WebSocketSubscriptionOptions {
  readonly replayLastMessage: boolean;
  readonly durable: boolean;
}
export interface WebSocketSubscriptionMetadata extends WebSocketMetadata {}
export interface WebSocketSubscriptionLifecycle extends WebSocketLifecycle {}

export interface WebSocketSubscription {
  readonly session: WebSocketSession;
  readonly channel: WebSocketChannel;
  readonly filters: readonly WebSocketSubscriptionFilter[];
  readonly options: WebSocketSubscriptionOptions;
  readonly metadata: WebSocketSubscriptionMetadata;
  readonly lifecycle: WebSocketSubscriptionLifecycle;
}

export interface WebSocketMiddlewareContext {
  readonly connection?: WebSocketConnection;
  readonly session?: WebSocketSession;
  readonly request?: WebSocketRequest;
  readonly response?: WebSocketResponse;
  readonly attributes: ReadonlyMap<string, unknown>;
}
export interface WebSocketMiddlewarePipeline {
  next(): Promise<void>;
}
export interface WebSocketMiddlewareLifecycle extends WebSocketLifecycle {}
export interface WebSocketMiddlewareMetadata extends WebSocketMetadata {}

export interface WebSocketMiddleware {
  readonly metadata: WebSocketMiddlewareMetadata;
  readonly lifecycle: WebSocketMiddlewareLifecycle;
  execute(context: WebSocketMiddlewareContext, next: WebSocketMiddlewarePipeline): Promise<void>;
}

export type WebSocketContextAttributes = ReadonlyMap<string, unknown>;
export interface WebSocketContextMetadata extends WebSocketMetadata {}
export interface WebSocketContextLifecycle extends WebSocketLifecycle {}
export interface WebSocketContextExtension {
  readonly name: string;
  readonly value: WebSocketExtensions[string];
}

export interface WebSocketContext {
  readonly connection: WebSocketConnection;
  readonly session: WebSocketSession;
  readonly endpoint: WebSocketEndpoint;
  readonly metadata: WebSocketContextMetadata;
  readonly attributes: WebSocketContextAttributes;
  readonly lifecycle: WebSocketContextLifecycle;
  readonly extensions: readonly WebSocketContextExtension[];
}

export type WebSocketAuthenticationState = 'anonymous' | 'pending' | 'authenticated' | 'failed';
export interface WebSocketAuthenticationContext {
  readonly subjectId?: string;
  readonly claims: WebSocketExtensions;
}
export interface WebSocketAuthenticationMetadata extends WebSocketMetadata {}
export interface WebSocketAuthenticationLifecycle extends WebSocketLifecycle {}

export interface WebSocketAuthentication {
  readonly state: WebSocketAuthenticationState;
  readonly context: WebSocketAuthenticationContext;
  readonly metadata: WebSocketAuthenticationMetadata;
  readonly lifecycle: WebSocketAuthenticationLifecycle;
}

export interface WebSocketAuthorizationPolicy {
  readonly name: string;
  readonly permissions: readonly string[];
}
export interface WebSocketAuthorizationContext {
  readonly subjectId?: string;
  readonly resource?: string;
  readonly action?: string;
}
export interface WebSocketAuthorizationMetadata extends WebSocketMetadata {}
export interface WebSocketAuthorizationLifecycle extends WebSocketLifecycle {}

export interface WebSocketAuthorization {
  readonly policies: readonly WebSocketAuthorizationPolicy[];
  readonly context: WebSocketAuthorizationContext;
  readonly metadata: WebSocketAuthorizationMetadata;
  readonly lifecycle: WebSocketAuthorizationLifecycle;
}

export type WebSocketProtocolCapability = 'json' | 'binary' | 'heartbeat' | 'acknowledgement' | 'multiplexing';
export interface WebSocketProtocolNegotiation {
  readonly requested: readonly string[];
  readonly selected?: string;
}
export interface WebSocketProtocolMetadata extends WebSocketMetadata {}
export interface WebSocketProtocolLifecycle extends WebSocketLifecycle {}

export interface WebSocketProtocol {
  readonly name: string;
  readonly version: string;
  readonly capabilities: readonly WebSocketProtocolCapability[];
  readonly metadata: WebSocketProtocolMetadata;
  readonly negotiation: WebSocketProtocolNegotiation;
  readonly lifecycle: WebSocketProtocolLifecycle;
}

export interface WebSocketBuilderContext {
  readonly attributes: WebSocketExtensions;
}
export interface WebSocketBuilderMetadata extends WebSocketMetadata {}
export interface WebSocketBuilderLifecycle extends WebSocketLifecycle {}
export interface WebSocketBuilderExtension {
  readonly name: string;
  readonly value: WebSocketExtensions[string];
}

export interface WebSocketRuntime {
  readonly endpoints: readonly WebSocketEndpoint[];
  readonly middleware: readonly WebSocketMiddleware[];
  readonly protocols: readonly WebSocketProtocol[];
  readonly metadata: WebSocketBuilderMetadata;
  readonly lifecycle: WebSocketBuilderLifecycle;
  readonly extensions: readonly WebSocketBuilderExtension[];
}

export interface WebSocketRuntimeBuilder {
  endpoint(endpoint: WebSocketEndpoint): this;
  middleware(middleware: WebSocketMiddleware): this;
  protocol(protocol: WebSocketProtocol): this;
  build(): WebSocketRuntime;
}

export type WebSocketTransportCapability = 'connect' | 'disconnect' | 'send' | 'receive' | 'subscribe';
export interface WebSocketTransportAdapterMetadata extends WebSocketMetadata {
  readonly name: string;
}
export interface WebSocketTransportLifecycle extends WebSocketLifecycle {}
export interface WebSocketTransportExtension {
  readonly name: string;
  readonly value: WebSocketExtensions[string];
}

export interface WebSocketTransportAdapter {
  readonly metadata: WebSocketTransportAdapterMetadata;
  readonly capabilities: readonly WebSocketTransportCapability[];
  readonly lifecycle: WebSocketTransportLifecycle;
  readonly extensions: readonly WebSocketTransportExtension[];
  initialize(): Promise<void>;
  shutdown(): Promise<void>;
}

export interface WebSocketRegistryMetadata extends WebSocketMetadata {}
export interface WebSocketRegistryLifecycle extends WebSocketLifecycle {}
export interface WebSocketRegistryExtension {
  readonly name: string;
  readonly value: WebSocketExtensions[string];
}
export interface WebSocketRegistryEntry<TComponent = unknown> {
  readonly type: string;
  readonly component: TComponent;
}

export interface WebSocketRegistry<TComponent = unknown> {
  readonly metadata: WebSocketRegistryMetadata;
  readonly lifecycle: WebSocketRegistryLifecycle;
  readonly extensions: readonly WebSocketRegistryExtension[];
  register(component: TComponent): void;
  unregister(component: TComponent): void;
  resolve(type: string): readonly TComponent[];
}

export const createDefaultWebSocketCoreConfiguration = (namespace = 'atlas'): WebSocketCoreConfiguration => ({
  namespace,
  capabilities: [],
});

export const createWebSocketCore = (
  configuration: WebSocketCoreConfiguration = createDefaultWebSocketCoreConfiguration(),
  metadata: WebSocketCoreMetadata = createWebSocketMetadata('websocket-core'),
  lifecycle: WebSocketCoreLifecycle = createWebSocketLifecycle(),
  extensions: readonly WebSocketCoreExtension[] = [],
): WebSocketCore => ({ configuration, metadata, lifecycle, extensions });

export class DefaultWebSocketRuntimeBuilder implements WebSocketRuntimeBuilder {
  private readonly endpoints: WebSocketEndpoint[] = [];
  private readonly middlewareEntries: WebSocketMiddleware[] = [];
  private readonly protocols: WebSocketProtocol[] = [];

  public constructor(
    private readonly metadata: WebSocketBuilderMetadata = createWebSocketMetadata('websocket-runtime'),
    private readonly lifecycle: WebSocketBuilderLifecycle = createWebSocketLifecycle(),
    private readonly extensions: readonly WebSocketBuilderExtension[] = [],
  ) {}

  public endpoint(endpoint: WebSocketEndpoint): this {
    this.endpoints.push(endpoint);
    return this;
  }

  public middleware(middleware: WebSocketMiddleware): this {
    this.middlewareEntries.push(middleware);
    return this;
  }

  public protocol(protocol: WebSocketProtocol): this {
    this.protocols.push(protocol);
    return this;
  }

  public build(): WebSocketRuntime {
    return {
      endpoints: [...this.endpoints],
      middleware: [...this.middlewareEntries],
      protocols: [...this.protocols],
      metadata: this.metadata,
      lifecycle: this.lifecycle,
      extensions: this.extensions,
    };
  }
}

export const createWebSocketRuntimeBuilder = (
  metadata: WebSocketBuilderMetadata = createWebSocketMetadata('websocket-runtime'),
  lifecycle: WebSocketBuilderLifecycle = createWebSocketLifecycle(),
): WebSocketRuntimeBuilder => new DefaultWebSocketRuntimeBuilder(metadata, lifecycle);

export class InMemoryWebSocketRegistry<TComponent = unknown> implements WebSocketRegistry<TComponent> {
  private readonly entriesByType = new Map<string, Set<TComponent>>();

  public constructor(
    public readonly metadata: WebSocketRegistryMetadata = createWebSocketMetadata('websocket-registry'),
    public readonly lifecycle: WebSocketRegistryLifecycle = createWebSocketLifecycle(),
    public readonly extensions: readonly WebSocketRegistryExtension[] = [],
  ) {}

  public register(component: TComponent): void {
    const type = this.componentType(component);
    const entries = this.entriesByType.get(type) ?? new Set<TComponent>();
    entries.add(component);
    this.entriesByType.set(type, entries);
  }

  public unregister(component: TComponent): void {
    const type = this.componentType(component);
    const entries = this.entriesByType.get(type);
    entries?.delete(component);
    if (entries?.size === 0) {
      this.entriesByType.delete(type);
    }
  }

  public resolve(type: string): readonly TComponent[] {
    return Array.from(this.entriesByType.get(type) ?? []);
  }

  private componentType(component: unknown): string {
    if (typeof component === 'object' && component !== null && 'type' in component) {
      const candidate = component.type;
      if (typeof candidate === 'string' && candidate.length > 0) {
        return candidate;
      }
    }
    if (typeof component === 'object' && component !== null && 'metadata' in component) {
      const metadata = component.metadata;
      if (typeof metadata === 'object' && metadata !== null && 'name' in metadata) {
        const name = metadata.name;
        if (typeof name === 'string' && name.length > 0) {
          return name;
        }
      }
    }
    return 'component';
  }
}

export const createWebSocketRegistry = <TComponent = unknown>(
  metadata: WebSocketRegistryMetadata = createWebSocketMetadata('websocket-registry'),
  lifecycle: WebSocketRegistryLifecycle = createWebSocketLifecycle(),
): WebSocketRegistry<TComponent> => new InMemoryWebSocketRegistry<TComponent>(metadata, lifecycle);
