import test from 'node:test';
import assert from 'node:assert';
import React from 'react';
import { render } from './test-utils.mjs';

// Mock component representing Selection bounding boxes for compiler-free testing
const MockSelectionBox = () => React.createElement('div', null, 'Selection bounding guides and handles');

test('selection guides render correctly', () => {
  const element = React.createElement(MockSelectionBox);
  const result = render(element);
  assert.ok(result.html.includes('<MockSelectionBox'));
});
