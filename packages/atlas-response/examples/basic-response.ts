import {
  DefaultResponseBody,
  DefaultResponseBuilder,
  DefaultResponseLifecycle,
  DefaultResponseMetadata,
  createHttpResponse,
  createHttpResponseIdentity,
} from '../src';
import {
  DefaultHttpHeaders,
  DefaultHttpProtocolRegistry,
  createHttpStatus,
} from '@atlas/atlas-http';

const protocol = new DefaultHttpProtocolRegistry().lookup('HTTP/1.1');

if (protocol === undefined) {
  throw new Error('HTTP protocol must exist.');
}

const status = createHttpStatus(200, 'OK');
const headers = new DefaultHttpHeaders([{ name: 'Content-Type', value: 'application/json', attributes: {} }]);
const metadata = new DefaultResponseMetadata();
const lifecycle = new DefaultResponseLifecycle(metadata);
const body = new DefaultResponseBody('json', { value: { ok: true }, contentType: 'application/json', contentLength: 0 });
const response = createHttpResponse(createHttpResponseIdentity('response-1', status), { status, headers, body, protocol }, metadata, lifecycle);
const builtResponse = new DefaultResponseBuilder()
  .ok()
  .header('Content-Type', 'application/json')
  .json({ id: response.identity.id })
  .build();

console.log({
  id: builtResponse.identity.id,
  status: builtResponse.identity.statusCode,
  contentType: builtResponse.headers.get('content-type')?.value,
  bodyType: builtResponse.body.type,
});
