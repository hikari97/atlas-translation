import {
  DefaultResponseBody,
  DefaultResponseBuilder,
  DefaultResponseCookies,
  DefaultResponseHeaders,
  DefaultResponseLifecycle,
  DefaultResponseMetadata,
  createHttpResponse,
  createHttpResponseIdentity,
  createResponseAttachment,
  createResponseCache,
  createResponseContext,
  createResponseCore,
  createResponseProvider,
  createResponseProviderMetadata,
  createResponseProviderRegistry,
  createResponseStatus,
  type HttpResponse,
  type ResponseCookie,
} from '../src';
import {
  DefaultHttpHeaders,
  DefaultHttpProtocolRegistry,
  createHttpStatus,
} from '@atlas/atlas-http';

const responseMetadata = new DefaultResponseMetadata();
const responseLifecycle = new DefaultResponseLifecycle(responseMetadata);
const protocol = new DefaultHttpProtocolRegistry().lookup('HTTP/1.1');

if (protocol === undefined) {
  throw new Error('Expected standard HTTP protocol.');
}

const status = createHttpStatus(200, 'OK');
const headers = new DefaultHttpHeaders([{ name: 'Content-Type', value: 'application/json', attributes: {} }]);
const body = new DefaultResponseBody('json', {
  value: { ok: true },
  contentType: 'application/json',
  contentLength: 0,
});

const response: HttpResponse = createHttpResponse(
  createHttpResponseIdentity('response-1', status),
  { status, headers, body, protocol },
  responseMetadata,
  responseLifecycle,
);

const responseStatus = createResponseStatus(status.code, status.phrase, status.metadata.attributes);
const responseHeaders = new DefaultResponseHeaders([{ name: 'Cache-Control', values: ['no-cache'], attributes: {} }]);
const cookie: ResponseCookie = {
  name: 'sid',
  value: 'session-1',
  metadata: {
    path: '/',
    domain: undefined,
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    expires: undefined,
    maxAge: undefined,
    attributes: {},
  },
};
const cookies = new DefaultResponseCookies([cookie]);
const cache = createResponseCache('private', [{ name: 'max-age', value: '60' }]);
const attachment = createResponseAttachment(
  { kind: 'virtual-file', value: 'preview' },
  'inline',
  { filename: 'preview.json', mimeType: 'application/json', size: 0, lastModified: undefined, attributes: {} },
);

const context = createResponseContext(
  response,
  responseStatus,
  responseHeaders,
  body,
  cookies,
  cache,
  attachment,
  responseMetadata,
  responseLifecycle,
  {
    responseId: response.identity.id,
    attributes: [],
    serviceKeys: ['response', 'status', 'headers', 'body', 'cookies', 'cache', 'attachment'],
  },
);

const core = createResponseCore(context, responseLifecycle, responseMetadata);
core.registry.register({ id: 'response', name: 'Response', value: response });
context.storage.register({ id: 'headers', name: 'Headers', value: responseHeaders });
context.services();

const builder = new DefaultResponseBuilder();
const builtResponse = builder
  .created()
  .header('Location', '/images/1')
  .cookie(cookie)
  .cache(cache)
  .attachment(attachment)
  .json({ created: true })
  .build();
const builtResult = new DefaultResponseBuilder()
  .ok()
  .header('Content-Type', 'application/json')
  .cookie(cookie)
  .cache(cache)
  .attachment(attachment)
  .json({ ok: true })
  .buildResult();

const providerMetadata = createResponseProviderMetadata(responseMetadata, 'mock', 'Mock Response Provider', '0.1.0');
const provider = createResponseProvider(
  providerMetadata,
  responseLifecycle,
  {
    responseDelivery: true,
    headerDelivery: true,
    cookieDelivery: true,
    attachmentDelivery: true,
  },
  async (nextResponse: HttpResponse): Promise<void> => {
    core.registry.register({ id: nextResponse.identity.id, name: 'Built Response', value: nextResponse });
  },
);
const providers = createResponseProviderRegistry();
providers.register({ id: provider.metadata.id, name: provider.metadata.name, value: provider });

responseLifecycle.transition('ready');
responseLifecycle.events();
responseStatus.isSuccess();
responseHeaders.append('Vary', 'Accept-Language');
cookies.get('sid');
cache.directives;
attachment.reference;
await provider.healthCheck();
await provider.send(builtResponse);
builtResult.context.responseContext.services();
