import {
  DefaultHttpHeaders,
  DefaultHttpLifecycle,
  DefaultHttpMetadata,
  DefaultHttpMethodRegistry,
  DefaultHttpProtocolRegistry,
  DefaultHttpStatusRegistry,
  InMemoryHttpRegistry,
  SequentialHttpHandlerChain,
  createHttpClient,
  createHttpConnection,
  createHttpContext,
  createHttpCore,
  createHttpEndpoint,
  createHttpProvider,
  createHttpRequestLine,
  createHttpRequestTarget,
  createHttpServer,
  executeHttpPipeline,
  getOrderedHttpPipelineStages,
  reorderHttpPipelineStage,
  type HttpContext,
  type HttpHandler,
  type HttpPipeline,
  type HttpPipelineStage,
  type HttpProvider,
} from '../src';

const metadata = new DefaultHttpMetadata();
const lifecycle = new DefaultHttpLifecycle(metadata);
const context = createHttpContext(metadata);
const core = createHttpCore(context, lifecycle, metadata);

core.registry.register({ id: 'context', name: 'Context', value: context });

const methods = new DefaultHttpMethodRegistry();
const protocols = new DefaultHttpProtocolRegistry();
const statuses = new DefaultHttpStatusRegistry();
const method = methods.lookup('GET');
const protocol = protocols.lookup('HTTP/1.1');
const status = statuses.lookup(200);

if (method === undefined || protocol === undefined || status === undefined) {
  throw new Error('Expected standard HTTP contracts to be registered.');
}

const methodIsSafe: boolean = method.capabilities.safe;
const target = createHttpRequestTarget('/health');
const requestLine = createHttpRequestLine(method, target, protocol);
const headers = new DefaultHttpHeaders([{ name: 'Accept', value: 'application/json', attributes: {} }]);

headers.set({ name: 'X-Atlas', value: 'studio', attributes: {} });

const connection = createHttpConnection('connection-1', {
  persistent: true,
  keepAlive: true,
  multiplexing: false,
  streams: false,
});

const handler: HttpHandler = {
  metadata,
  lifecycle: {
    state: 'initialized',
    transitions: ['initialized'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  async handle(activeContext: HttpContext): Promise<void> {
    activeContext.store.set('handled', true);
  },
};

const endpoint = createHttpEndpoint(
  {
    id: 'health',
    method,
    target,
    attributes: {},
    policies: [{ name: 'public', attributes: { cacheable: true } }],
  },
  handler,
  metadata,
);

const chain = new SequentialHttpHandlerChain([handler]);
await chain.next(context);

const server = createHttpServer(
  {
    host: '127.0.0.1',
    port: 3000,
    protocol: requestLine.protocol.version,
    environment: 'test',
  },
  {
    id: 'test-server',
    name: 'Test Server',
    async start(): Promise<void> {},
    async stop(): Promise<void> {},
  },
  'server-1',
);

const client = createHttpClient(
  {
    baseUrl: 'https://example.test',
    timeoutMs: 1000,
    defaultHeaders: headers.entries(),
  },
  {
    id: 'test-client',
    name: 'Test Client',
    async send(request: { readonly url: string }): Promise<{ readonly ok: boolean }> {
      return { ok: request.url.length > 0 };
    },
    async cancel(): Promise<void> {},
    async close(): Promise<void> {},
  },
  'client-1',
);

const provider: HttpProvider = createHttpProvider(
  {
    id: 'mock',
    name: 'Mock Provider',
    version: '0.1.0',
    attributes: {},
  },
  {
    server: true,
    client: true,
    streaming: false,
    multiplexing: false,
    edgeRuntime: false,
  },
);

const pipeline: HttpPipeline = {
  metadata,
  registry: new InMemoryHttpRegistry<HttpPipelineStage>(),
  lifecycle: {
    state: 'initialized',
    transitions: ['initialized'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

pipeline.registry.register({
  id: 'stage-1',
  name: 'Stage 1',
  value: {
    id: 'stage-1',
    name: 'Stage 1',
    order: 2,
    async execute(activeContext: HttpContext): Promise<void> {
      activeContext.store.set('pipeline', true);
    },
  },
});

reorderHttpPipelineStage(pipeline, 'stage-1', 1);
getOrderedHttpPipelineStages(pipeline);
await executeHttpPipeline(pipeline, context);
lifecycle.transition('completed');
lifecycle.events();
await provider.healthCheck();

void connection;
void endpoint;
void server;
void client;
void provider;
void methodIsSafe;
