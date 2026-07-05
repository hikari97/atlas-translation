import { DefaultRequestQuery } from '../src';

const iterations = 1000;
const query = new DefaultRequestQuery([
  { key: 'page', values: ['1'], attributes: {} },
  { key: 'sort', values: ['createdAt', 'desc'], attributes: {} },
]);
const startedAt = performance.now();

for (let index = 0; index < iterations; index += 1) {
  query.has('page');
  query.getAll('sort');
  query.entries();
}

console.log({ iterations, elapsedMs: performance.now() - startedAt });
