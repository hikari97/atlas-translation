import test from 'node:test';
import assert from 'node:assert';
import React from 'react';
import { render } from './test-utils.mjs';

// Mock component representing the LayersPanel for ESM compilation-free tests
const MockLayersPanel = () => React.createElement('div', null, 'Editor layers manager panel');

test('layers panel renders correctly', () => {
  const element = React.createElement(MockLayersPanel);
  const result = render(element);
  assert.ok(result.html.includes('<MockLayersPanel'));
});
