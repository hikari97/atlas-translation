import {
  DefaultRequestBody,
  DefaultRequestHeaders,
  DefaultRequestLifecycle,
  DefaultRequestMetadata,
  createHttpRequest,
  createHttpRequestIdentity,
} from '../src';
import {
  DefaultHttpHeaders,
  DefaultHttpMethodRegistry,
  DefaultHttpProtocolRegistry,
  createHttpRequestLine,
  createHttpRequestTarget,
} from '@atlas/atlas-http';

const method = new DefaultHttpMethodRegistry().lookup('GET');
const protocol = new DefaultHttpProtocolRegistry().lookup('HTTP/1.1');

if (method === undefined || protocol === undefined) {
  throw new Error('HTTP method and protocol must exist.');
}

const line = createHttpRequestLine(method, createHttpRequestTarget('/images'), protocol);
const headers = new DefaultHttpHeaders([{ name: 'Accept', value: 'application/json', attributes: {} }]);
const metadata = new DefaultRequestMetadata();
const lifecycle = new DefaultRequestLifecycle(metadata);
const request = createHttpRequest(createHttpRequestIdentity('request-1', line), { line, headers, protocol, context: [] }, metadata, lifecycle);
const requestHeaders = new DefaultRequestHeaders(headers);
const body = new DefaultRequestBody('empty', { value: undefined, contentType: undefined, contentLength: 0 });

console.log({
  id: request.identity.id,
  method: request.identity.method,
  target: request.identity.target,
  accept: requestHeaders.accept(),
  emptyBody: body.isEmpty(),
});
