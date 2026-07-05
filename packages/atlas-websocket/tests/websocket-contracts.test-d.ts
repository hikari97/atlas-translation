import {
  DefaultWebSocketRuntimeBuilder,
  InMemoryWebSocketRegistry,
  createDefaultWebSocketCoreConfiguration,
  createWebSocketCore,
  createWebSocketLifecycle,
  createWebSocketMetadata,
  createWebSocketRegistry,
  createWebSocketRuntimeBuilder,
  type WebSocketAuthentication,
  type WebSocketAuthorization,
  type WebSocketChannel,
  type WebSocketConnection,
  type WebSocketContext,
  type WebSocketCore,
  type WebSocketEndpoint,
  type WebSocketEvent,
  type WebSocketMessage,
  type WebSocketMiddleware,
  type WebSocketProtocol,
  type WebSocketRequest,
  type WebSocketResponse,
  type WebSocketRuntime,
  type WebSocketSession,
  type WebSocketSubscription,
  type WebSocketTransportAdapter,
} from '../src';

const metadata = createWebSocketMetadata('atlas-websocket', 'Realtime domain contracts');
const lifecycle = createWebSocketLifecycle('active');

const core: WebSocketCore = createWebSocketCore(createDefaultWebSocketCoreConfiguration('atlas'), metadata, lifecycle);
core.configuration.namespace.toUpperCase();

const connection: WebSocketConnection = {
  id: 'connection-1',
  state: 'open',
  metadata,
  lifecycle,
  capabilities: ['send', 'receive', 'heartbeat'],
};

const session: WebSocketSession = {
  id: 'session-1',
  state: 'active',
  attributes: new Map<string, unknown>([['tenant', 'atlas']]),
  metadata,
  lifecycle,
};

const endpoint: WebSocketEndpoint = {
  path: '/realtime',
  metadata,
  lifecycle,
  capabilities: ['request-response', 'events', 'middleware'],
  extensions: [],
};

const message: WebSocketMessage = {
  id: 'message-1',
  headers: new Map<string, string>([['x-correlation-id', 'request-1']]),
  payload: { text: 'hello' },
  metadata,
  extensions: [],
};

message.headers.get('x-correlation-id')?.toUpperCase();

const request: WebSocketRequest = {
  id: 'request-1',
  route: 'translation.preview',
  payload: message.payload,
  metadata,
  context: { correlationId: 'request-1', attributes: {} },
  lifecycle,
  extensions: [],
};

const response: WebSocketResponse = {
  id: 'response-1',
  correlationId: request.id,
  status: 'ok',
  payload: { accepted: true },
  metadata,
  lifecycle,
  extensions: [],
};

const event: WebSocketEvent = {
  id: 'event-1',
  type: 'translation.updated',
  category: 'domain',
  payload: response.payload,
  metadata,
  lifecycle,
  extensions: [],
};

const channel: WebSocketChannel = {
  name: 'document:123',
  scope: 'document',
  metadata,
  lifecycle,
  extensions: [],
};

const subscription: WebSocketSubscription = {
  session,
  channel,
  filters: [{ field: 'type', operator: 'equals', value: 'translation.updated' }],
  options: { replayLastMessage: false, durable: true },
  metadata,
  lifecycle,
};

subscription.channel.name.toUpperCase();

const middleware: WebSocketMiddleware = {
  metadata,
  lifecycle,
  async execute(context, next) {
    context.session?.id.toUpperCase();
    await next.next();
  },
};

const context: WebSocketContext = {
  connection,
  session,
  endpoint,
  metadata,
  attributes: new Map<string, unknown>(),
  lifecycle,
  extensions: [],
};

context.endpoint.path.toUpperCase();

const authentication: WebSocketAuthentication = {
  state: 'authenticated',
  context: { subjectId: 'user-1', claims: { role: 'editor' } },
  metadata,
  lifecycle,
};

authentication.context.subjectId?.toUpperCase();

const authorization: WebSocketAuthorization = {
  policies: [{ name: 'document-editor', permissions: ['document:read', 'document:write'] }],
  context: { subjectId: 'user-1', resource: 'document:123', action: 'document:write' },
  metadata,
  lifecycle,
};

authorization.policies[0]?.permissions.includes('document:read');

const protocol: WebSocketProtocol = {
  name: 'atlas-realtime',
  version: '1.0.0',
  capabilities: ['json', 'heartbeat', 'acknowledgement'],
  metadata,
  negotiation: { requested: ['atlas-realtime'], selected: 'atlas-realtime' },
  lifecycle,
};

const runtime: WebSocketRuntime = createWebSocketRuntimeBuilder(metadata, lifecycle)
  .endpoint(endpoint)
  .middleware(middleware)
  .protocol(protocol)
  .build();

runtime.protocols[0]?.version.toUpperCase();

const explicitBuilder = new DefaultWebSocketRuntimeBuilder(metadata, lifecycle);
explicitBuilder.endpoint(endpoint).build().endpoints[0]?.path.toUpperCase();

const adapter: WebSocketTransportAdapter = {
  metadata: { ...metadata, name: 'test-adapter' },
  capabilities: ['connect', 'disconnect', 'send', 'receive'],
  lifecycle,
  extensions: [],
  initialize: async () => undefined,
  shutdown: async () => undefined,
};

await adapter.initialize();
await adapter.shutdown();

const registry = createWebSocketRegistry<WebSocketTransportAdapter>(metadata, lifecycle);
registry.register(adapter);
registry.resolve('test-adapter')[0]?.metadata.name.toUpperCase();

const explicitRegistry = new InMemoryWebSocketRegistry<{ readonly type: string; readonly component?: WebSocketEvent }>(metadata, lifecycle);
explicitRegistry.register({ type: 'event', component: event });
explicitRegistry.unregister({ type: 'missing' });
explicitRegistry.resolve('event')[0]?.type.toUpperCase();
