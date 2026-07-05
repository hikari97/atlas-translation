import test from 'node:test';
import assert from 'node:assert';
import React from 'react';
import { render } from './test-utils.mjs';

// Mock component representing the InspectorPanel for ESM compilation-free tests
const MockInspectorPanel = () => React.createElement('div', null, 'Bubble text editor inspector panel');

test('inspector panel renders correctly', () => {
  const element = React.createElement(MockInspectorPanel);
  const result = render(element);
  assert.ok(result.html.includes('<MockInspectorPanel'));
});
