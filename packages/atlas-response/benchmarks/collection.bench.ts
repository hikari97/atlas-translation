import { DefaultResponseCookies, DefaultResponseHeaders } from '../src';

const iterations = 1000;
const headers = new DefaultResponseHeaders([
  { name: 'Cache-Control', values: ['no-cache'], attributes: {} },
  { name: 'Vary', values: ['Accept-Language'], attributes: {} },
]);
const cookies = new DefaultResponseCookies([
  {
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
  },
]);
const startedAt = performance.now();

for (let index = 0; index < iterations; index += 1) {
  headers.has('cache-control');
  headers.append('Vary', 'Accept-Encoding');
  headers.entries();
  cookies.has('sid');
  cookies.values();
}

console.log({ iterations, elapsedMs: performance.now() - startedAt });
