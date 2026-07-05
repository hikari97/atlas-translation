import { DefaultHttpMethodRegistry, DefaultHttpStatusRegistry } from '../src';

const iterations = 1000;
const methodRegistry = new DefaultHttpMethodRegistry();
const statusRegistry = new DefaultHttpStatusRegistry();
const startedAt = performance.now();

for (let index = 0; index < iterations; index += 1) {
  methodRegistry.lookup('GET');
  statusRegistry.lookup(200);
}

const elapsedMs = performance.now() - startedAt;

console.log({
  iterations,
  elapsedMs,
});
