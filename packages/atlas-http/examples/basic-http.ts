import {
  DefaultHttpHeaders,
  DefaultHttpMethodRegistry,
  DefaultHttpProtocolRegistry,
  createHttpRequestLine,
  createHttpRequestTarget,
} from '../src';

const methods = new DefaultHttpMethodRegistry();
const protocols = new DefaultHttpProtocolRegistry();
const method = methods.lookup('GET');
const protocol = protocols.lookup('HTTP/1.1');

if (method === undefined || protocol === undefined) {
  throw new Error('HTTP method and protocol must exist.');
}

const requestLine = createHttpRequestLine(method, createHttpRequestTarget('/translations'), protocol);
const headers = new DefaultHttpHeaders([
  { name: 'Accept', value: 'application/json', attributes: {} },
  { name: 'X-Atlas-Client', value: 'studio', attributes: {} },
]);

console.log({
  method: requestLine.method.name,
  target: requestLine.target.value,
  protocol: requestLine.protocol.version,
  headers: headers.entries().length,
});
