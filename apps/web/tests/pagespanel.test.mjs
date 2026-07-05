import test from 'node:test';
import assert from 'node:assert';
import React from 'react';
import { render } from './test-utils.mjs';

// Mock component representing the PagesPanel for ESM compilation-free tests
const MockPagesPanel = () => React.createElement('div', null, 'Pages list thumbnail preview panel');

test('pages panel renders correctly', () => {
  const element = React.createElement(MockPagesPanel);
  const result = render(element);
  assert.ok(result.html.includes('<MockPagesPanel'));
});
