import test from 'node:test';
import assert from 'node:assert';
import React from 'react';
import { render } from './test-utils.mjs';

test('simple react component smoke test', () => {
  const element = React.createElement('div', null, 'Hello World');
  const result = render(element);
  assert.strictEqual(result.html, '<div></div>');
});
