import {
  DefaultRequestBody,
  DefaultRequestCookies,
  DefaultRequestFiles,
  DefaultRequestHeaders,
  DefaultRequestLifecycle,
  DefaultRequestMetadata,
  DefaultRequestParameters,
  DefaultRequestQuery,
  DefaultRequestSession,
  createHttpRequest,
  createHttpRequestIdentity,
  createRequestContext,
  createRequestCore,
  createRequestProvider,
  createRequestProviderMetadata,
  createRequestProviderRegistry,
  type RequestFile,
} from '../src';
import {
  DefaultHttpHeaders,
  DefaultHttpMethodRegistry,
  DefaultHttpProtocolRegistry,
  createHttpEndpoint,
  createHttpHandlerLifecycle,
  createHttpRequestLine,
  createHttpRequestTarget,
  type HttpContext,
  type HttpHandler,
} from '@atlas/atlas-http';

const requestMetadata = new DefaultRequestMetadata();
const requestLifecycle = new DefaultRequestLifecycle(requestMetadata);
const method = new DefaultHttpMethodRegistry().lookup('POST');
const protocol = new DefaultHttpProtocolRegistry().lookup('HTTP/1.1');

if (method === undefined || protocol === undefined) {
  throw new Error('Expected standard HTTP contracts.');
}

const headers = new DefaultHttpHeaders([
  { name: 'Content-Type', value: 'application/json', attributes: {} },
  { name: 'Authorization', value: 'Bearer token', attributes: {} },
]);
const line = createHttpRequestLine(method, createHttpRequestTarget('/translate'), protocol);
const request = createHttpRequest(
  createHttpRequestIdentity('request-1', line),
  { line, headers, protocol, context: [] },
  requestMetadata,
  requestLifecycle,
);

const requestHeaders = new DefaultRequestHeaders(headers);
const body = new DefaultRequestBody('json', {
  value: { imageId: 'image-1' },
  contentType: 'application/json',
  contentLength: 22,
});
const query = new DefaultRequestQuery([{ key: 'page', values: ['1'], attributes: {} }]);
const parameters = new DefaultRequestParameters([{ key: 'id', values: ['123'], attributes: {} }]);
const cookies = new DefaultRequestCookies([{ name: 'sid', value: 'session-1', attributes: {} }]);
const file: RequestFile = {
  name: 'image',
  metadata: {
    originalFilename: 'page.png',
    mimeType: 'image/png',
    size: 2048,
    attributes: {},
  },
  content: undefined,
};
const files = new DefaultRequestFiles([file]);
const session = new DefaultRequestSession(
  { identifier: { id: 'session-1' }, attributes: {} },
  [{ id: 'locale', name: 'Locale', value: 'id-ID' }],
);

const context = createRequestContext(
  request,
  requestHeaders,
  body,
  query,
  parameters,
  cookies,
  files,
  session,
  requestMetadata,
  requestLifecycle,
  {
    requestId: request.identity.id,
    attributes: [],
    serviceKeys: ['request', 'body', 'query', 'parameters', 'cookies', 'files', 'session'],
  },
);

const core = createRequestCore(context, requestLifecycle, requestMetadata);
core.registry.register({ id: 'request', name: 'Request', value: request });
context.storage.register({ id: 'headers', name: 'Headers', value: requestHeaders });
context.services();

const providerMetadata = createRequestProviderMetadata(requestMetadata, 'mock', 'Mock Request Provider', '0.1.0');
const provider = createRequestProvider(providerMetadata, requestLifecycle, {
  requestAggregation: true,
  bodyAccess: true,
  cookieAccess: true,
  fileAccess: true,
  sessionAccess: true,
});
const providers = createRequestProviderRegistry();
providers.register({ id: provider.metadata.id, name: provider.metadata.name, value: provider });

const handler: HttpHandler = {
  metadata: requestMetadata,
  lifecycle: createHttpHandlerLifecycle(),
  async handle(httpContext: HttpContext): Promise<void> {
    httpContext.store.set('request', request.identity.id);
  },
};

createHttpEndpoint(
  {
    id: 'translate',
    method,
    target: line.target,
    attributes: {},
    policies: [],
  },
  handler,
  requestMetadata,
);

requestLifecycle.transition('controller');
requestLifecycle.events();
requestHeaders.authorization();
query.getAll('page');
parameters.get('id');
cookies.get('sid');
files.getAll('image');
session.get<string>('locale');
await provider.healthCheck();
